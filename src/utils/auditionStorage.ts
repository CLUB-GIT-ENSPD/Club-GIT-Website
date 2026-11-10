import type { AuditionSubmission, AuditionSubmissionInput } from '../types/audition';

const API_URL = '/api/audition-submissions';
const LOCAL_STORAGE_KEY = 'club-git-audition-submissions-v1';
const ADMIN_CODE_KEY = 'club-git-admin-code';

export type SubmissionStorage = 'server' | 'local';

export interface SaveSubmissionResult {
  submission: AuditionSubmission;
  storage: SubmissionStorage;
}

export interface SubmissionWithSource {
  submission: AuditionSubmission;
  storage: SubmissionStorage;
}

export type AdminSubmissionsResult =
  | { ok: true; submissions: AuditionSubmission[]; storage: SubmissionStorage }
  | { ok: false; reason: 'unauthorized' };

const createUuid = (): string => {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (char) => {
    const random = (Math.random() * 16) | 0;
    const value = char === 'x' ? random : (random & 0x3) | 0x8;
    return value.toString(16);
  });
};

const isJsonResponse = (response: Response): boolean =>
  (response.headers.get('content-type') ?? '').toLowerCase().includes('application/json');

function readLocalSubmissions(): AuditionSubmission[] {
  try {
    const raw = window.localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (item): item is AuditionSubmission =>
        Boolean(item) &&
        typeof item === 'object' &&
        typeof (item as AuditionSubmission).id === 'string' &&
        Array.isArray((item as AuditionSubmission).answers)
    );
  } catch {
    return [];
  }
}

function writeLocalSubmissions(submissions: AuditionSubmission[]): boolean {
  try {
    window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(submissions));
    return true;
  } catch {
    return false;
  }
}

function saveLocalSubmission(submission: AuditionSubmission): boolean {
  const existing = readLocalSubmissions().filter((item) => item.id !== submission.id);
  return writeLocalSubmissions([submission, ...existing]);
}

/**
 * Enregistre la candidature dans le fichier JSON via l'API Express.
 * Si l'API n'est pas disponible (hébergement statique, serveur arrêté…),
 * la candidature est conservée dans le localStorage du navigateur.
 */
export async function saveAuditionSubmission(
  input: AuditionSubmissionInput
): Promise<SaveSubmissionResult> {
  const fallback: AuditionSubmission = {
    ...input,
    id: createUuid(),
    submittedAt: new Date().toISOString(),
  };

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(input),
    });

    if (response.ok && isJsonResponse(response)) {
      const payload = (await response.json()) as {
        ok?: boolean;
        submission?: AuditionSubmission;
      };
      if (payload.ok && payload.submission?.id) {
        return { submission: payload.submission, storage: 'server' };
      }
    }
  } catch {
    // API indisponible : on bascule sur le stockage local.
  }

  saveLocalSubmission(fallback);
  return { submission: fallback, storage: 'local' };
}

/** Récupère une candidature par son identifiant (serveur, puis localStorage). */
export async function getAuditionSubmission(
  id: string
): Promise<SubmissionWithSource | null> {
  try {
    const response = await fetch(`${API_URL}/${encodeURIComponent(id)}`, {
      headers: { Accept: 'application/json' },
    });

    if (response.ok && isJsonResponse(response)) {
      const payload = (await response.json()) as {
        ok?: boolean;
        submission?: AuditionSubmission;
      };
      if (payload.ok && payload.submission) {
        return { submission: payload.submission, storage: 'server' };
      }
    }
  } catch {
    // Serveur indisponible : on cherche dans le stockage local.
  }

  const local = readLocalSubmissions().find((item) => item.id === id);
  return local ? { submission: local, storage: 'local' } : null;
}

/**
 * Liste toutes les candidatures.
 * Sans code valide sur un serveur actif, renvoie `unauthorized`.
 * Si aucun serveur ne répond, renvoie les candidatures locales.
 */
export async function fetchAuditionSubmissions(
  adminCode: string
): Promise<AdminSubmissionsResult> {
  try {
    const response = await fetch(API_URL, {
      headers: {
        Accept: 'application/json',
        ...(adminCode ? { 'x-admin-code': adminCode } : {}),
      },
    });

    if (response.status === 401) {
      return { ok: false, reason: 'unauthorized' };
    }

    if (response.ok && isJsonResponse(response)) {
      const payload = (await response.json()) as {
        ok?: boolean;
        submissions?: AuditionSubmission[];
      };
      if (payload.ok && Array.isArray(payload.submissions)) {
        return { ok: true, submissions: payload.submissions, storage: 'server' };
      }
    }
  } catch {
    // Site statique ou serveur arrêté : repli local.
  }

  return { ok: true, submissions: readLocalSubmissions(), storage: 'local' };
}

export function readAdminCode(): string {
  try {
    return window.sessionStorage.getItem(ADMIN_CODE_KEY) ?? '';
  } catch {
    return '';
  }
}

export function storeAdminCode(code: string): void {
  try {
    window.sessionStorage.setItem(ADMIN_CODE_KEY, code);
  } catch {
    // sessionStorage indisponible : le code reste en mémoire dans la page.
  }
}

export function clearAdminCode(): void {
  try {
    window.sessionStorage.removeItem(ADMIN_CODE_KEY);
  } catch {
    // Rien à nettoyer.
  }
}

export function downloadSubmissionsJson(submissions: AuditionSubmission[]): void {
  const blob = new Blob([JSON.stringify(submissions, null, 2)], {
    type: 'application/json',
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `auditions-club-git-${new Date().toISOString().slice(0, 10)}.json`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

export function formatSubmissionDate(isoDate: string): string {
  const date = new Date(isoDate);
  if (Number.isNaN(date.getTime())) return isoDate;
  return new Intl.DateTimeFormat('fr-FR', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(date);
}
