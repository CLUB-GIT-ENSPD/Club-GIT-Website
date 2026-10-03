import React, { useState } from 'react';
import { BUREAU_MEMBERS } from '../data/clubData';
import { BureauMember } from '../types';
import { Search, Mail, Linkedin, Github, User, ArrowUpRight } from 'lucide-react';

interface BureauSectionProps {
  onSelectMember: (member: BureauMember) => void;
}

export const BureauSection: React.FC<BureauSectionProps> = ({ onSelectMember }) => {
  const [selectedMandate, setSelectedMandate] = useState<'2025-2026' | '2024-2025'>('2025-2026');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'direction' | 'technique' | 'academique' | 'logistique'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', label: 'Tous les membres' },
    { id: 'direction', label: 'Direction' },
    { id: 'technique', label: 'Pôle Technique & Projets' },
    { id: 'academique', label: 'Pôle Académique & Formations' },
    { id: 'logistique', label: 'Communication & Logistique' },
  ];

  const filteredMembers = BUREAU_MEMBERS.filter((m) => {
    const matchesMandate = m.mandate === selectedMandate;
    const matchesCategory = selectedCategory === 'all' || m.category === selectedCategory;
    const matchesSearch =
      searchQuery.trim() === '' ||
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.department.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesMandate && matchesCategory && matchesSearch;
  });

  return (
    <section id="bureau" className="py-16 sm:py-24 border-b border-slate-200/80 bg-slate-50/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 gap-6">
          <div className="max-w-3xl">
            <h2 className="text-2xl sm:text-4xl font-bold text-slate-900 tracking-tight leading-tight">
              Le Bureau Exécutif du Club GIT.
            </h2>
            <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
              Cliquez sur la vignette d'un membre pour ouvrir sa fiche de présentation complète (missions, parcours académique et canaux de contact direct).
            </p>
          </div>

          {/* Mandate Switcher Tab (2025-2026 vs 2024-2025) */}
          <div className="flex items-center gap-1.5 p-1 bg-white rounded-2xl border border-slate-200 shadow-xs self-start lg:self-end">
            <button
              onClick={() => setSelectedMandate('2025-2026')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                selectedMandate === '2025-2026'
                  ? 'bg-[#261c72] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Mandat 2025-2026 (Actuel)
            </button>
            <button
              onClick={() => setSelectedMandate('2024-2025')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                selectedMandate === '2024-2025'
                  ? 'bg-[#261c72] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Promotion 2024-2025 (Alumni)
            </button>
          </div>
        </div>

        {/* Filter controls & Search bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-8">
          {/* Category Tabs */}
          <div className="flex overflow-x-auto pb-1 gap-1.5 scrollbar-none">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id as any)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-blue-50 text-[#261c72] border border-[#261c72]/30 font-semibold'
                      : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div className="relative min-w-[240px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Rechercher un membre ou rôle..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#261c72] focus:ring-1 focus:ring-[#261c72] shadow-xs"
            />
          </div>
        </div>

        {/* Members Grid (All Vignettes Clickable) */}
        {filteredMembers.length === 0 ? (
          <div className="p-8 text-center rounded-2xl bg-white border border-slate-200 text-slate-500 text-sm">
            Aucun membre trouvé pour ces critères de recherche.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filteredMembers.map((member) => (
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
                    <div className="w-13 h-13 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0 group-hover:scale-105 transition-transform duration-300">
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
        )}
      </div>
    </section>
  );
};
