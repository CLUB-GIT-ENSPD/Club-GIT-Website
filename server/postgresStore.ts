import { randomUUID } from 'node:crypto';
import type {
  AuditionSubmission,
  AuditionSubmissionInput,
} from '../src/types/audition';
import { getPool } from './db';

const SCHEMA_SQL = `
create table if not exists audition_submissions (
  id uuid primary key,
  submitted_at timestamptz not null,
  full_name text not null,
  email text not null,
  whatsapp text not null default '',
  github_url text not null default '',
  level smallint not null check (level between 1 and 4),
  track text not null check (track in ('informatique', 'telecoms')),
  tally_submitted boolean not null default false,
  answers jsonb not null default '[]'::jsonb
);

create index if not exists audition_submissions_submitted_at_idx
  on audition_submissions (submitted_at desc);
`;

interface SubmissionRow {
  id: string;
  submitted_at: Date | string;
  full_name: string;
  email: string;
  whatsapp: string | null;
  github_url: string | null;
  level: number;
  track: string;
  tally_submitted: boolean;
  answers: unknown;
}

const SELECT_COLUMNS = `
  id,
  submitted_at,
  full_name,
  email,
  whatsapp,
  github_url,
  level,
  track,
  tally_submitted,
  answers
`;

const UUID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function mapRow(row: SubmissionRow): AuditionSubmission {
  return {
    id: row.id,
    submittedAt: new Date(row.submitted_at).toISOString(),
    fullName: row.full_name,
    email: row.email,
    whatsapp: row.whatsapp ?? '',
    githubUrl: row.github_url ?? '',
    level: row.level as AuditionSubmission['level'],
    track: row.track as AuditionSubmission['track'],
    tallySubmitted: row.tally_submitted,
    answers: Array.isArray(row.answers)
      ? (row.answers as AuditionSubmission['answers'])
      : [],
  };
}

let schemaReady: Promise<void> | null = null;

/** Crée la table au premier accès (idempotent, sans script de migration). */
export function ensureSchema(): Promise<void> {
  if (!schemaReady) {
    schemaReady = getPool()
      .query(SCHEMA_SQL)
      .then(() => undefined)
      .catch((error) => {
        schemaReady = null;
        throw error;
      });
  }
  return schemaReady;
}

export async function listSubmissions(): Promise<AuditionSubmission[]> {
  await ensureSchema();
  const { rows } = await getPool().query<SubmissionRow>(
    `select ${SELECT_COLUMNS}
       from audition_submissions
      order by submitted_at desc`
  );
  return rows.map(mapRow);
}

export async function findSubmission(
  id: string
): Promise<AuditionSubmission | null> {
  if (!UUID_PATTERN.test(id)) return null;

  await ensureSchema();
  const { rows } = await getPool().query<SubmissionRow>(
    `select ${SELECT_COLUMNS}
       from audition_submissions
      where id = $1
      limit 1`,
    [id]
  );
  return rows[0] ? mapRow(rows[0]) : null;
}

export async function addSubmission(
  input: AuditionSubmissionInput
): Promise<AuditionSubmission> {
  await ensureSchema();

  const submission: AuditionSubmission = {
    ...input,
    id: randomUUID(),
    submittedAt: new Date().toISOString(),
  };

  await getPool().query(
    `insert into audition_submissions
       (id, submitted_at, full_name, email, whatsapp, github_url, level, track, tally_submitted, answers)
     values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10::jsonb)`,
    [
      submission.id,
      submission.submittedAt,
      submission.fullName,
      submission.email,
      submission.whatsapp,
      submission.githubUrl,
      submission.level,
      submission.track,
      submission.tallySubmitted,
      JSON.stringify(submission.answers),
    ]
  );

  return submission;
}
