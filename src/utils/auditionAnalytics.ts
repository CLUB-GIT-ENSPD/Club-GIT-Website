import {
  AUDITION_FINAL_QUESTIONS,
  AUDITION_GENERAL_QUESTIONS,
  AUDITION_LEVEL_LABELS,
  AUDITION_LEVEL_QUESTION_ID,
  AUDITION_LEVEL_QUESTIONS,
  AUDITION_TRACK_LABELS,
  AUDITION_TRACK_QUESTION_ID,
  getAuditionQuestions,
} from '../data/auditionData';
import type {
  AuditionLevel,
  AuditionQuestion,
  AuditionSubmission,
  AuditionTrack,
} from '../types/audition';

export type AnalyticsQuestionSection = 'general' | 'level' | 'final';

export interface AnalyticsQuestionEntry {
  question: AuditionQuestion;
  section: AnalyticsQuestionSection;
  /** Niveau concerné pour les questions du bloc « niveau », sinon `null`. */
  level: AuditionLevel | null;
}

export interface DistributionBucket {
  key: string;
  label: string;
  count: number;
  /** Part du total des candidatures (0 → 1). */
  ratio: number;
}

export interface QuestionAnalysis {
  entry: AnalyticsQuestionEntry;
  /** Candidatures concernées par la question (niveau/filière compatibles). */
  eligible: number;
  answered: number;
  /** Part des candidatures concernées ayant répondu (0 → 1). */
  ratio: number;
  /** Répartition des réponses pour les questions à choix. */
  buckets?: DistributionBucket[];
  /** Réponses libres, pour les questions ouvertes. */
  textAnswers?: { candidate: string; value: string }[];
}

export interface CompletionBucket {
  key: string;
  label: string;
  /** Complétion moyenne (0 → 1). */
  ratio: number;
}

export interface AuditionAnalyticsResult {
  total: number;
  levelDistribution: DistributionBucket[];
  trackDistribution: DistributionBucket[];
  /** Complétion moyenne : réponses apportées / questions attendues (0 → 1). */
  averageCompletion: number;
  /** Complétion moyenne par section du formulaire (0 → 1). */
  sectionCompletion: CompletionBucket[];
  questions: QuestionAnalysis[];
  choiceQuestions: QuestionAnalysis[];
  openQuestions: QuestionAnalysis[];
  /** Questions à choix du périmètre auxquelles personne n'a répondu. */
  unansweredChoiceCount: number;
  /** Nombre de candidatures reçues par jour sur les 14 derniers jours. */
  dailyTrend: { date: string; count: number }[];
  latestSubmittedAt: string | null;
}

/** Construit le dictionnaire ordonné des questions du formulaire. */
export function buildQuestionEntries(): AnalyticsQuestionEntry[] {
  const entries: AnalyticsQuestionEntry[] = [
    ...AUDITION_GENERAL_QUESTIONS.map((question) => ({
      question,
      section: 'general' as const,
      level: null,
    })),
  ];

  for (const level of [1, 2, 3, 4] as AuditionLevel[]) {
    for (const question of AUDITION_LEVEL_QUESTIONS[level]) {
      entries.push({ question, section: 'level', level });
    }
  }

  entries.push(
    ...AUDITION_FINAL_QUESTIONS.map((question) => ({
      question,
      section: 'final' as const,
      level: null,
    }))
  );

  return entries;
}

const isEligible = (
  submission: AuditionSubmission,
  entry: AnalyticsQuestionEntry
): boolean => {
  if (entry.level !== null && submission.level !== entry.level) return false;
  if (entry.question.track && submission.track !== entry.question.track) return false;
  return true;
};

const answerOf = (submission: AuditionSubmission, questionId: string): string => {
  const match = submission.answers.find((answer) => answer.questionId === questionId);
  return match ? match.displayValue || match.value : '';
};

