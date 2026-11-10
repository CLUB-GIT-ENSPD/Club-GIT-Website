import React, { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  AlertCircle,
  ArrowLeft,
  CalendarClock,
  CheckCircle2,
  Github,
  Loader2,
  Mail,
  MessageCircle,
  Printer,
  SearchX,
  ShieldCheck,
} from 'lucide-react';
import { ResultsHeader } from '../components/ResultsHeader';
import { AUDITION_LEVEL_LABELS, AUDITION_TRACK_LABELS } from '../data/auditionData';
import type {
  AuditionSubmission,
  AuditionSubmissionAnswer,
  AuditionSubmissionSection,
} from '../types/audition';
import {
  formatSubmissionDate,
  getAuditionSubmission,
  readAdminCode,
  type SubmissionStorage,
} from '../utils/auditionStorage';

type DetailState =
  | { status: 'loading' }
  | { status: 'ready'; submission: AuditionSubmission; storage: SubmissionStorage }
  | { status: 'missing' }
  | { status: 'error' };

interface AnswerGroup {
  key: AuditionSubmissionSection;
  title: string;
  description: string;
  answers: AuditionSubmissionAnswer[];
}

const getInitials = (name: string): string =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');

export const ResultDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [state, setState] = useState<DetailState>({ status: 'loading' });
  const hasAdminSession = Boolean(readAdminCode());

  useEffect(() => {
    let active = true;

    if (!id) {
      setState({ status: 'missing' });
      return;
    }

    setState({ status: 'loading' });
    getAuditionSubmission(id)
      .then((result) => {
        if (!active) return;
        setState(
          result
            ? { status: 'ready', submission: result.submission, storage: result.storage }
            : { status: 'missing' }
        );
      })
      .catch(() => {
        if (active) setState({ status: 'error' });
      });

    return () => {
      active = false;
    };
  }, [id]);

  const groups = useMemo<AnswerGroup[]>(() => {
    if (state.status !== 'ready') return [];
    const { submission } = state;

    const config: Array<{
      key: AuditionSubmissionSection;
      title: string;
      description: string;
    }> = [
      {
        key: 'general',
        title: 'Informations générales',
        description: 'Profil et disponibilité du candidat',
      },
      {
        key: 'level',
        title: `Questionnaire ${AUDITION_LEVEL_LABELS[submission.level] ?? ''}`.trim(),
        description: `${AUDITION_TRACK_LABELS[submission.track] ?? submission.track} · questions techniques`,
      },
      {
        key: 'final',
        title: 'Dernière étape',
        description: 'Motivation et idée de projet',
      },
    ];

    return config
      .map((section) => ({
        ...section,
        answers: submission.answers.filter((answer) => answer.section === section.key),
      }))
      .filter((section) => section.answers.length > 0);
  }, [state]);

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900">
      <ResultsHeader
        backTo={hasAdminSession ? '/resultats' : '/'}
        backLabel={hasAdminSession ? 'Retour aux résultats' : "Retour à l'accueil"}
      />

      <main className="flex-1 py-10 sm:py-14">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {state.status === 'loading' && (
            <div className="flex items-center justify-center rounded-3xl border border-slate-200 bg-white p-14 shadow-sm">
              <div className="flex items-center gap-3 text-sm font-medium text-slate-600">
                <Loader2 className="h-5 w-5 animate-spin text-[#261c72]" />
                Chargement de la candidature…
              </div>
            </div>
          )}

          {state.status === 'missing' && (
            <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm sm:p-12">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-500">
                <SearchX className="h-7 w-7" />
              </div>
              <h1 className="mt-4 text-xl font-bold tracking-tight text-slate-900">
                Candidature introuvable
              </h1>
              <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-slate-600">
                Ce lien est invalide, ou la candidature a été enregistrée sur un autre appareil
                alors que le serveur JSON n'était pas disponible. Contacte le bureau du club si tu
                penses qu'il s'agit d'une erreur.
              </p>
              <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
                <Link
                  to="/"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:border-slate-400 hover:bg-slate-50"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Retour à l'accueil
                </Link>
                <Link
                  to="/rejoindre"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#261c72] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#1d1557]"
                >
                  Ouvrir le formulaire
                </Link>
              </div>
            </div>
          )}

          {state.status === 'error' && (
            <div
              role="alert"
              className="flex items-start gap-2.5 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
            >
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
              <div>
                <p className="font-bold">Impossible de charger la candidature.</p>
                <p className="mt-1 text-xs leading-relaxed">
                  Réessaie dans un instant. Si le problème persiste, vérifie que le serveur du site
                  est démarré.
                </p>
              </div>
            </div>
          )}

          {state.status === 'ready' && (
            <div className="space-y-6">
              {state.storage === 'local' && (
                <div className="rounded-2xl border border-amber-200 bg-amber-50 p-3.5 text-xs leading-relaxed text-amber-950 print:hidden">
                  <strong className="font-bold">Résultat local.</strong> Cette candidature est
                  enregistrée dans ce navigateur uniquement, car l'API JSON n'était pas disponible
                  lors de l'envoi.
                </div>
              )}

              <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex items-start gap-4">
                    <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-indigo-50 text-base font-bold text-[#261c72]">
                      {getInitials(state.submission.fullName) || '?'}
                    </span>
                    <div>
                      <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#ff7f00]">
                        Récapitulatif de candidature
                      </p>
                      <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                        {state.submission.fullName}
                      </h1>
                      <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500">
                        <span className="inline-flex items-center gap-1">
                          <CalendarClock className="h-3.5 w-3.5" />
                          Reçue le {formatSubmissionDate(state.submission.submittedAt)}
                        </span>
                        <span className="inline-flex items-center gap-1 text-emerald-700">
                          <CheckCircle2 className="h-3.5 w-3.5" />
                          Candidature enregistrée
                        </span>
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => window.print()}
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 transition-colors hover:border-slate-400 hover:bg-slate-50 print:hidden"
                  >
                    <Printer className="h-3.5 w-3.5" />
                    Imprimer
                  </button>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  <span className="inline-flex rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-bold text-[#261c72]">
                    {AUDITION_LEVEL_LABELS[state.submission.level] ?? `Niveau ${state.submission.level}`}
                  </span>
                  <span className="inline-flex rounded-full border border-orange-200 bg-orange-50 px-3 py-1 text-xs font-bold text-orange-700">
                    {AUDITION_TRACK_LABELS[state.submission.track] ?? state.submission.track}
                  </span>
                  {hasAdminSession && (
                    <span className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[11px] font-medium text-slate-500">
                      <ShieldCheck className="h-3 w-3" />
                      Vue administrateur
                    </span>
                  )}
                </div>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <a
                    href={`mailto:${state.submission.email}`}
                    className="group flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50/60 p-3.5 transition-colors hover:border-[#261c72]/30 hover:bg-indigo-50/40"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-[#261c72] shadow-xs">
                      <Mail className="h-4 w-4" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Email
                      </span>
                      <span className="block truncate text-sm font-medium text-slate-800 group-hover:text-[#261c72]">
                        {state.submission.email}
                      </span>
                    </span>
                  </a>

                  {state.submission.whatsapp ? (
                    <a
                      href={`https://wa.me/${state.submission.whatsapp.replace(/\D/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50/60 p-3.5 transition-colors hover:border-emerald-300 hover:bg-emerald-50/40"
                    >
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-emerald-600 shadow-xs">
                        <MessageCircle className="h-4 w-4" />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                          WhatsApp
                        </span>
                        <span className="block truncate text-sm font-medium text-slate-800 group-hover:text-emerald-700">
                          {state.submission.whatsapp}
                        </span>
                      </span>
                    </a>
                  ) : (
                    <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50/60 p-3.5">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-slate-400 shadow-xs">
                        <MessageCircle className="h-4 w-4" />
                      </span>
                      <span>
                        <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                          WhatsApp
                        </span>
                        <span className="text-sm font-medium text-slate-500">Non renseigné</span>
                      </span>
                    </div>
                  )}

                  {state.submission.githubUrl && (
                    <a
                      href={state.submission.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50/60 p-3.5 transition-colors hover:border-slate-400 hover:bg-slate-100/60 sm:col-span-2"
                    >
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-slate-700 shadow-xs">
                        <Github className="h-4 w-4" />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                          GitHub / Portfolio
                        </span>
                        <span className="block truncate text-sm font-medium text-slate-800 group-hover:text-[#261c72]">
                          {state.submission.githubUrl}
                        </span>
                      </span>
                    </a>
                  )}
                </div>

                <p className="mt-4 break-all font-mono text-[10px] text-slate-400">
                  Réf. {state.submission.id}
                </p>
              </section>

              {groups.map((group, groupIndex) => (
                <section
                  key={group.key}
                  className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7"
                >
                  <div className="flex items-baseline justify-between gap-3 border-b border-slate-100 pb-3">
                    <div>
                      <h2 className="text-base font-bold tracking-tight text-slate-900">
                        {group.title}
                      </h2>
                      <p className="mt-0.5 text-[11px] text-slate-500">{group.description}</p>
                    </div>
                    <span className="shrink-0 font-mono text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      {String(groupIndex + 1).padStart(2, '0')}
                    </span>
                  </div>

                  <ol className="mt-4 space-y-3">
                    {group.answers.map((answer, answerIndex) => (
                      <li
                        key={answer.questionId}
                        className="rounded-2xl border border-slate-200 bg-slate-50/50 p-4"
                      >
                        <div className="flex items-start gap-3">
                          <span className="mt-0.5 shrink-0 rounded-lg bg-white px-1.5 py-0.5 font-mono text-[10px] font-bold tabular-nums text-slate-400 shadow-xs">
                            {String(answerIndex + 1).padStart(2, '0')}
                          </span>
                          <div className="min-w-0 space-y-1.5">
                            <p className="text-sm font-semibold leading-relaxed text-slate-900">
                              {answer.question}
                            </p>
                            <p className="whitespace-pre-line break-words text-sm leading-relaxed text-[#261c72]">
                              {answer.displayValue || answer.value || '—'}
                            </p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ol>
                </section>
              ))}

              <div className="flex flex-col gap-3 pb-2 print:hidden sm:flex-row sm:justify-between">
                <Link
                  to={hasAdminSession ? '/resultats' : '/'}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:border-slate-400 hover:bg-slate-50"
                >
                  <ArrowLeft className="h-4 w-4" />
                  {hasAdminSession ? 'Retour aux résultats' : "Retour à l'accueil"}
                </Link>
                <Link
                  to="/rejoindre"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#261c72] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#1d1557]"
                >
                  Remplir une nouvelle candidature
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>

      <footer className="border-t border-slate-200 bg-white py-6 text-center text-xs text-slate-500 print:hidden">
        <p>
          &copy; 2026 Club GIT · École Nationale Supérieure Polytechnique de Douala. Récapitulatif
          personnel de candidature.
        </p>
      </footer>
    </div>
  );
};
