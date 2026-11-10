import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Clock,
  ExternalLink,
  Eye,
  ListChecks,
  Loader2,
  Mail,
  RotateCcw,
  Send,
} from 'lucide-react';
import { AUDITION_FORM, CLUB_META } from '../data/clubData';
import {
  AUDITION_FINAL_QUESTIONS,
  AUDITION_GENERAL_QUESTIONS,
  AUDITION_LEVEL_LABELS,
  AUDITION_LEVEL_QUESTION_ID,
  AUDITION_TRACK_LABELS,
  AUDITION_TRACK_QUESTION_ID,
  getAuditionLevelFromAnswer,
  getAuditionLevelQuestions,
  getAuditionTrackFromAnswer,
} from '../data/auditionData';
import {
  getAuditionAnswerLabel,
  getAuditionAnswerSection,
  validateAuditionQuestion,
  normalizePhone,
  normalizeUrl,
} from '../utils/auditionAnswers';
import {
  saveAuditionSubmission,
  type SubmissionStorage,
} from '../utils/auditionStorage';
import type {
  AuditionAnswers,
  AuditionLevel,
  AuditionQuestion,
  AuditionSubmissionAnswer,
  AuditionTrack,
} from '../types/audition';

interface QuestionFieldProps {
  question: AuditionQuestion;
  index: number;
  value: string;
  error?: string;
  onChange: (value: string) => void;
}

const QuestionField: React.FC<QuestionFieldProps> = ({
  question,
  index,
  value,
  error,
  onChange,
}) => {
  const inputId = `audition-${question.id}`;
  const errorId = `${inputId}-error`;

  const labelContent = (
    <>
      <span className="mt-0.5 shrink-0 font-mono text-[10px] font-bold tabular-nums text-slate-400">
        {String(index + 1).padStart(2, '0')}
      </span>
      <span className="text-sm font-semibold leading-relaxed text-slate-900">
        {question.label}
        {question.required ? (
          <span className="ml-1 text-[#ff7f00]" aria-hidden="true">
            *
          </span>
        ) : (
          <span className="ml-2 align-middle text-[10px] font-medium uppercase tracking-wide text-slate-400">
            facultatif
          </span>
        )}
      </span>
    </>
  );

  const errorMessage = error ? (
    <p
      id={errorId}
      role="alert"
      className="flex items-start gap-1.5 pl-6 text-xs font-medium text-red-600"
    >
      <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
      <span>{error}</span>
    </p>
  ) : null;

  if (question.type === 'choice') {
    return (
      <fieldset data-question-id={question.id} className="space-y-2.5">
        <legend className="w-full">
          <span className="flex items-start gap-2">{labelContent}</span>
        </legend>

        <div className="grid gap-2 sm:grid-cols-2">
          {question.options?.map((option) => {
            const selected = value === option.tallyId;
            return (
              <label
                key={option.tallyId}
                className={`flex cursor-pointer items-center gap-3 rounded-xl border px-3.5 py-3 text-sm transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-[#261c72]/30 has-[:focus-visible]:ring-offset-1 ${
                  selected
                    ? 'border-[#261c72] bg-indigo-50/70 font-medium text-slate-900'
                    : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <input
                  type="radio"
                  id={`${inputId}-${option.tallyId}`}
                  name={`audition-choice-${question.id}`}
                  value={option.tallyId}
                  checked={selected}
                  onChange={() => onChange(option.tallyId)}
                  required={question.required}
                  aria-invalid={Boolean(error)}
                  aria-describedby={error ? errorId : undefined}
                  className="sr-only"
                />
                <span
                  aria-hidden="true"
                  className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 ${
                    selected ? 'border-[#261c72]' : 'border-slate-300'
                  }`}
                >
                  {selected && <span className="h-2 w-2 rounded-full bg-[#261c72]" />}
                </span>
                <span>{option.label}</span>
              </label>
            );
          })}
        </div>

        {errorMessage}
      </fieldset>
    );
  }

  const sharedProps = {
    id: inputId,
    name: inputId,
    value,
    required: question.required,
    'aria-invalid': Boolean(error),
    'aria-describedby': error ? errorId : undefined,
    onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      onChange(event.target.value),
    className: `w-full rounded-xl border bg-white px-3.5 py-2.5 text-sm text-slate-900 shadow-xs outline-none transition placeholder:text-slate-400 focus:ring-2 ${
      error
        ? 'border-red-300 focus:border-red-400 focus:ring-red-100'
        : 'border-slate-200 focus:border-[#261c72] focus:ring-indigo-100'
    }`,
  };

  return (
    <div data-question-id={question.id} className="space-y-2">
      <label htmlFor={inputId} className="flex items-start gap-2">
        {labelContent}
      </label>

      {question.type === 'textarea' ? (
        <textarea
          {...sharedProps}
          rows={4}
          placeholder="Écris ta réponse ici…"
          className={`${sharedProps.className} min-h-24 resize-y`}
        />
      ) : (
        <input
          {...sharedProps}
          type={question.type === 'tel' ? 'tel' : question.type === 'email' ? 'email' : question.type === 'url' ? 'url' : 'text'}
          inputMode={question.type === 'tel' ? 'tel' : question.type === 'email' ? 'email' : question.type === 'url' ? 'url' : 'text'}
          autoComplete={
            question.type === 'email'
              ? 'email'
              : question.type === 'tel'
                ? 'tel'
                : question.id === 'g-nom-et-prenom'
                  ? 'name'
                  : 'off'
          }
          placeholder={
            question.type === 'email'
              ? 'ton.email@exemple.com'
              : question.type === 'tel'
                ? 'Ex. +237 6 12 34 56 78'
                : question.type === 'url'
                  ? 'https://github.com/ton-profil'
                  : 'Ta réponse'
          }
        />
      )}

      {errorMessage}
    </div>
  );
};

