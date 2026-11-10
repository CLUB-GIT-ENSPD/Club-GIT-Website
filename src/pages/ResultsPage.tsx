import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  AlertCircle,
  CalendarClock,
  Download,
  Eye,
  FileJson,
  GraduationCap,
  Loader2,
  LockKeyhole,
  LogOut,
  Network,
  RefreshCw,
  Search,
  ShieldCheck,
  Users,
  WifiOff,
} from 'lucide-react';
import { ResultsHeader } from '../components/ResultsHeader';
import { AUDITION_LEVEL_LABELS, AUDITION_TRACK_LABELS } from '../data/auditionData';
import type { AuditionSubmission } from '../types/audition';
import {
  clearAdminCode,
  downloadSubmissionsJson,
  fetchAuditionSubmissions,
  formatSubmissionDate,
  readAdminCode,
  storeAdminCode,
  type SubmissionStorage,
} from '../utils/auditionStorage';

type ViewMode = 'loading' | 'gate' | 'results';

const getInitials = (name: string): string =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');

export const ResultsPage: React.FC = () => {
  const [mode, setMode] = useState<ViewMode>('loading');
  const [storage, setStorage] = useState<SubmissionStorage | null>(null);
  const [submissions, setSubmissions] = useState<AuditionSubmission[]>([]);
  const [adminCode, setAdminCode] = useState(() => readAdminCode());
  const [codeInput, setCodeInput] = useState('');
  const [gateError, setGateError] = useState<string | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');

  const loadSubmissions = useCallback(async (code: string) => {
    setLoading(true);
    setLoadError(null);

    const result = await fetchAuditionSubmissions(code);

    if (!result.ok) {
      setMode('gate');
      setSubmissions([]);
      setStorage(null);
      setGateError(code ? 'Code administrateur incorrect.' : null);
      setLoading(false);
      return;
    }

    setSubmissions(result.submissions);
    setStorage(result.storage);
    setMode('results');
    if (result.storage === 'server') {
      setAdminCode(code);
      storeAdminCode(code);
    }
    setGateError(null);
    setLoading(false);
  }, []);

  useEffect(() => {
    void loadSubmissions(readAdminCode());
  }, [loadSubmissions]);

  const handleUnlock = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const code = codeInput.trim();
    if (!code) {
      setGateError('Saisis le code administrateur.');
      return;
    }
    void loadSubmissions(code);
  };

  const handleRefresh = () => {
    void loadSubmissions(storage === 'server' ? adminCode || readAdminCode() : '');
  };

  const handleLock = () => {
    clearAdminCode();
    setAdminCode('');
    setCodeInput('');
    setSubmissions([]);
    setStorage(null);
    setMode('gate');
    setGateError(null);
  };

  const filteredSubmissions = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return submissions;

    return submissions.filter((submission) =>
      [
        submission.fullName,
        submission.email,
        submission.whatsapp,
        AUDITION_LEVEL_LABELS[submission.level] ?? '',
        AUDITION_TRACK_LABELS[submission.track] ?? '',
      ].some((value) => value.toLowerCase().includes(query))
    );
  }, [search, submissions]);

  const stats = useMemo(
    () => ({
      total: submissions.length,
      informatique: submissions.filter((item) => item.track === 'informatique').length,
      telecoms: submissions.filter((item) => item.track === 'telecoms').length,
      latest: submissions[0]?.submittedAt ?? null,
    }),
    [submissions]
  );

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900">
      <ResultsHeader backLabel="Retour au site" />

      <main className="flex-1 py-10 sm:py-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#ff7f00]">
              Espace du bureau
            </p>
            <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Résultats des auditions
            </h1>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              Consulte les candidatures reçues, le profil des candidats et le détail de leurs
              réponses.
            </p>
          </div>

          {mode === 'loading' && (
            <div className="mt-10 flex items-center justify-center rounded-3xl border border-slate-200 bg-white p-14 shadow-sm">
              <div className="flex items-center gap-3 text-sm font-medium text-slate-600">
                <Loader2 className="h-5 w-5 animate-spin text-[#261c72]" />
                Chargement des candidatures…
              </div>
            </div>
          )}

          {mode === 'gate' && (
            <div className="mt-10 max-w-lg rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-[#261c72]">
                <LockKeyhole className="h-6 w-6" />
              </div>
              <h2 className="mt-4 text-lg font-bold tracking-tight text-slate-900">
                Accès protégé
              </h2>
              <p className="mt-1 text-sm leading-relaxed text-slate-600">
                Saisis le code administrateur du bureau pour afficher toutes les candidatures.
              </p>

              <form onSubmit={handleUnlock} className="mt-5 space-y-3">
                <label
                  htmlFor="admin-code"
                  className="block text-xs font-semibold uppercase tracking-wide text-slate-500"
                >
                  Code administrateur
                </label>
                <input
                  id="admin-code"
                  type="password"
                  value={codeInput}
                  onChange={(event) => {
                    setCodeInput(event.target.value);
                    setGateError(null);
                  }}
                  autoComplete="current-password"
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 shadow-xs outline-none transition placeholder:text-slate-400 focus:border-[#261c72] focus:ring-2 focus:ring-indigo-100"
                />

                {gateError && (
                  <p role="alert" className="flex items-start gap-1.5 text-xs font-medium text-red-600">
                    <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                    <span>{gateError}</span>
                  </p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#261c72] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#1d1557] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <ShieldCheck className="h-4 w-4" />
                  )}
                  Accéder aux résultats
                </button>
              </form>

              {import.meta.env.DEV && (
                <p className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-3 text-[11px] leading-relaxed text-slate-500">
                  En développement, le code par défaut est{' '}
                  <code className="rounded bg-white px-1 py-0.5 font-mono text-slate-700">
                    club-git-admin
                  </code>
                  . Il se personnalise avec la variable d'environnement{' '}
                  <code className="rounded bg-white px-1 py-0.5 font-mono text-slate-700">
                    ADMIN_CODE
                  </code>
                  .
                </p>
              )}

              <p className="mt-4 flex items-start gap-1.5 text-[11px] leading-relaxed text-slate-500">
                <WifiOff className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                <span>
                  Si l'API n'est pas disponible (site statique), les candidatures enregistrées dans
                  ce navigateur s'affichent automatiquement, sans code.
                </span>
              </p>
            </div>
          )}

          {mode === 'results' && (
            <div className="mt-8 space-y-6">
              {storage === 'local' && (
                <div className="flex items-start gap-2.5 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-xs text-amber-950">
                  <WifiOff className="mt-0.5 h-4 w-4 shrink-0" />
                  <div className="space-y-1">
                    <p className="font-bold">Mode local : l'API JSON n'est pas disponible.</p>
                    <p className="leading-relaxed text-amber-900">
                      Les candidatures affichées ont été envoyées depuis ce navigateur. Pour
                      activer le fichier JSON partagé, lance le site avec{' '}
                      <code className="rounded bg-white/70 px-1 py-0.5 font-mono">npm run dev</code>{' '}
                      (ou <code className="rounded bg-white/70 px-1 py-0.5 font-mono">npm start</code>{' '}
                      après le build).
                    </p>
                  </div>
                </div>
              )}

              {loadError && (
                <div
                  role="alert"
                  className="flex items-start gap-2.5 rounded-2xl border border-red-200 bg-red-50 p-4 text-xs text-red-700"
                >
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                  <span>{loadError}</span>
                </div>
              )}

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                <StatCard icon={<Users className="h-4 w-4" />} label="Candidatures" value={String(stats.total)} />
                <StatCard
                  icon={<GraduationCap className="h-4 w-4" />}
                  label="Informatique"
                  value={String(stats.informatique)}
                />
                <StatCard icon={<Network className="h-4 w-4" />} label="Télécoms" value={String(stats.telecoms)} />
                <StatCard
                  icon={<CalendarClock className="h-4 w-4" />}
                  label="Dernière réception"
                  value={stats.latest ? formatSubmissionDate(stats.latest) : '—'}
                  small
                />
              </div>

              <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-xs sm:flex-row sm:items-center sm:justify-between">
                <div className="relative w-full sm:max-w-sm">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    type="search"
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Rechercher un nom, un email, un niveau…"
                    aria-label="Rechercher une candidature"
                    className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-3 text-sm text-slate-900 shadow-xs outline-none transition placeholder:text-slate-400 focus:border-[#261c72] focus:ring-2 focus:ring-indigo-100"
                  />
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-[11px] font-medium text-slate-600">
                    <FileJson className="h-3.5 w-3.5" />
                    {storage === 'server' ? 'Fichier JSON du serveur' : 'Stockage local du navigateur'}
                  </span>
                  <button
                    type="button"
                    onClick={handleRefresh}
                    disabled={loading}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition-colors hover:border-slate-400 hover:bg-slate-50 disabled:opacity-60"
                  >
                    <RefreshCw className={`h-3.5 w-3.5 ${loading ? 'animate-spin' : ''}`} />
                    Actualiser
                  </button>
                  <button
                    type="button"
                    onClick={() => downloadSubmissionsJson(submissions)}
                    disabled={submissions.length === 0}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition-colors hover:border-slate-400 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <Download className="h-3.5 w-3.5" />
                    Exporter JSON
                  </button>
                  {storage === 'server' && (
                    <button
                      type="button"
                      onClick={handleLock}
                      className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition-colors hover:border-slate-400 hover:bg-slate-50"
                    >
                      <LogOut className="h-3.5 w-3.5" />
                      Verrouiller
                    </button>
                  )}
                </div>
              </div>

              {submissions.length === 0 ? (
                <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center shadow-xs">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-500">
                    <Users className="h-6 w-6" />
                  </div>
                  <h2 className="mt-4 text-base font-bold text-slate-900">
                    Aucune candidature pour le moment
                  </h2>
                  <p className="mx-auto mt-1 max-w-md text-sm leading-relaxed text-slate-600">
                    Les candidatures apparaîtront ici dès qu'un candidat aura envoyé le formulaire
                    d'audition.
                  </p>
                  <Link
                    to="/rejoindre"
                    className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#261c72] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#1d1557]"
                  >
                    Ouvrir le formulaire d'audition
                  </Link>
                </div>
              ) : filteredSubmissions.length === 0 ? (
                <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-xs">
                  <Search className="mx-auto h-6 w-6 text-slate-400" />
                  <p className="mt-3 text-sm font-semibold text-slate-900">
                    Aucune candidature ne correspond à « {search.trim()} ».
                  </p>
                  <button
                    type="button"
                    onClick={() => setSearch('')}
                    className="mt-3 text-xs font-semibold text-[#261c72] underline-offset-2 hover:underline"
                  >
                    Effacer la recherche
                  </button>
                </div>
              ) : (
                <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs">
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
                      <thead className="bg-slate-50 text-[10px] uppercase tracking-wider text-slate-500">
                        <tr>
                          <th scope="col" className="px-4 py-3 font-bold sm:px-5">
                            Candidat
                          </th>
                          <th scope="col" className="hidden px-4 py-3 font-bold md:table-cell">
                            Contact
                          </th>
                          <th scope="col" className="px-4 py-3 font-bold">
                            Profil
                          </th>
                          <th scope="col" className="hidden px-4 py-3 font-bold lg:table-cell">
                            Reçu le
                          </th>
                          <th scope="col" className="px-4 py-3 text-right font-bold sm:px-5">
                            Détail
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {filteredSubmissions.map((submission) => (
                          <tr key={submission.id} className="transition-colors hover:bg-slate-50/70">
                            <td className="px-4 py-3.5 sm:px-5">
                              <div className="flex items-center gap-3">
                                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-[11px] font-bold text-[#261c72]">
                                  {getInitials(submission.fullName) || '?'}
                                </span>
                                <div className="min-w-0">
                                  <p className="truncate font-semibold text-slate-900">
                                    {submission.fullName}
                                  </p>
                                  <p className="truncate text-[11px] text-slate-500 md:hidden">
                                    {submission.email}
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td className="hidden px-4 py-3.5 md:table-cell">
                              <p className="max-w-[220px] truncate text-xs text-slate-700">
                                {submission.email}
                              </p>
                              <p className="text-[11px] text-slate-500">{submission.whatsapp || '—'}</p>
                            </td>
                            <td className="px-4 py-3.5">
                              <div className="flex flex-wrap gap-1.5">
                                <span className="inline-flex rounded-full border border-indigo-200 bg-indigo-50 px-2 py-0.5 text-[10px] font-bold text-[#261c72]">
                                  {AUDITION_LEVEL_LABELS[submission.level] ?? `Niveau ${submission.level}`}
                                </span>
                                <span className="inline-flex rounded-full border border-orange-200 bg-orange-50 px-2 py-0.5 text-[10px] font-bold text-orange-700">
                                  {AUDITION_TRACK_LABELS[submission.track] ?? submission.track}
                                </span>
                              </div>
                            </td>
                            <td className="hidden px-4 py-3.5 text-xs text-slate-600 lg:table-cell">
                              {formatSubmissionDate(submission.submittedAt)}
                            </td>
                            <td className="px-4 py-3.5 text-right sm:px-5">
                              <Link
                                to={`/resultats/${submission.id}`}
                                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-xs font-semibold text-slate-700 transition-colors hover:border-[#261c72] hover:text-[#261c72]"
                                aria-label={`Voir la candidature de ${submission.fullName}`}
                              >
                                <Eye className="h-3.5 w-3.5" />
                                <span className="hidden sm:inline">Voir</span>
                              </Link>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 bg-slate-50/60 px-4 py-3 text-[11px] text-slate-500 sm:px-5">
                    <span>
                      {filteredSubmissions.length} candidature
                      {filteredSubmissions.length > 1 ? 's' : ''} affichée
                      {filteredSubmissions.length > 1 ? 's' : ''}
                      {search.trim() ? ` sur ${submissions.length}` : ''}
                    </span>
                    <span className="font-mono text-[10px] text-slate-400">
                      Source : {storage === 'server' ? 'data/audition-submissions.json' : 'localStorage'}
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      <footer className="border-t border-slate-200 bg-white py-6 text-center text-xs text-slate-500">
        <p>
          &copy; 2026 Club GIT · École Nationale Supérieure Polytechnique de Douala. Données
          réservées au bureau du club.
        </p>
      </footer>
    </div>
  );
};

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  small?: boolean;
}

const StatCard: React.FC<StatCardProps> = ({ icon, label, value, small }) => (
  <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs">
    <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-slate-500">
      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-100 text-[#261c72]">
        {icon}
      </span>
      {label}
    </div>
    <p
      className={`mt-2 font-bold tracking-tight text-slate-900 ${
        small ? 'text-sm leading-snug' : 'text-2xl'
      }`}
    >
      {value}
    </p>
  </div>
);
