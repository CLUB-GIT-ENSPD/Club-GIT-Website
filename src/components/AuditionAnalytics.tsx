import React, { useMemo } from 'react';
import {
  BarChart3,
  CheckCircle2,
  ClipboardList,
  MessageSquareText,
  TrendingUp,
  Users,
} from 'lucide-react';
import type { AuditionSubmission } from '../types/audition';
import { formatSubmissionDate } from '../utils/auditionStorage';
import {
  computeAuditionAnalytics,
  type DistributionBucket,
  type QuestionAnalysis,
} from '../utils/auditionAnalytics';

interface AuditionAnalyticsProps {
  submissions: AuditionSubmission[];
}

const pct = (ratio: number): string => `${Math.round(ratio * 100)}%`;

const SectionTag: React.FC<{ section: QuestionAnalysis['entry']['section'] }> = ({
  section,
}) => {
  const labels = {
    general: 'Profil',
    level: 'Questionnaire',
    final: 'Motivation',
  } as const;

  const classes = {
    general: 'border-indigo-200 bg-indigo-50 text-[#261c72]',
    level: 'border-slate-200 bg-slate-50 text-slate-600',
    final: 'border-orange-200 bg-orange-50 text-orange-700',
  } as const;

  return (
    <span
      className={`inline-flex rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${classes[section]}`}
    >
      {labels[section]}
    </span>
  );
};

const DistributionBar: React.FC<{
  bucket: DistributionBucket;
  tone?: 'blue' | 'orange';
  valueLabel?: string;
}> = ({ bucket, tone = 'blue', valueLabel }) => (
  <div>
    <div className="flex items-baseline justify-between gap-3 text-xs">
      <span className="font-medium text-slate-700">{bucket.label}</span>
      <span className="shrink-0 font-mono text-[11px] text-slate-500">
        {valueLabel ?? `${bucket.count} · ${pct(bucket.ratio)}`}
      </span>
    </div>
    <div className="mt-1 h-2 overflow-hidden rounded-full bg-slate-100">
      <div
        className={`h-full rounded-full transition-all ${tone === 'orange' ? 'bg-[#ff7f00]' : 'bg-[#261c72]'}`}
        style={{ width: `${Math.min(100, bucket.ratio * 100)}%` }}
      />
    </div>
  </div>
);

