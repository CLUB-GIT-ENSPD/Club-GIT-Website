import { randomUUID } from 'node:crypto';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import type {
  AuditionSubmission,
  AuditionSubmissionInput,
} from '../src/types/audition';

interface DataPaths {
  dir: string;
  file: string;
  temp: string;
}

let cachedPaths: DataPaths | null = null;

/**
 * Chemins du fichier JSON, calculés au premier usage et non à l'import.
 *
 * Sur Vercel les fonctions sont compilées en CJS : `import.meta.url` y vaut
 * `undefined`, donc `new URL('../data', import.meta.url)` lève « Invalid URL »
 * dès le chargement du module — toutes les routes API répondaient alors
 * `FUNCTION_INVOCATION_FAILED`. Le stockage fichier n'étant jamais utilisé en
 * production (Postgres configuré), le repli sur `process.cwd()` suffit.
 */
function getPaths(): DataPaths {
  if (!cachedPaths) {
    let dir: string;
    try {
      dir = fileURLToPath(new URL('../data', import.meta.url));
    } catch {
      dir = path.resolve(process.cwd(), 'data');
    }
    cachedPaths = {
      dir,
      file: path.join(dir, 'audition-submissions.json'),
      temp: path.join(dir, 'audition-submissions.json.tmp'),
    };
  }
  return cachedPaths;
}

/** Sérialise les écritures pour éviter deux lectures/écritures simultanées. */
let writeQueue: Promise<unknown> = Promise.resolve();

async function readSubmissions(): Promise<AuditionSubmission[]> {
  try {
    const raw = await fs.readFile(getPaths().file, 'utf8');
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

    const { dir, file, temp } = getPaths();

    await fs.mkdir(dir, { recursive: true });
    await fs.writeFile(
      temp,
      `${JSON.stringify([submission, ...submissions], null, 2)}\n`,
      'utf8'
    );
    await fs.rename(temp, file);

    return submission;
  });

  writeQueue = task.catch(() => undefined);
  return task;
}
