import type { AuditionSubmission, AuditionSubmissionInput } from '../types/audition';

const API_URL = '/api/audition-submissions';

export type AdminSubmissionsResult =
  | { ok: true; submissions: AuditionSubmission[] }
  | { ok: false; reason: 'unauthorized' | 'network' | 'error'; status?: number; code?: string };

/**
 * Code administrateur gardé uniquement en mémoire, le temps de la session de
 * navigation dans la page (aucun localStorage / sessionStorage). Un
 * rechargement complet demande donc de le ressaisir.
 */
let adminCodeInMemory = '';

export function readAdminCode(): string {
  return adminCodeInMemory;
}

export function storeAdminCode(code: string): void {
  adminCodeInMemory = code;
}

export function clearAdminCode(): void {
  adminCodeInMemory = '';
}

const isJsonResponse = (response: Response): boolean =>
  (response.headers.get('content-type') ?? '').toLowerCase().includes('application/json');

/**
 * Enregistre la candidature côté serveur (Postgres).
 * Aucun repli local : si l'API est indisponible, une erreur explicite est levée
 * pour que le candidat sache que sa candidature n'a pas été envoyée.
 */
export async function saveAuditionSubmission(
  input: AuditionSubmissionInput
): Promise<AuditionSubmission> {
  let response: Response;

  try {
    response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(input),
    });
  } catch {
    throw new Error(
      "Impossible de joindre le serveur du club. Vérifie ta connexion puis réessaie : ta candidature n'a pas été envoyée."
    );
  }

  const payload = isJsonResponse(response)
    ? ((await response.json()) as {
        ok?: boolean;
        submission?: AuditionSubmission;
        error?: string;
      })
    : null;

  if (!response.ok || !payload?.ok || !payload.submission?.id) {
    throw new Error(
      payload?.error === 'INVALID_SUBMISSION'
        ? 'Le formulaire est incomplet : vérifie tes réponses puis réessaie.'
        : "Le serveur n'a pas pu enregistrer ta candidature. Réessaie dans un instant ; si le problème persiste, contacte le bureau du club."
    );
  }

  return payload.submission;
}

/** Récupère une candidature par son identifiant, uniquement depuis le serveur. */
export async function getAuditionSubmission(
  id: string
): Promise<AuditionSubmission | null> {
  const response = await fetch(`${API_URL}/${encodeURIComponent(id)}`, {
    headers: { Accept: 'application/json' },
  });

  if (response.status === 404) return null;

  if (!response.ok || !isJsonResponse(response)) {
    throw new Error(
      `Le serveur a répondu ${response.status} : impossible de charger la candidature.`
    );
  }

  const payload = (await response.json()) as {
    ok?: boolean;
    submission?: AuditionSubmission;
  };

  return payload.ok && payload.submission ? payload.submission : null;
}

/**
 * Liste toutes les candidatures enregistrées côté serveur.
 * - `unauthorized` : code administrateur absent ou incorrect ;
 * - `network` : serveur/API injoignable ;
 * - `error` : le serveur est joignable mais renvoie une erreur (base indisponible…).
 */
export async function fetchAuditionSubmissions(
  adminCode: string
): Promise<AdminSubmissionsResult> {
  let response: Response;

  try {
    response = await fetch(API_URL, {
      headers: {
        Accept: 'application/json',
        ...(adminCode ? { 'x-admin-code': adminCode } : {}),
      },
    });
  } catch {
    return { ok: false, reason: 'network' };
  }

  if (response.status === 401 || response.status === 503) {
    return { ok: false, reason: 'unauthorized', status: response.status };
  }

  if (!response.ok || !isJsonResponse(response)) {
    return { ok: false, reason: 'error', status: response.status };
  }

  const payload = (await response.json()) as {
    ok?: boolean;
    submissions?: AuditionSubmission[];
    error?: string;
  };

  if (!payload.ok || !Array.isArray(payload.submissions)) {
    return { ok: false, reason: 'error', status: response.status, code: payload.error };
  }

  return { ok: true, submissions: payload.submissions };
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
