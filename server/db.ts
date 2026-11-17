import { Pool } from 'pg';

/**
 * Chaîne de connexion Postgres.
 * Vercel Postgres / Neon exposent `POSTGRES_URL` ; Neon (marketplace) et la
 * plupart des hébergeurs exposent aussi `DATABASE_URL`.
 */
function readConnectionString(): string {
  return (
    process.env.DATABASE_URL ||
    process.env.POSTGRES_URL ||
    process.env.POSTGRES_PRISMA_URL ||
    ''
  ).trim();
}

export function isDatabaseConfigured(): boolean {
  return readConnectionString().length > 0;
}

const globalForPool = globalThis as typeof globalThis & {
  __clubGitPgPool?: Pool;
};

/**
 * Pool partagé (réutilisé entre invocations d'une même instance serverless).
 * `max` reste bas car Vercel Postgres/Neon mutualise déjà les connexions.
 */
export function getPool(): Pool {
  const connectionString = readConnectionString();
  if (!connectionString) {
    throw new Error(
      'Aucune base Postgres configurée : définissez DATABASE_URL ou POSTGRES_URL.'
    );
  }

  if (!globalForPool.__clubGitPgPool) {
    const isLocal = /(^|@)(localhost|127\.0\.0\.1|::1)(:|\/|$)/.test(connectionString);
    globalForPool.__clubGitPgPool = new Pool({
      connectionString,
      max: process.env.VERCEL ? 3 : 10,
      idleTimeoutMillis: 30_000,
      connectionTimeoutMillis: 10_000,
      ssl: isLocal ? undefined : { rejectUnauthorized: false },
    });
  }

  return globalForPool.__clubGitPgPool;
}
