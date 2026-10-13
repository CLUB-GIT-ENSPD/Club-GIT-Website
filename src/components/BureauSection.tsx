import React from 'react';
import { BUREAU_MEMBERS } from '../data/clubData';
import { BureauMember } from '../types';
import { ArrowUpRight } from 'lucide-react';

interface BureauSectionProps {
  onSelectMember: (member: BureauMember) => void;
}

export const BureauSection: React.FC<BureauSectionProps> = ({ onSelectMember }) => {
  return (
    <section id="bureau" className="py-16 sm:py-24 border-b border-slate-200/80 bg-slate-50/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-10">
          <h2 className="text-2xl sm:text-4xl font-bold text-slate-900 tracking-tight leading-tight">
            Le Bureau Exécutif du Club GIT.
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
            Cliquez sur la vignette pour ouvrir la fiche de présentation complète (missions, parcours académique et canaux de contact direct).
          </p>
        </div>

        {/* Members Grid (All Vignettes Clickable) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {BUREAU_MEMBERS.map((member) => (
            <div
              key={member.id}
              onClick={() => onSelectMember(member)}
              className="group p-5 rounded-3xl bg-white border border-slate-200/90 hover:border-[#261c72]/60 hover:shadow-lg transition-all flex flex-col justify-between space-y-4 shadow-xs cursor-pointer relative"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onSelectMember(member);
                }
              }}
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
                        (e.currentTarget as HTMLImageElement).src = "/images/photo1.jpg";
                      }}
                    />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 group-hover:text-[#261c72] transition-colors leading-snug">
                      {member.name}
                    </h3>
                    <div className="text-xs font-semibold text-[#ff7f00] leading-snug">
                      {member.role}
                    </div>
                  </div>
                </div>

                <div className="text-[11px] font-mono text-[#261c72] font-semibold mb-2">
                  {member.department}
                </div>

                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                  {member.bio}
                </p>
              </div>

              {/* Clickable Card Footer */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span className="font-mono text-[10px] text-slate-400">
                  {member.mandate}
                </span>

                <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#261c72] group-hover:text-[#ff7f00] transition-colors">
                  <span>Fiche complète</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
