import React, { useState } from 'react';
import { BUREAU_MANDATES, BUREAU_MEMBERS } from '../data/clubData';
import { BureauMember } from '../types';
import { BureauMandatePanel } from './BureauMandatePanel';
import { BureauMandateOption, BureauMandateTabs } from './BureauMandateTabs';

interface BureauSectionProps {
  onSelectMember: (member: BureauMember) => void;
}

const getMandateStartYear = (mandate: string) => Number(mandate.match(/\d{4}/)?.[0] ?? 0);

export const BureauSection: React.FC<BureauSectionProps> = ({ onSelectMember }) => {
  const [selectedMandate, setSelectedMandate] = useState<string>(BUREAU_MANDATES[0].id);

  const knownMandateIds = new Set<string>(BUREAU_MANDATES.map(({ id }) => id));
  const mandates: BureauMandateOption[] = [
    ...BUREAU_MANDATES,
    ...Array.from(new Set(BUREAU_MEMBERS.map(({ mandate }) => mandate)))
      .filter((mandate) => !knownMandateIds.has(mandate))
      .map((mandate) => ({ id: mandate, label: `Mandat ${mandate}` }))
  ].sort((a, b) => getMandateStartYear(b.id) - getMandateStartYear(a.id));

  const memberCounts = BUREAU_MEMBERS.reduce<Record<string, number>>((counts, member) => {
    counts[member.mandate] = (counts[member.mandate] ?? 0) + 1;
    return counts;
  }, {});

  return (
    <section id="bureau" className="py-16 sm:py-24 border-b border-slate-200/80 bg-slate-50/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <h2 className="text-2xl sm:text-4xl font-bold text-slate-900 tracking-tight leading-tight">
              Le Bureau Exécutif du Club GIT.
            </h2>
            <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
              Retrouvez les membres du bureau classés par mandat et par poste. Cliquez sur une vignette pour consulter la fiche complète.
            </p>
          </div>

          <BureauMandateTabs
            mandates={mandates}
            memberCounts={memberCounts}
            selectedMandate={selectedMandate}
            onSelectMandate={setSelectedMandate}
          />
        </div>

        {mandates.map(({ id, label }) => (
          <BureauMandatePanel
            key={id}
            id={id}
            label={label}
            members={BUREAU_MEMBERS.filter((member) => member.mandate === id)}
            onSelectMember={onSelectMember}
            selected={selectedMandate === id}
          />
        ))}
      </div>
    </section>
  );
};
