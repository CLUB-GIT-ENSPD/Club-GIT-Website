import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  AlertCircle,
  BarChart3,
  CalendarClock,
  Download,
  Eye,
  FileJson,
  FileSpreadsheet,
  GraduationCap,
  Loader2,
  LockKeyhole,
  LogOut,
  Network,
  RefreshCw,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  Table2,
  Users,
} from 'lucide-react';
import { ResultsHeader } from '../components/ResultsHeader';
import { AuditionAnalytics } from '../components/AuditionAnalytics';
import { AUDITION_LEVEL_LABELS, AUDITION_TRACK_LABELS } from '../data/auditionData';
import type { AuditionLevel, AuditionSubmission, AuditionTrack } from '../types/audition';
import {
  clearAdminCode,
  downloadSubmissionsJson,
  fetchAuditionSubmissions,
  formatSubmissionDate,
  readAdminCode,
  storeAdminCode,
} from '../utils/auditionStorage';
import { downloadSubmissionsCsv } from '../utils/auditionAnalytics';

type ViewMode = 'loading' | 'gate' | 'results';
type ResultView = 'list' | 'analyse';
type LevelFilter = 'all' | AuditionLevel;
type TrackFilter = 'all' | AuditionTrack;

const getInitials = (name: string): string =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');

export const ResultsPage: React.FC = () => {
  const [mode, setMode] = useState<ViewMode>('gate');
  const [submissions, setSubmissions] = useState<AuditionSubmission[]>([]);
  const [adminCode, setAdminCode] = useState('');
  const [codeInput, setCodeInput] = useState('');
  const [gateError, setGateError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [view, setView] = useState<ResultView>('list');
  const [levelFilter, setLevelFilter] = useState<LevelFilter>('all');
  const [trackFilter, setTrackFilter] = useState<TrackFilter>('all');

  const loadSubmissions = useCallback(async (code: string) => {
    setLoading(true);
    setGateError(null);

    const result = await fetchAuditionSubmissions(code);

    if (!result.ok) {
      setMode('gate');
      setSubmissions([]);
      setLoading(false);
      setGateError(
        result.reason === 'unauthorized'
          ? code
            ? 'Code administrateur refusé. Vérifie le code saisi (et la variable ADMIN_CODE du serveur).'
            : 'Saisis le code administrateur.'
          : result.reason === 'network'
            ? "Serveur injoignable : vérifie que le site tourne avec son API (npm run dev) et que la base Postgres répond."
            : `Le serveur n'a pas pu lire les candidatures${result.status ? ` (HTTP ${result.status}${result.code ? ` · ${result.code}` : ''})` : ''}. Vérifie que Postgres est démarré puis réessaie.`
      );
      return;
    }

    setSubmissions(result.submissions);
    setAdminCode(code);
    storeAdminCode(code);
    setMode('results');
    setLoading(false);
  }, []);

  // Aucune persistance navigateur : le code n'est conservé qu'en mémoire pour
  // la session courante, donc un rechargement de page redemande le code.
  useEffect(() => {
    const remembered = readAdminCode();
    if (remembered) void loadSubmissions(remembered);
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
    void loadSubmissions(adminCode);
  };

  const handleLock = () => {
    clearAdminCode();
    setAdminCode('');
    setCodeInput('');
    setSubmissions([]);
    setMode('gate');
    setGateError(null);
  };

  const scopedSubmissions = useMemo(
    () =>
      submissions.filter(
        (submission) =>
          (levelFilter === 'all' || submission.level === Number(levelFilter)) &&
          (trackFilter === 'all' || submission.track === trackFilter)
      ),
    [submissions, levelFilter, trackFilter]
  );

  const filteredSubmissions = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return scopedSubmissions;

    return scopedSubmissions.filter((submission) =>
      [
        submission.fullName,
        submission.email,
        submission.whatsapp,
        AUDITION_LEVEL_LABELS[submission.level] ?? '',
        AUDITION_TRACK_LABELS[submission.track] ?? '',
      ].some((value) => value.toLowerCase().includes(query))
    );
  }, [search, scopedSubmissions]);

  const stats = useMemo(
    () => ({
      total: scopedSubmissions.length,
      informatique: scopedSubmissions.filter((item) => item.track === 'informatique').length,
      telecoms: scopedSubmissions.filter((item) => item.track === 'telecoms').length,
      latest: scopedSubmissions[0]?.submittedAt ?? null,
    }),
    [scopedSubmissions]
  );

  const hasActiveFilters = levelFilter !== 'all' || trackFilter !== 'all';

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
                <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                <span>
                  Les candidatures sont lues sur le serveur partagé (base Postgres). Le code n'est
                  pas mémorisé par le navigateur : il est redemandé après chaque rechargement.
                </span>
              </p>
            </div>
          )}

          {mode === 'results' && (
            <div className="mt-8 space-y-6">
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

              <div className="flex flex-wrap items-center gap-2 rounded-2xl border border-slate-200 bg-white p-3 shadow-xs">
                <span className="inline-flex items-center gap-1.5 pl-1 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  <SlidersHorizontal className="h-3.5 w-3.5" />
                  Filtres
                </span>

                <select
                  value={levelFilter}
                  onChange={(event) => setLevelFilter(event.target.value as LevelFilter)}
                  aria-label="Filtrer par niveau"
                  className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 shadow-xs outline-none transition focus:border-[#261c72] focus:ring-2 focus:ring-indigo-100"
                >
                  <option value="all">Tous les niveaux</option>
                  <option value="1">Niveau 1</option>
                  <option value="2">Niveau 2</option>
                  <option value="3">Niveau 3</option>
                  <option value="4">Niveau 4</option>
                </select>

                <select
                  value={trackFilter}
                  onChange={(event) => setTrackFilter(event.target.value as TrackFilter)}
                  aria-label="Filtrer par filière"
                  className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 shadow-xs outline-none transition focus:border-[#261c72] focus:ring-2 focus:ring-indigo-100"
                >
                  <option value="all">Toutes les filières</option>
                  <option value="informatique">Informatique</option>
                  <option value="telecoms">Télécoms</option>
                </select>

                {hasActiveFilters && (
                  <button
                    type="button"
                    onClick={() => {
                      setLevelFilter('all');
                      setTrackFilter('all');
                    }}
                    className="text-xs font-semibold text-[#261c72] underline-offset-2 hover:underline"
                  >
                    Réinitialiser
                  </button>
                )}

                <span className="ml-auto font-mono text-[10px] text-slate-400">
                  {scopedSubmissions.length}/{submissions.length} candidature
                  {submissions.length > 1 ? 's' : ''}
                </span>
              </div>

              <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-xs sm:flex-row sm:items-center sm:justify-between">
                {view === 'list' ? (
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
                ) : (
                  <p className="text-xs leading-relaxed text-slate-500">
                    Vue d'ensemble calculée en direct à partir des candidatures chargées.
                  </p>
                )}

                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-[11px] font-medium text-slate-600">
                    <FileJson className="h-3.5 w-3.5" />
                    Serveur partagé
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
                  <button
                    type="button"
                    onClick={() => downloadSubmissionsCsv(scopedSubmissions)}
                    disabled={scopedSubmissions.length === 0}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition-colors hover:border-slate-400 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <FileSpreadsheet className="h-3.5 w-3.5" />
                    Exporter CSV
                  </button>
                  <button
                    type="button"
                    onClick={handleLock}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition-colors hover:border-slate-400 hover:bg-slate-50"
                  >
                    <LogOut className="h-3.5 w-3.5" />
                    Verrouiller
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-1.5 border-b border-slate-200">
                <button
                  type="button"
                  onClick={() => setView('list')}
                  aria-pressed={view === 'list'}
                  className={`inline-flex items-center gap-1.5 border-b-2 px-3 py-2.5 text-xs font-semibold transition-colors ${
                    view === 'list'
                      ? 'border-[#261c72] text-[#261c72]'
                      : 'border-transparent text-slate-500 hover:text-slate-700'
                  }`}
                >
                  <Table2 className="h-3.5 w-3.5" />
                  Candidatures
                  <span className="rounded-full bg-slate-100 px-1.5 py-0.5 font-mono text-[10px] text-slate-600">
                    {scopedSubmissions.length}
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => setView('analyse')}
                  aria-pressed={view === 'analyse'}
                  className={`inline-flex items-center gap-1.5 border-b-2 px-3 py-2.5 text-xs font-semibold transition-colors ${
                    view === 'analyse'
                      ? 'border-[#261c72] text-[#261c72]'
                      : 'border-transparent text-slate-500 hover:text-slate-700'
                  }`}
                >
                  <BarChart3 className="h-3.5 w-3.5" />
                  Analyse en ligne
                </button>
              </div>

              {view === 'analyse' ? (
                <AuditionAnalytics submissions={scopedSubmissions} />
              ) : submissions.length === 0 ? (
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
                      Source : serveur partagé (Postgres)
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
