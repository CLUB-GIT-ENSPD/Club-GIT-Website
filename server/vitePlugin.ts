import type { Connect, Plugin } from 'vite';
import { createAuditionApi } from './api.ts';

function mountApi(middlewares: Connect.Server): void {
  // Express et Connect partagent le même contrat runtime ; seuls les types
  // de Request/Response diffèrent.
  middlewares.use('/api', createAuditionApi() as unknown as Connect.NextHandleFunction);
}

/** Monte l'API des candidatures dans le serveur de développement et de preview Vite. */
export function auditionApiPlugin(): Plugin {
  return {
    name: 'club-git-audition-api',
    configureServer(server) {
      mountApi(server.middlewares);
    },
    configurePreviewServer(server) {
      mountApi(server.middlewares);
    },
  };
}