/**
 * Formulaire d'audition natif du club.
 * Reproduit les questions et l'aiguillage du formulaire Tally officiel, puis
 * envoie les réponses à Tally pour conserver la réception des candidatures.
 */
export const AuditionForm: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<AuditionAnswers>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showErrorSummary, setShowErrorSummary] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [savedResult, setSavedResult] = useState<{
    id: string;
    storage: SubmissionStorage;
  } | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const hasMountedRef = useRef(false);

  const level: AuditionLevel | null = getAuditionLevelFromAnswer(
    answers[AUDITION_LEVEL_QUESTION_ID]
  );
  const track: AuditionTrack | null = getAuditionTrackFromAnswer(
    answers[AUDITION_TRACK_QUESTION_ID]
  );

  const levelQuestions = useMemo(
    () => (level && track ? getAuditionLevelQuestions(level, track) : []),
    [level, track]
  );

  const stepQuestions: AuditionQuestion[] =
    step === 0
      ? AUDITION_GENERAL_QUESTIONS
      : step === 1
        ? levelQuestions
        : AUDITION_FINAL_QUESTIONS;

  const requiredCount = stepQuestions.filter((question) => question.required).length;
  const answeredRequiredCount = stepQuestions.filter(
    (question) => question.required && (answers[question.id] ?? '').trim()
  ).length;
  const progress = submitted ? 100 : ((step + 1) / 3) * 100;
  const errorCount = Object.keys(errors).length;

  const levelLabel = level ? AUDITION_LEVEL_LABELS[level] : null;
  const trackLabel = track ? AUDITION_TRACK_LABELS[track] : null;

  const stepEyebrow =
    step === 0 ? 'Étape 1 · Profil' : step === 1 ? 'Étape 2 · Questionnaire' : 'Étape 3 · Motivation';
  const stepTitle =
    step === 0
      ? 'Informations générales'
      : step === 1
        ? `Questions ${levelLabel ?? ''}${trackLabel ? ` · ${trackLabel}` : ''}`.trim()
        : 'Dernière étape';
  const stepDescription =
    step === 0
      ? "Fais connaissance avec le club : ces informations nous permettent de te recontacter et d'adapter le questionnaire à ton parcours."
      : step === 1
        ? `${levelQuestions.length} questions adaptées à ton niveau et à ta filière. Réponds seul(e), sans aide extérieure.`
        : 'Deux dernières questions pour mieux comprendre tes ambitions au sein du club.';

  useEffect(() => {
    if (!hasMountedRef.current) {
      hasMountedRef.current = true;
      return;
    }
    containerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    headingRef.current?.focus({ preventScroll: true });
  }, [step, submitted]);

  const validateQuestions = (questions: AuditionQuestion[]) => {
    const nextErrors: Record<string, string> = {};
    for (const question of questions) {
      const message = validateAuditionQuestion(question, answers[question.id] ?? '');
      if (message) nextErrors[question.id] = message;
    }
    return nextErrors;
  };

  const focusFirstError = (questionId: string) => {
    window.requestAnimationFrame(() => {
      const container = formRef.current?.querySelector<HTMLElement>(
        `[data-question-id="${questionId}"]`
      );
      const field = container?.querySelector<HTMLElement>('input, textarea, button');
      field?.focus();
      field?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  };

  const goToNextStep = () => {
    const nextErrors = validateQuestions(stepQuestions);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setShowErrorSummary(true);
      focusFirstError(Object.keys(nextErrors)[0]);
      return;
    }

    setShowErrorSummary(false);
    setStep((current) => Math.min(current + 1, 2));
  };

  const goToPreviousStep = () => {
    setShowErrorSummary(false);
    setErrors({});
    setStep((current) => Math.max(current - 1, 0));
  };

  const handleAnswerChange = (questionId: string, value: string) => {
    setAnswers((previous) => ({ ...previous, [questionId]: value }));
    setErrors((previous) => {
      if (!previous[questionId]) return previous;
      const next = { ...previous };
      delete next[questionId];
      return next;
    });
  };

  const submitAudition = async () => {
    const generalErrors = validateQuestions(AUDITION_GENERAL_QUESTIONS);
    const levelErrors = validateQuestions(levelQuestions);
    const finalErrors = validateQuestions(AUDITION_FINAL_QUESTIONS);
    const allErrors = { ...generalErrors, ...levelErrors, ...finalErrors };

    if (Object.keys(allErrors).length > 0) {
      setErrors(allErrors);
      setShowErrorSummary(true);
      const firstErrorStep =
        Object.keys(generalErrors).length > 0 ? 0 : Object.keys(levelErrors).length > 0 ? 1 : 2;
      setStep(firstErrorStep);
      const firstErrorId = Object.keys(allErrors)[0];
      window.setTimeout(() => focusFirstError(firstErrorId), 150);
      return;
    }

    if (!level || !track) {
      setSubmitError('Sélectionne ton niveau et ta filière avant de continuer.');
      setStep(0);
      return;
    }

    setSubmitting(true);
    setSubmitError(null);

    try {
      const responses: Record<string, string> = {};
      const submissionAnswers: AuditionSubmissionAnswer[] = [];
      const allQuestions = [
        ...AUDITION_GENERAL_QUESTIONS,
        ...levelQuestions,
        ...AUDITION_FINAL_QUESTIONS,
      ];

      for (const question of allQuestions) {
        const rawValue = (answers[question.id] ?? '').trim();
        if (!rawValue) continue;

        submissionAnswers.push({
          questionId: question.id,
          tallyId: question.tallyId,
          section: getAuditionAnswerSection(question.id),
          question: question.label,
          value: rawValue,
          displayValue:
            question.type === 'choice'
              ? getAuditionAnswerLabel(question, rawValue)
              : rawValue,
        });
      }

      // Enregistrement dans le fichier JSON (ou localStorage si API indisponible).
      try {
        const saved = await saveAuditionSubmission({
          fullName: (answers['g-nom-et-prenom'] ?? '').trim(),
          email: (answers['g-adresse-email'] ?? '').trim(),
          whatsapp: normalizePhone(answers['g-numero-whatsapp'] ?? ''),
          githubUrl: normalizeUrl(answers['f-lien-github-ou-portfolio-facultatif'] ?? ''),
          level,
          track,
          tallySubmitted: false,
          answers: submissionAnswers,
        });
        setSavedResult({ id: saved.submission.id, storage: saved.storage });
      } catch {
        // Le stockage a échoué : la candidature restera visible sur cet appareil.
        setSavedResult({ id: 'local-' + Date.now(), storage: 'local' });
      }

      setSubmitted(true);
      setShowErrorSummary(false);
      setErrors({});
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Erreur réseau inconnue');
    } finally {
      setSubmitting(false);
    }
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submitting || submitted) return;

    if (step < 2) {
      goToNextStep();
      return;
    }

    void submitAudition();
  };

  const resetForm = () => {
    setAnswers({});
    setErrors({});
    setShowErrorSummary(false);
    setSubmitError(null);
    setSubmitted(false);
    setSavedResult(null);
    setStep(0);
  };

  const fullName = (answers['g-nom-et-prenom'] ?? '').trim();
  const firstName = fullName.split(/\s+/)[0] ?? '';
  const successRows = [
    { label: 'Nom', value: fullName || '—' },
    { label: 'Niveau', value: levelLabel ?? '—' },
    { label: 'Filière', value: trackLabel ?? '—' },
    { label: 'Email', value: answers['g-adresse-email'] || '—' },
    { label: 'WhatsApp', value: answers['g-numero-whatsapp'] || '—' },
  ];

  return (
    <div ref={containerRef} className="scroll-mt-24">
      <div className="mb-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-slate-600">
        <span className="inline-flex items-center gap-1.5">
          <ListChecks className="h-4 w-4 text-[#261c72]" />
          {AUDITION_FORM.questionsCount} questions, dont {AUDITION_FORM.levelQuestionsCount}{' '}
          adaptées à ton profil
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Clock className="h-4 w-4 text-[#ff7f00]" />
          Durée estimée : {AUDITION_FORM.durationLabel}
        </span>
      </div>

      {submitted ? (
        <div
          role="status"
          className="rounded-3xl border border-emerald-200 bg-emerald-50/40 p-6 text-center sm:p-8"
        >
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-emerald-200 bg-white shadow-sm">
            <CheckCircle2 className="h-8 w-8 text-emerald-600" />
          </div>

          <h3 className="mt-4 text-xl font-bold tracking-tight text-slate-900">
            Candidature envoyée !
          </h3>
          <p className="mx-auto mt-2 max-w-md text-sm text-slate-600">
            Merci{firstName ? ` ${firstName}` : ''} ! Ta candidature a bien été enregistrée par le
            Club GIT.
          </p>

          <dl className="mx-auto mt-6 grid max-w-md grid-cols-1 gap-x-4 gap-y-3 rounded-2xl border border-slate-200 bg-white p-4 text-left text-xs sm:grid-cols-2">
            {successRows.map((row) => (
              <div key={row.label}>
                <dt className="font-semibold uppercase tracking-wide text-slate-400">{row.label}</dt>
                <dd className="mt-0.5 break-words font-medium text-slate-900">{row.value}</dd>
              </div>
            ))}
          </dl>

          <div className="mx-auto mt-5 max-w-md rounded-2xl border border-blue-200 bg-blue-50 p-4 text-left text-xs text-blue-950">
            <p className="font-bold">Et maintenant ?</p>
            <p className="mt-1 leading-relaxed text-slate-700">
              Le bureau du club te contactera par WhatsApp ou par email pour la suite. L'audition se
              déroule en présentiel à l'ENSPD ; les frais d'adhésion de 1 000 FCFA se règlent sur
              place le jour du challenge.
            </p>
          </div>

          {savedResult && (
            <div
              className={`mx-auto mt-4 max-w-md rounded-2xl border p-3.5 text-left text-xs ${
                savedResult.storage === 'server'
                  ? 'border-emerald-200 bg-emerald-50 text-emerald-900'
                  : 'border-amber-200 bg-amber-50 text-amber-900'
              }`}
            >
              <p className="font-semibold">
                {savedResult.storage === 'server'
                  ? 'Candidature enregistrée dans le fichier du club.'
                  : "Candidature enregistrée sur cet appareil uniquement (serveur indisponible)."}
              </p>
              <p className="mt-1 leading-relaxed text-slate-700">
                {savedResult.storage === 'server'
                  ? 'Conserve le lien ci-dessous : il te permet de retrouver le récapitulatif de tes réponses à tout moment.'
                  : 'Le récapitulatif reste accessible depuis ce navigateur. Pense à faire une capture si tu changes d’appareil.'}
              </p>
            </div>
          )}

          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap">
            {savedResult && (
              <button
                type="button"
                onClick={() => navigate(`/resultats/${savedResult.id}`)}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#261c72] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#1d1557]"
              >
                <Eye className="h-4 w-4" />
                Voir mes résultats
              </button>
            )}
            <button
              type="button"
              onClick={resetForm}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:border-slate-400 hover:bg-slate-50"
            >
              <RotateCcw className="h-4 w-4" />
              Remplir une autre candidature
            </button>
            <button
              type="button"
              onClick={() => navigate('/')}
              className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors ${
                savedResult
                  ? 'border border-slate-300 bg-white text-slate-700 hover:border-slate-400 hover:bg-slate-50'
                  : 'bg-[#261c72] text-white hover:bg-[#1d1557]'
              }`}
            >
              Retour à l'accueil
            </button>
          </div>
        </div>
      ) : (
        <form ref={formRef} onSubmit={handleFormSubmit} noValidate>
          <div className="mb-6">
            <div className="mb-2 flex items-center justify-between gap-3 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
              <span>Étape {step + 1} sur 3</span>
              <span className="font-mono normal-case tracking-normal text-[#261c72]">
                {answeredRequiredCount}/{requiredCount} réponses requises
              </span>
            </div>
            <div
              className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100"
              role="progressbar"
              aria-label="Progression du formulaire d'audition"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(progress)}
            >
              <div
                className="h-full rounded-full bg-[#261c72] transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="mt-5">
              <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#ff7f00]">
                {stepEyebrow}
              </p>
              <h3
                ref={headingRef}
                tabIndex={-1}
                className="mt-1 text-lg font-bold tracking-tight text-slate-900 outline-none sm:text-xl"
              >
                {stepTitle}
              </h3>
              <p className="mt-1 text-xs leading-relaxed text-slate-500 sm:text-sm">
                {stepDescription}
              </p>
            </div>
          </div>

          {showErrorSummary && errorCount > 0 && (
            <div
              role="alert"
              className="mb-6 flex items-start gap-2.5 rounded-2xl border border-red-200 bg-red-50 p-3.5 text-xs text-red-700"
            >
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
              <p>
                <strong className="font-bold">
                  {errorCount === 1
                    ? 'Une réponse est à compléter ou à corriger.'
                    : `${errorCount} réponses sont à compléter ou à corriger.`}
                </strong>{' '}
                Vérifie les champs signalés ci-dessous.
              </p>
            </div>
          )}

          <div className="space-y-7">
            {stepQuestions.map((question, index) => (
              <QuestionField
                key={question.id}
                question={question}
                index={index}
                value={answers[question.id] ?? ''}
                error={errors[question.id]}
                onChange={(value) => handleAnswerChange(question.id, value)}
              />
            ))}
          </div>

          {step === 1 && levelQuestions.length === 0 && (
            <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-xs text-amber-900">
              Sélectionne d'abord ton niveau et ta filière à l'étape précédente pour afficher les
              questions adaptées.
            </div>
          )}

          {submitError && (
            <div
              role="alert"
              className="mt-6 rounded-2xl border border-amber-300 bg-amber-50 p-4 text-xs text-amber-950 sm:text-sm"
            >
              <div className="flex items-start gap-2.5">
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                <div className="space-y-1.5">
                  <p className="font-bold">L'envoi de ta candidature n'a pas abouti.</p>
                  <p className="leading-relaxed text-amber-900">
                    Vérifie ta connexion, puis réessaie. Si le problème persiste, écris-nous
                    directement.
                  </p>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 pt-1">
                    <a
                      href={`mailto:${CLUB_META.email}?subject=${encodeURIComponent(
                        'Candidature audition - Club GIT'
                      )}`}
                      className="inline-flex items-center gap-1 font-semibold text-[#261c72] underline-offset-2 hover:underline"
                    >
                      Écrire au club
                      <Mail className="h-3 w-3" />
                    </a>
                  </div>
                  <p className="font-mono text-[10px] text-amber-700/80">Détail : {submitError}</p>
                </div>
              </div>
            </div>
          )}

          <div className="mt-8 flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              {step > 0 && (
                <button
                  type="button"
                  onClick={goToPreviousStep}
                  disabled={submitting}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:border-slate-400 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Précédent
                </button>
              )}
            </div>

            <button
              type="submit"
              disabled={submitting || (step === 1 && levelQuestions.length === 0)}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#261c72] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#1d1557] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
            >
              {submitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Envoi en cours…
                </>
              ) : step < 2 ? (
                <>
                  Continuer
                  <ArrowRight className="h-4 w-4" />
                </>
              ) : (
                <>
                  Envoyer ma candidature
                  <Send className="h-4 w-4" />
                </>
              )}
            </button>
          </div>
        </form>
      )}

      <p className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-slate-500">
        <span>Formulaire d'audition du Club GIT.</span>
        <a
          href={`mailto:${CLUB_META.email}`}
          className="inline-flex items-center gap-1 font-medium text-[#261c72] underline-offset-2 hover:underline"
        >
          <Mail className="h-3 w-3" />
          {CLUB_META.email}
        </a>
      </p>
    </div>
  );
};
