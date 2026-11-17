import type { IncomingMessage, ServerResponse } from 'node:http';
import { createAuditionApi } from './api';

type VercelHandler = (req: IncomingMessage, res: ServerResponse) => void;

/**
 * Adapte l'application Express aux Vercel Functions.
 *
 * Vercel transmet l'URL complète (`/api/audition-submissions/…`) : on retire
 * le préfixe `/api` pour retrouver les routes définies dans `server/api.ts`.
 * Chaque fonction Vercel (voir le dossier `api/`) réutilise ce handler.
 */
export function createVercelHandler(): VercelHandler {
  const api = createAuditionApi();

  return (req, res) => {
    const url = req.url ?? '/';
    if (url === '/api' || url.startsWith('/api/') || url.startsWith('/api?')) {
      const rest = url.slice(4);
      req.url = rest.startsWith('/') ? rest : `/${rest}`;
    }
    api(req as never, res as never);
  };
}
