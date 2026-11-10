import type {
  AuditionQuestion,
  AuditionSubmissionSection,
} from '../types/audition';

export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const normalizeUrl = (value: string): string => {
  const trimmed = value.trim();
  if (!trimmed) return '';
  return /^[a-z][a-z0-9+.-]*:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
};

/** Tally enregistre les numéros au format international (ex. +237612345678). */
export const normalizePhone = (value: string): string => {
  let digits = value.replace(/\D/g, '');
  if (!digits) return '';

  if (digits.startsWith('00')) digits = digits.slice(2);
  if (digits.startsWith('237')) return `+${digits}`;
  if (digits.length === 9) return `+237${digits}`;
  if (digits.length === 10 && digits.startsWith('0')) return `+237${digits.slice(1)}`;

  return `+${digits}`;
};

export const isValidUrl = (value: string): boolean => {
  try {
    const url = new URL(normalizeUrl(value));
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
};

export function validateAuditionQuestion(
  question: AuditionQuestion,
  value: string
): string | null {
  const trimmed = value.trim();

  if (!trimmed) {
    return question.required ? 'Cette question est obligatoire.' : null;
  }

  if (question.type === 'email' && !EMAIL_PATTERN.test(trimmed)) {
    return 'Saisis une adresse email valide.';
  }

  if (question.type === 'tel' && trimmed.replace(/\D/g, '').length < 6) {
    return 'Saisis un numéro de téléphone valide.';
  }

  if (question.type === 'url' && !isValidUrl(trimmed)) {
    return 'Saisis un lien valide (ex. https://github.com/ton-profil).';
  }

  return null;
}

/** Libellé lisible d'une réponse (UUID d'option Tally ou libellé déjà résolu). */
export function getAuditionAnswerLabel(
  question: AuditionQuestion,
  value: string
): string {
  if (question.type !== 'choice') return value;
  return question.options?.find((option) => option.tallyId === value)?.label ?? value;
}

/**
 * Valeur lisible d'une réponse pour l'envoi à Tally.
 * Conserver pour la compatibilité ; actuellement, l'envoi à Tally est désactivé.
 */
export function getAuditionTallyValue(
  question: AuditionQuestion,
  value: string
): string {
  const trimmed = value.trim();
  if (!trimmed) return '';
  if (question.type === 'url') return normalizeUrl(trimmed);
  if (question.type === 'tel') return normalizePhone(trimmed);
  return trimmed;
}

export function getAuditionAnswerSection(
  questionId: string
): AuditionSubmissionSection {
  if (questionId.startsWith('g-')) return 'general';
  if (questionId.startsWith('f-')) return 'final';
  return 'level';
}
