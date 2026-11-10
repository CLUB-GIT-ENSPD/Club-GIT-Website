import { randomUUID } from 'node:crypto';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import type {
  AuditionSubmission,
  AuditionSubmissionInput,
} from '../src/types/audition.ts';

const DATA_DIR = fileURLToPath(new URL('../data', import.meta.url));
const DATA_FILE = path.join(DATA_DIR, 'audition-submissions.json');
const TEMP_FILE = path.join(DATA_DIR, 'audition-submissions.json.tmp');

/** Sérialise les écritures pour éviter deux lectures/écritures simultanées. */
let writeQueue: Promise<unknown> = Promise.resolve();

async function readSubmissions(): Promise<AuditionSubmission[]> {
  try {
    const raw = await fs.readFile(DATA_FILE, 'utf8');
    if (!raw.trim()) return [];
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as AuditionSubmission[]) : [];
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') return [];
    throw error;
  }
}

export async function listSubmissions(): Promise<AuditionSubmission[]> {
  return readSubmissions();
}

export async function findSubmission(
  id: string
): Promise<AuditionSubmission | null> {
  const submissions = await readSubmissions();
  return submissions.find((submission) => submission.id === id) ?? null;
}

export function addSubmission(
  input: AuditionSubmissionInput
): Promise<AuditionSubmission> {
  const task = writeQueue.then(async () => {
    const submissions = await readSubmissions();
    const submission: AuditionSubmission = {
      ...input,
      id: randomUUID(),
      submittedAt: new Date().toISOString(),
    };

    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.writeFile(
      TEMP_FILE,
      `${JSON.stringify([submission, ...submissions], null, 2)}\n`,
      'utf8'
    );
    await fs.rename(TEMP_FILE, DATA_FILE);

    return submission;
  });

  writeQueue = task.catch(() => undefined);
  return task;
}

export const SUBMISSIONS_FILE = DATA_FILE;
