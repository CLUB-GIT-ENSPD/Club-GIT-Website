import React from 'react';

export interface BureauMandateOption {
  id: string;
  label: string;
}

interface BureauMandateTabsProps {
  mandates: BureauMandateOption[];
  memberCounts: Record<string, number>;
  selectedMandate: string;
  onSelectMandate: (mandate: string) => void;
}

export const BureauMandateTabs: React.FC<BureauMandateTabsProps> = ({
  mandates,
  memberCounts,
  selectedMandate,
  onSelectMandate
}) => (
  <div className="flex flex-wrap justify-end gap-3" role="tablist" aria-label="Choisir un mandat du bureau">
    {mandates.map(({ id, label }) => {
      const isSelected = selectedMandate === id;

      return (
        <button
          key={id}
          type="button"
          role="tab"
          aria-selected={isSelected}
          aria-controls={`mandate-panel-${id}`}
          onClick={() => onSelectMandate(id)}
          className={`min-w-36 rounded-2xl border px-4 py-3 text-left transition-colors ${
            isSelected
              ? 'border-[#261c72] bg-[#261c72] text-white shadow-md'
              : 'border-slate-200 bg-white text-slate-700 hover:border-[#261c72]/50 hover:bg-[#261c72]/5'
          }`}
        >
          <span className="block text-sm font-bold">{label}</span>
          <span className={`mt-1 block text-xs ${isSelected ? 'text-white/75' : 'text-slate-500'}`}>
            {memberCounts[id] ?? 0} membre{memberCounts[id] === 1 ? '' : 's'}
          </span>
        </button>
      );
    })}
  </div>
);
