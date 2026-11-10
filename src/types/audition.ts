export type AuditionLevel = 1 | 2 | 3 | 4;

export type AuditionTrack = 'informatique' | 'telecoms';

export type AuditionQuestionType = 'text' | 'email' | 'tel' | 'url' | 'textarea' | 'choice';

export interface AuditionOption {
  tallyId: string;
  label: string;
}

export interface AuditionQuestion {
  /** Identifiant stable utilisé par le formulaire React. */
  id: string;
  /** Identifiant historique de la question (conservé pour la compatibilité). */
  tallyId: string;
  label: string;
  type: AuditionQuestionType;
  required: boolean;
  /** Question spécifique à une filière (affichée uniquement pour celle-ci). */
  track?: AuditionTrack;
  options?: AuditionOption[];
}

/** Réponses du formulaire : identifiant de question → valeur ou identifiant d'option Tally. */
export type AuditionAnswers = Record<string, string>;

export type AuditionSubmissionSection = 'general' | 'level' | 'final';

/** Réponse telle qu'enregistrée dans le fichier JSON, avec un libellé lisible. */
export interface AuditionSubmissionAnswer {
  questionId: string;
  tallyId: string;
  section: AuditionSubmissionSection;
  question: string;
  /** Valeur brute enregistrée (identifiant d'option Tally ou texte saisi). */
  value: string;
  /** Valeur lisible pour les pages de résultats. */
  displayValue: string;
}

/** Données envoyées par le navigateur après une candidature. */
export interface AuditionSubmissionInput {
  fullName: string;
  email: string;
  whatsapp: string;
  githubUrl: string;
  level: AuditionLevel;
  track: AuditionTrack;
  tallySubmitted: boolean;
  answers: AuditionSubmissionAnswer[];
}

/** Candidature persistée côté serveur (ou en repli dans le localStorage). */
export interface AuditionSubmission extends AuditionSubmissionInput {
  id: string;
  submittedAt: string;
}
