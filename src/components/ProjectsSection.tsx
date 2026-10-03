import React, { useState } from 'react';
import { PROJECTS_DATA } from '../data/clubData';
import { Project } from '../types';
import { ArrowUpRight, Users, ZoomIn } from 'lucide-react';

interface ProjectsSectionProps {
  onSelectProject: (project: Project) => void;
  onImageClick?: (url: string, title: string) => void;
  filterCategory?: string;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  onSelectProject,
  onImageClick
}) => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'logiciel' | 'reseau'>('all');

  const categories = [
    { id: 'all', label: 'Tous les projets' },
    { id: 'logiciel', label: 'Génie Logiciel (GLO)' },
    { id: 'reseau', label: 'Réseaux & Télécoms (GRT)' },
  ];

  const filteredProjects = selectedFilter === 'all'
    ? PROJECTS_DATA
    : PROJECTS_DATA.filter((p) => p.category === selectedFilter);

  const getStatusLabel = (status: Project['status']) => {
    switch (status) {
      case 'completed':
        return { text: 'Déployé', color: 'text-emerald-700 bg-emerald-50 border-emerald-200' };
      case 'active':
        return { text: 'En cours', color: 'text-[#261c72] bg-[#261c72]/10 border-[#261c72]/30' };
      case 'prototyping':
        return { text: 'R&D', color: 'text-[#ff7f00] bg-[#ff7f00]/10 border-[#ff7f00]/30' };
    }
  };

  return (
    <section id="projets" className="py-16 sm:py-24 border-b border-slate-200/80 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-12 gap-6">
          <div className="max-w-3xl">
            <h2 className="text-2xl sm:text-4xl font-bold text-slate-900 tracking-tight leading-tight">
              Des réalisations concrètes au service du campus et de la société.
            </h2>
            <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
              Chaque projet est conçu en équipe par les étudiants de l'ENSPD, de la phase de planification jusqu'au déploiement en conditions réelles.
            </p>
          </div>

          {/* Filter segment tabs (GLO, GRT) */}
          <div className="flex overflow-x-auto pb-1 gap-1.5 p-1 bg-slate-100 rounded-2xl border border-slate-200 shrink-0">
            {categories.map((cat) => {
              const isActive = selectedFilter === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedFilter(cat.id as any)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#261c72] ${
                    isActive
                      ? 'bg-[#261c72] text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 lg:gap-8">
          {filteredProjects.map((project) => {
            const statusInfo = getStatusLabel(project.status);
            return (
              <div
                key={project.id}
                onClick={() => onSelectProject(project)}
                className="group rounded-3xl bg-white border border-slate-200 hover:border-[#261c72]/60 hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer shadow-xs"
              >
                <div>
                  {/* Card Image banner */}
                  <div className="relative h-52 w-full overflow-hidden bg-slate-100 border-b border-slate-200">
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = "/images/photo1.jpg";
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent" />

                    {/* Status Pill in top corner */}
                    <div className="absolute top-3 right-3">
                      <span className={`inline-flex items-center text-[11px] font-semibold font-mono border px-2.5 py-0.5 rounded-lg shadow-xs ${statusInfo.color}`}>
                        {statusInfo.text}
                      </span>
                    </div>

                    {/* Zoom Icon Button on Image */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onImageClick && onImageClick(project.imageUrl, project.title);
                      }}
                      className="absolute top-3 left-3 p-2 rounded-xl bg-black/40 backdrop-blur-md text-white border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/60"
                      title="Agrandir l'image du projet"
                    >
                      <ZoomIn className="w-3.5 h-3.5 text-[#ff7f00]" />
                    </button>

                    {/* Category Label bottom */}
                    <div className="absolute bottom-3 left-4 text-xs font-mono uppercase tracking-wider text-white font-semibold">
                      Filière {project.category === 'logiciel' ? 'Génie Logiciel (GLO)' : 'Réseaux & Télécoms (GRT)'}
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 space-y-3">
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#261c72] transition-colors line-clamp-1">
                      {project.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-2">
                      {project.summary}
                    </p>

                    {/* Progress Bar */}
                    <div className="pt-2">
                      <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1">
                        <span>Avancement du Projet</span>
                        <span className="font-mono text-slate-700 font-semibold tabular-nums">{project.progress}%</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                        <div
                          className="h-full bg-[#261c72] rounded-full"
                          style={{ width: `${project.progress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="p-6 pt-0 border-t border-slate-100 mt-2">
                  <div className="flex items-center justify-between text-xs text-slate-500 pt-3">
                    <div className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-slate-400" />
                      <span>{project.teamCount} élèves-ingénieurs</span>
                    </div>
                    <span className="text-[#ff7f00] font-semibold group-hover:text-[#e67200] group-hover:translate-x-0.5 transition-all inline-flex items-center gap-1">
                      <span>Détails & Jalons</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