const QuestionCard: React.FC<{ analysis: QuestionAnalysis }> = ({ analysis }) => {
  const buckets = analysis.buckets ?? [];
  const maxCount = buckets.reduce((max, bucket) => Math.max(max, bucket.count), 0);

  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs">
      <div className="flex items-start justify-between gap-3">
        <SectionTag section={analysis.entry.section} />
        <span className="shrink-0 font-mono text-[10px] text-slate-400">
          {analysis.answered}/{analysis.eligible} rép.
        </span>
      </div>

      <h3 className="mt-2 text-sm font-semibold leading-relaxed text-slate-900">
        {analysis.entry.question.label}
      </h3>

      {analysis.answered === 0 ? (
        <p className="mt-3 text-xs text-slate-500">Aucune réponse enregistrée.</p>
      ) : (
        <div className="mt-3 space-y-2">
          {buckets.map((bucket) => (
            <div key={bucket.key}>
              <div className="flex items-baseline justify-between gap-3 text-[11px]">
                <span
                  className={
                    bucket.count === maxCount && maxCount > 0
                      ? 'font-semibold text-slate-900'
                      : 'text-slate-600'
                  }
                >
                  {bucket.label}
                </span>
                <span className="shrink-0 font-mono text-[10px] text-slate-500">
                  {bucket.count} · {pct(bucket.ratio)}
                </span>
              </div>
              <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-slate-100">
                <div
                  className={`h-full rounded-full ${
                    bucket.count === maxCount && maxCount > 0 ? 'bg-[#ff7f00]' : 'bg-[#261c72]/70'
                  }`}
                  style={{ width: `${Math.min(100, bucket.ratio * 100)}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </article>
  );
};

export const AuditionAnalytics: React.FC<AuditionAnalyticsProps> = ({ submissions }) => {
  const analytics = useMemo(() => computeAuditionAnalytics(submissions), [submissions]);

  if (analytics.total === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center shadow-xs">
        <BarChart3 className="mx-auto h-6 w-6 text-slate-400" />
        <p className="mt-3 text-sm font-semibold text-slate-900">
          Aucune candidature à analyser
        </p>
        <p className="mx-auto mt-1 max-w-md text-xs leading-relaxed text-slate-600">
          Ajuste les filtres de niveau ou de filière, ou attends de nouvelles candidatures pour
          afficher les statistiques.
        </p>
      </div>
    );
  }

  const topLevel = [...analytics.levelDistribution].sort((a, b) => b.count - a.count)[0];
  const maxDaily = analytics.dailyTrend.reduce((max, day) => Math.max(max, day.count), 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold tracking-tight text-slate-900">
            Analyse des candidatures
          </h2>
          <p className="mt-0.5 text-xs text-slate-600">
            Calculs effectués en direct sur les {analytics.total} candidature
            {analytics.total > 1 ? 's' : ''} affichée{analytics.total > 1 ? 's' : ''}.
          </p>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-[11px] font-semibold text-emerald-800">
          <CheckCircle2 className="h-3.5 w-3.5" />
          À jour
        </span>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs">
          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-slate-500">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-100 text-[#261c72]">
              <ClipboardList className="h-4 w-4" />
            </span>
            Complétion moyenne
          </div>
          <p className="mt-2 text-2xl font-bold tracking-tight text-slate-900">
            {pct(analytics.averageCompletion)}
          </p>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-[#261c72]"
              style={{ width: `${Math.min(100, analytics.averageCompletion * 100)}%` }}
            />
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs">
          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-slate-500">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-100 text-[#261c72]">
              <Users className="h-4 w-4" />
            </span>
            Niveau le plus représenté
          </div>
          <p className="mt-2 text-2xl font-bold tracking-tight text-slate-900">
            {topLevel?.label ?? '—'}
          </p>
          <p className="mt-0.5 text-xs text-slate-500">
            {topLevel ? `${topLevel.count} candidature${topLevel.count > 1 ? 's' : ''}` : '—'}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs">
          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-slate-500">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-100 text-[#261c72]">
              <TrendingUp className="h-4 w-4" />
            </span>
            Dernière candidature
          </div>
          <p className="mt-2 text-sm font-bold leading-snug tracking-tight text-slate-900">
            {analytics.latestSubmittedAt
              ? formatSubmissionDate(analytics.latestSubmittedAt)
              : '—'}
          </p>
        </div>
      </div>

      <div className="grid gap-3 lg:grid-cols-2">
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
          <h3 className="flex items-center gap-2 text-sm font-bold text-slate-900">
            <BarChart3 className="h-4 w-4 text-[#261c72]" />
            Répartition par niveau
          </h3>
          <div className="mt-4 space-y-3">
            {analytics.levelDistribution.map((bucket) => (
              <DistributionBar key={bucket.key} bucket={bucket} />
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
          <h3 className="flex items-center gap-2 text-sm font-bold text-slate-900">
            <BarChart3 className="h-4 w-4 text-[#ff7f00]" />
            Répartition par filière
          </h3>
          <div className="mt-4 space-y-3">
            {analytics.trackDistribution.map((bucket) => (
              <DistributionBar key={bucket.key} bucket={bucket} tone="orange" />
            ))}
          </div>

          <h3 className="mt-6 text-sm font-bold text-slate-900">Complétion par étape</h3>
          <div className="mt-3 space-y-3">
            {analytics.sectionCompletion.map((bucket) => (
              <DistributionBar
                key={bucket.key}
                bucket={{ ...bucket, count: Math.round(bucket.ratio * 100) }}
                valueLabel={pct(bucket.ratio)}
              />
            ))}
          </div>
        </section>
      </div>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h3 className="flex items-center gap-2 text-sm font-bold text-slate-900">
            <TrendingUp className="h-4 w-4 text-[#261c72]" />
            Réception des candidatures (14 derniers jours)
          </h3>
          <span className="font-mono text-[10px] text-slate-400">
            maximum : {maxDaily}/jour
          </span>
        </div>

        <div className="mt-4 flex h-28 items-end gap-1">
          {analytics.dailyTrend.map((day) => {
            const height = maxDaily
              ? Math.max(4, Math.round((day.count / maxDaily) * 88))
              : 4;
            const label = new Date(`${day.date}T00:00:00`).toLocaleDateString('fr-FR', {
              day: '2-digit',
              month: 'short',
            });
            return (
              <div
                key={day.date}
                className="flex flex-1 flex-col items-center justify-end gap-1"
                title={`${label} : ${day.count} candidature${day.count > 1 ? 's' : ''}`}
              >
                <div
                  className={`w-full rounded-t ${day.count > 0 ? 'bg-[#261c72]' : 'bg-slate-200'}`}
                  style={{ height: `${height}px` }}
                />
                <span className="font-mono text-[8px] text-slate-400">{day.date.slice(8)}</span>
              </div>
            );
          })}
        </div>
      </section>

      <section>
        <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
          <h3 className="flex items-center gap-2 text-sm font-bold text-slate-900">
            <BarChart3 className="h-4 w-4 text-[#261c72]" />
            Réponses aux questions à choix
          </h3>
          <p className="text-[11px] text-slate-500">
            Pourcentages calculés sur les candidats ayant répondu à chaque question.
          </p>
        </div>

        <div className="grid gap-3 lg:grid-cols-2">
          {analytics.choiceQuestions.map((analysis) => (
            <QuestionCard key={analysis.entry.question.id} analysis={analysis} />
          ))}
        </div>

        {analytics.choiceQuestions.length === 0 && (
          <p className="rounded-2xl border border-dashed border-slate-300 bg-white p-6 text-center text-xs text-slate-500">
            Aucune question à choix n'a encore reçu de réponse.
          </p>
        )}

        {analytics.unansweredChoiceCount > 0 && (
          <p className="mt-2 text-[11px] text-slate-500">
            {analytics.unansweredChoiceCount} autre
            {analytics.unansweredChoiceCount > 1 ? 's' : ''} question
            {analytics.unansweredChoiceCount > 1 ? 's' : ''} à choix sans aucune réponse non
            affichée{analytics.unansweredChoiceCount > 1 ? 's' : ''}.
          </p>
        )}
      </section>

      {analytics.openQuestions.length > 0 && (
        <section>
          <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
            <h3 className="flex items-center gap-2 text-sm font-bold text-slate-900">
              <MessageSquareText className="h-4 w-4 text-[#ff7f00]" />
              Réponses ouvertes
            </h3>
            <p className="text-[11px] text-slate-500">
              Clique sur une question pour lire les réponses reçues.
            </p>
          </div>

          <div className="space-y-2">
            {analytics.openQuestions.map((analysis) => (
              <details
                key={analysis.entry.question.id}
                className="group rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-xs"
              >
                <summary className="flex cursor-pointer list-none flex-wrap items-center justify-between gap-2">
                  <span className="flex min-w-0 items-center gap-2">
                    <SectionTag section={analysis.entry.section} />
                    <span className="truncate text-sm font-medium text-slate-800">
                      {analysis.entry.question.label}
                    </span>
                  </span>
                  <span className="shrink-0 font-mono text-[10px] text-slate-400">
                    {analysis.answered}/{analysis.eligible} rép. · {pct(analysis.ratio)}
                  </span>
                </summary>

                {analysis.textAnswers && analysis.textAnswers.length > 0 ? (
                  <ul className="mt-3 max-h-64 space-y-2 overflow-y-auto border-t border-slate-100 pt-3">
                    {analysis.textAnswers.map((answer, index) => (
                      <li key={`${analysis.entry.question.id}-${index}`} className="text-xs">
                        <span className="font-semibold text-slate-700">{answer.candidate}</span>
                        <p className="mt-0.5 whitespace-pre-wrap leading-relaxed text-slate-600">
                          {answer.value}
                        </p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-3 border-t border-slate-100 pt-3 text-xs text-slate-500">
                    Aucune réponse enregistrée.
                  </p>
                )}
              </details>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
