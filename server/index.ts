import path from 'node:path';
import { fileURLToPath } from 'node:url';
import express from 'express';
import { createAuditionApi } from './api.ts';

const DIST_DIR = fileURLToPath(new URL('../dist', import.meta.url));
const PORT = Number(process.env.PORT ?? 3000);

const app = express();

app.use('/api', createAuditionApi());
app.use(express.static(DIST_DIR));
app.get('*', (_req, res) => {
  res.sendFile(path.join(DIST_DIR, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Club GIT · site + API sur http://localhost:${PORT}`);
});
