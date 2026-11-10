import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { BureauMember } from '../types';

interface BureauMemberCardProps {
  member: BureauMember;
  mandateLabel: string;
  onSelect: (member: BureauMember) => void;
}

export const BureauMemberCard: React.FC<BureauMemberCardProps> = ({
  member,
  mandateLabel,
  onSelect
}) => (
  <button
    type="button"
    onClick={() => onSelect(member)}
    className="group p-5 rounded-3xl bg-white border border-slate-200/90 hover:border-[#261c72]/60 hover:shadow-lg transition-all flex flex-col justify-between space-y-4 shadow-xs cursor-pointer relative text-left"
    aria-label={`Voir la fiche de présentation de ${member.name}, ${member.role}`}
  >
    <div>
      <div className="flex items-center gap-3 mb-3">
        <div className="w-20 h-20 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0 group-hover:scale-105 transition-transform duration-300">
          <img
            src={member.avatarUrl}
            alt={member.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.src = "/images/photo1.jpg";
            }}
          />
        </div>
        <div>
          <h5 className="text-sm font-bold text-slate-900 group-hover:text-[#261c72] transition-colors leading-snug">
            {member.name}
          </h5>
          <span className="text-xs font-semibold text-[#ff7f00] leading-snug">
            {member.role}
          </span>
        </div>
      </div>

      <div className="text-[11px] font-mono text-[#261c72] font-semibold mb-2">
        {member.department}
      </div>

      <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
        {member.bio}
      </p>
    </div>

    <span className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
      <span className="font-mono text-[10px] text-slate-400">{mandateLabel}</span>
      <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#261c72] group-hover:text-[#ff7f00] transition-colors">
        <span>Fiche complète</span>
        <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
      </span>
    </span>
  </button>
);
