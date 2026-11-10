import express, {
  type Express,
  type NextFunction,
  type Request,
  type Response,
} from 'express';
import type {
  AuditionLevel,
  AuditionSubmissionAnswer,
  AuditionSubmissionInput,
  AuditionTrack,
} from '../src/types/audition.ts';
import { addSubmission, findSubmission, listSubmissions } from './submissionsStore.ts';

const ADMIN_CODE = process.env.ADMIN_CODE || 'club-git-admin';

function cleanString(value: unknown, maxLength: number): string {
  return typeof value === 'string' ? value.trim().slice(0, maxLength) : '';
}

function parseAnswer(value: unknown): AuditionSubmissionAnswer | null {
  if (!value || typeof value !== 'object') return null;
  const record = value as Record<string, unknown>;

  const section = record.section;
  if (section !== 'general' && section !== 'level' && section !== 'final') {
    return null;
  }

  const questionId = cleanString(record.questionId, 120);
  const tallyId = cleanString(record.tallyId, 80);
  const question = cleanString(record.question, 500);
  const rawValue = cleanString(record.value, 500);
  const displayValue = cleanString(record.displayValue, 500);

  if (!questionId || !tallyId || !question || !rawValue) return null;

  return {
    questionId,
    tallyId,
    section,
    question,
    value: rawValue,
    displayValue: displayValue || rawValue,
  };
}

function parseSubmissionInput(body: unknown): AuditionSubmissionInput | null {
  if (!body || typeof body !== 'object') return null;
  const record = body as Record<string, unknown>;

  const fullName = cleanString(record.fullName, 120);
  const email = cleanString(record.email, 180);
  const whatsapp = cleanString(record.whatsapp, 40);
  const githubUrl = cleanString(record.githubUrl, 500);
  const level = Number(record.level);
  const track = record.track;

  if (!fullName || !email) return null;
  if (![1, 2, 3, 4].includes(level)) return null;
  if (track !== 'informatique' && track !== 'telecoms') return null;

  const rawAnswers = Array.isArray(record.answers) ? record.answers.slice(0, 40) : [];
  const answers: AuditionSubmissionAnswer[] = [];
  const seen = new Set<string>();

  for (const rawAnswer of rawAnswers) {
    const answer = parseAnswer(rawAnswer);
    if (!answer || seen.has(answer.questionId)) continue;
    seen.add(answer.questionId);
    answers.push(answer);
  }

  if (answers.length === 0) return null;

  return {
    fullName,
    email,
    whatsapp,
    githubUrl,
    level: level as AuditionLevel,
    track: track as AuditionTrack,
    tallySubmitted: record.tallySubmitted === true,
    answers,
  };
}

function requireAdmin(req: Request, res: Response, next: NextFunction): void {
  const provided = req.get('x-admin-code') ?? '';
  if (provided !== ADMIN_CODE) {
    res.status(401).json({ ok: false, error: 'UNAUTHORIZED' });
    return;
  }
  next();
}

export function createAuditionApi(): Express {
  // Une application Express (et non un simple Router) est nécessaire pour que
  // les prototypes req/res soient enrichis lorsqu'elle est montée dans Vite.
  const app = express();

  app.use((_req, res, next) => {
    res.set('Cache-Control', 'no-store');
    next();
  });

  app.use(express.json({ limit: '128kb' }));

  app.post('/audition-submissions', async (req, res) => {
    const input = parseSubmissionInput(req.body);
    if (!input) {
      res.status(400).json({ ok: false, error: 'INVALID_SUBMISSION' });
      return;
    }

    try {
      const submission = await addSubmission(input);
      res.status(201).json({ ok: true, submission });
    } catch (error) {
      console.error('[audition-api] Impossible d’enregistrer la candidature :', error);
      res.status(500).json({ ok: false, error: 'STORAGE_ERROR' });
    }
  });

  app.get('/audition-submissions/admin/check', requireAdmin, (_req, res) => {
    res.json({ ok: true });
  });

  app.get('/audition-submissions', requireAdmin, async (_req, res) => {
    try {
      const submissions = await listSubmissions();
      res.json({ ok: true, submissions });
    } catch (error) {
      console.error('[audition-api] Impossible de lire les candidatures :', error);
      res.status(500).json({ ok: false, error: 'STORAGE_ERROR' });
    }
  });

  app.get('/audition-submissions/:id', async (req, res) => {
    try {
      const submission = await findSubmission(req.params.id);
      if (!submission) {
        res.status(404).json({ ok: false, error: 'NOT_FOUND' });
        return;
      }
      res.json({ ok: true, submission });
    } catch (error) {
      console.error('[audition-api] Impossible de lire la candidature :', error);
      res.status(500).json({ ok: false, error: 'STORAGE_ERROR' });
    }
  });

  app.use((_req, res) => {
    res.status(404).json({ ok: false, error: 'NOT_FOUND' });
  });

  return app;
}