/** Clé de date locale (AAAA-MM-JJ), pour éviter les décalages de fuseau. */
function toLocalDateKey(value: string | Date): string {
  const date = typeof value === 'string' ? new Date(value) : value;
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function computeAuditionAnalytics(
  submissions: AuditionSubmission[]
): AuditionAnalyticsResult {
  const total = submissions.length;
  const entries = buildQuestionEntries();

  const levelDistribution: DistributionBucket[] = ([1, 2, 3, 4] as AuditionLevel[]).map(
    (level) => {
      const count = submissions.filter((submission) => submission.level === level).length;
      return {
        key: String(level),
        label: AUDITION_LEVEL_LABELS[level],
        count,
        ratio: total ? count / total : 0,
      };
    }
  );

  const trackDistribution: DistributionBucket[] = (
    ['informatique', 'telecoms'] as AuditionTrack[]
  ).map((track) => {
    const count = submissions.filter((submission) => submission.track === track).length;
    return {
      key: track,
      label: AUDITION_TRACK_LABELS[track],
      count,
      ratio: total ? count / total : 0,
    };
  });

  const completionRatios = submissions.map((submission) => {
    const expected = getAuditionQuestions(submission.level, submission.track);
    if (expected.length === 0) return 0;
    const answeredIds = new Set(submission.answers.map((answer) => answer.questionId));
    const answered = expected.filter((question) => answeredIds.has(question.id)).length;
    return answered / expected.length;
  });

  const averageCompletion = completionRatios.length
    ? completionRatios.reduce((sum, ratio) => sum + ratio, 0) / completionRatios.length
    : 0;

  const sectionLabels: Record<AnalyticsQuestionSection, string> = {
    general: 'Profil',
    level: 'Questionnaire',
    final: 'Motivation',
  };

  const sectionCompletion: CompletionBucket[] = (
    ['general', 'level', 'final'] as AnalyticsQuestionSection[]
  ).map((section) => {
    const ratios = submissions.map((submission) => {
      const expected = getAuditionQuestions(submission.level, submission.track).filter(
        (question) =>
          question.id.startsWith('g-')
            ? section === 'general'
            : question.id.startsWith('f-')
              ? section === 'final'
              : section === 'level'
      );
      if (expected.length === 0) return 0;
      const answeredIds = new Set(submission.answers.map((answer) => answer.questionId));
      return expected.filter((question) => answeredIds.has(question.id)).length / expected.length;
    });

    const ratio = ratios.length
      ? ratios.reduce((sum, value) => sum + value, 0) / ratios.length
      : 0;

    return {
      key: section,
      label: sectionLabels[section],
      ratio,
    };
  });

  const questions: QuestionAnalysis[] = entries.map((entry) => {
    const eligibleSubmissions = submissions.filter((submission) => isEligible(submission, entry));
    const answeredSubmissions = eligibleSubmissions.filter(
      (submission) => answerOf(submission, entry.question.id) !== ''
    );

    const analysis: QuestionAnalysis = {
      entry,
      eligible: eligibleSubmissions.length,
      answered: answeredSubmissions.length,
      ratio: eligibleSubmissions.length ? answeredSubmissions.length / eligibleSubmissions.length : 0,
    };

    if (entry.question.type === 'choice') {
      const counts = new Map<string, number>();
      for (const submission of answeredSubmissions) {
        const value = answerOf(submission, entry.question.id);
        if (!value) continue;
        counts.set(value, (counts.get(value) ?? 0) + 1);
      }

      const orderedLabels = (entry.question.options ?? []).map((option) => option.label);
      for (const label of counts.keys()) {
        if (!orderedLabels.includes(label)) orderedLabels.push(label);
      }

      analysis.buckets = orderedLabels.map((label) => {
        const count = counts.get(label) ?? 0;
        return {
          key: label,
          label,
          count,
          ratio: answeredSubmissions.length ? count / answeredSubmissions.length : 0,
        };
      });
    } else {
      analysis.textAnswers = answeredSubmissions.map((submission) => ({
        candidate: submission.fullName,
        value: answerOf(submission, entry.question.id),
      }));
    }

    return analysis;
  });

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const dailyTrend: { date: string; count: number }[] = [];
  for (let offset = 13; offset >= 0; offset -= 1) {
    const day = new Date(today);
    day.setDate(day.getDate() - offset);
    const iso = toLocalDateKey(day);
    dailyTrend.push({
      date: iso,
      count: submissions.filter(
        (submission) => toLocalDateKey(submission.submittedAt) === iso
      ).length,
    });
  }

  const latestSubmittedAt =
    submissions.length > 0
      ? submissions.reduce(
          (latest, submission) =>
            submission.submittedAt > latest ? submission.submittedAt : latest,
          submissions[0].submittedAt
        )
      : null;

  const relevantQuestions = questions.filter((item) => item.eligible > 0);
  const routingQuestionIds = new Set([
    AUDITION_LEVEL_QUESTION_ID,
    AUDITION_TRACK_QUESTION_ID,
  ]);
  // Les champs d'identification ont leur propre colonne dans l'export et les
  // en-têtes de la liste : inutile de les répéter dans « Réponses ouvertes ».
  const identificationQuestionIds = new Set([
    'g-nom-et-prenom',
    'g-adresse-email',
    'g-numero-whatsapp',
    'f-lien-github-ou-portfolio-facultatif',
  ]);

  const choiceQuestions = relevantQuestions.filter(
    (item) =>
      item.entry.question.type === 'choice' &&
      item.answered > 0 &&
      !routingQuestionIds.has(item.entry.question.id)
  );

  return {
    total,
    levelDistribution,
    trackDistribution,
    averageCompletion,
    sectionCompletion,
    questions,
    choiceQuestions,
    openQuestions: relevantQuestions.filter(
      (item) =>
        item.entry.question.type !== 'choice' &&
        !identificationQuestionIds.has(item.entry.question.id)
    ),
    unansweredChoiceCount: relevantQuestions.filter(
      (item) =>
        item.entry.question.type === 'choice' &&
        item.answered === 0 &&
        !routingQuestionIds.has(item.entry.question.id)
    ).length,
    dailyTrend,
    latestSubmittedAt,
  };
}

function csvCell(value: string): string {
  const normalized = value.replace(/\r\n/g, '\n');
  if (/[";\n]/.test(normalized)) {
    return `"${normalized.replace(/"/g, '""')}"`;
  }
  return normalized;
}

/**
 * Construit un CSV (séparateur `;`, compatible Excel FR) : une ligne par
 * candidature, une colonne par question. Utilisable pour une analyse hors ligne.
 */
export function buildSubmissionsCsv(submissions: AuditionSubmission[]): string {
  const entries = buildQuestionEntries();

  const header = [
    'id',
    'date_envoi',
    'nom_complet',
    'email',
    'whatsapp',
    'github',
    'niveau_code',
    'niveau',
    'filiere_code',
    'filiere',
    ...entries.map((entry) => `${entry.question.label} [${entry.question.id}]`),
  ];

  const rows = submissions.map((submission) => {
    const answers = new Map(
      submission.answers.map((answer) => [answer.questionId, answer.displayValue || answer.value])
    );

    return [
      submission.id,
      submission.submittedAt,
      submission.fullName,
      submission.email,
      submission.whatsapp,
      submission.githubUrl,
      String(submission.level),
      AUDITION_LEVEL_LABELS[submission.level] ?? `Niveau ${submission.level}`,
      submission.track,
      AUDITION_TRACK_LABELS[submission.track] ?? submission.track,
      ...entries.map((entry) => answers.get(entry.question.id) ?? ''),
    ];
  });

  return [header, ...rows]
    .map((row) => row.map((cell) => csvCell(String(cell))).join(';'))
    .join('\r\n');
}

export function downloadSubmissionsCsv(submissions: AuditionSubmission[]): void {
  const blob = new Blob([`\uFEFF${buildSubmissionsCsv(submissions)}`], {
    type: 'text/csv;charset=utf-8',
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `auditions-club-git-${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}
