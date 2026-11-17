import type {
  AuditionSubmission,
  AuditionSubmissionInput,
} from '../src/types/audition';
import { isDatabaseConfigured } from './db.js';
import * as fileStore from './fileSubmissionsStore.js';
import * as postgresStore from './postgresStore.js';

export type SubmissionStorageKind = 'postgres' | 'file';

/**
 * Postgres dès qu'une base est configurée (Vercel Postgres/Neon).
 * Sinon on retombe sur le fichier JSON local, pratique en développement mais
 * non partagé entre machines — jamais utilisé sur Vercel (aucune variable = erreur
 * visible côté API, voir `getPool`).
 */
export function getSubmissionStorage(): SubmissionStorageKind {
  if (isDatabaseConfigured()) return 'postgres';

  if (process.env.VERCEL) {
    throw new Error(
      'Postgres non configuré sur Vercel : définissez DATABASE_URL ou POSTGRES_URL.'
    );
  }

  return 'file';
}

let warnedAboutFileStorage = false;

export function listSubmissions(): Promise<AuditionSubmission[]> {
  if (getSubmissionStorage() === 'postgres') {
    return postgresStore.listSubmissions();
  }

  if (!warnedAboutFileStorage) {
    warnedAboutFileStorage = true;
    console.warn(
      '[audition-store] Aucune base Postgres configurée : stockage dans data/audition-submissions.json (local uniquement).'
    );
  }
  return fileStore.listSubmissions();
}

export function findSubmission(id: string): Promise<AuditionSubmission | null> {
  return getSubmissionStorage() === 'postgres'
    ? postgresStore.findSubmission(id)
    : fileStore.findSubmission(id);
}

export function addSubmission(
  input: AuditionSubmissionInput
): Promise<AuditionSubmission> {
  return getSubmissionStorage() === 'postgres'
    ? postgresStore.addSubmission(input)
    : fileStore.addSubmission(input);
}

export const SUBMISSIONS_FILE = fileStore.SUBMISSIONS_FILE;
