import React from 'react';
import { BureauMember } from '../types';
import { BureauMemberCard } from './BureauMemberCard';

interface BureauMandatePanelProps {
  id: string;
  label: string;
  members: BureauMember[];
  onSelectMember: (member: BureauMember) => void;
  selected: boolean;
}

export const BureauMandatePanel: React.FC<BureauMandatePanelProps> = ({
  id,
  label,
  members,
  onSelectMember,
  selected
}) => {
  return (
    <section
      id={`mandate-panel-${id}`}
      role="tabpanel"
      aria-label={label}
      className="space-y-5"
      hidden={!selected}
    >
      {members.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {members.map((member) => (
            <BureauMemberCard
              key={member.id}
              member={member}
              mandateLabel={label}
              onSelect={onSelectMember}
            />
          ))}
        </div>
      ) : (
        <p className="rounded-2xl border border-dashed border-slate-300 bg-white/70 px-5 py-6 text-sm text-slate-600">
          La composition de ce bureau sera ajoutée prochainement.
        </p>
      )}
    </section>
  );
};
