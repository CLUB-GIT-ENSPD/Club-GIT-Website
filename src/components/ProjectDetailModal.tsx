import React, { useEffect } from 'react';
import { Project } from '../types';
import { X, Github, CheckCircle2, Clock, CircleDot, Users, User, ArrowUpRight, ZoomIn } from 'lucide-react';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
  onImageClick?: (url: string, title: string) => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  onClose,
  onImageClick
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  const getStatusBadge = (status: Project['status']) => {
    switch (status) {
      case 'completed':
        return (
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            Déployé & En Production
          </span>
        );
      case 'active':
        return (
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#261c72] bg-[#261c72]/10 border border-[#261c72]/30 px-2.5 py-1 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-[#261c72] animate-pulse" />
            En Développement Actif
          </span>
        );
      case 'prototyping':
        return (
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#ff7f00] bg-[#ff7f00]/10 border border-[#ff7f00]/30 px-2.5 py-1 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ff7f00]" />
            Phase R&D & Prototypage
          </span>
        );
    }
  };

  const getPoleLabel = (cat: Project['category']) => {
    return cat === 'logiciel' ? 'Génie Logiciel (GLO)' : 'Réseaux & Télécoms (GRT)';
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl rounded-3xl bg-white border border-slate-200 shadow-2xl p-6 sm:p-8 my-8 overflow-hidden text-left"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Header with Close Button */}
        <div className="flex items-start justify-between gap-4 border-b border-slate-200 pb-5">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              {getStatusBadge(project.status)}
              <span className="text-xs text-slate-300">·</span>
              <span className="text-xs font-mono uppercase text-[#ff7f00] font-semibold tracking-wider">
                Filière {getPoleLabel(project.category)} · ENSPD
              </span>
            </div>
            <h3 id="modal-title" className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              {project.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#261c72] cursor-pointer"
            aria-label="Fermer la boîte de dialogue"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="mt-6 space-y-6 max-h-[70vh] overflow-y-auto pr-1">
          {/* Project Image Banner */}
          <div
            className="relative h-48 sm:h-56 w-full rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 cursor-pointer group"
            onClick={() => onImageClick && onImageClick(project.imageUrl, project.title)}
            title="Cliquer pour agrandir la photo du projet"
          >
            <img
              src={project.imageUrl}
              alt={project.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = "/images/photo1.jpg";
              }}
            />
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-medium gap-1.5">
              <ZoomIn className="w-4 h-4 text-[#ff7f00]" />
              <span>Agrandir l'image</span>
            </div>
          </div>

          {/* Summary / Description */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
              Contexte & Architecture
            </h4>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Project Lead & Team Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#261c72]/10 text-[#261c72] border border-[#261c72]/20 flex items-center justify-center shrink-0">
                <User className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs text-slate-500">Porteur du Projet</div>
                <div className="text-sm font-semibold text-slate-900">{project.leadName}</div>
                <div className="text-xs text-[#261c72] font-semibold">{project.leadRole}</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#ff7f00]/10 text-[#ff7f00] border border-[#ff7f00]/20 flex items-center justify-center shrink-0">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs text-slate-500">Équipe de Réalisation</div>
                <div className="text-sm font-semibold text-slate-900">{project.teamCount} Élèves-Ingénieurs</div>
                <div className="text-xs text-slate-500">Cycle Polytechnique Douala</div>
              </div>
            </div>
          </div>

          {/* Milestones / Roadmap */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Jalons & Avancement du Projet
              </h4>
              <span className="text-xs font-mono font-semibold text-[#261c72] tabular-nums">
                {project.progress}% Complété
              </span>
            </div>

            {/* Progress bar */}
            <div className="w-full h-2.5 rounded-full bg-slate-100 overflow-hidden mb-5">
              <div
                className="h-full bg-gradient-to-r from-[#261c72] to-[#ff7f00] rounded-full transition-all duration-500"
                style={{ width: `${project.progress}%` }}
              />
            </div>

            <div className="space-y-3">
              {project.milestones.map((m, idx) => {
                const isDone = m.status === 'completed';
                const isCurrent = m.status === 'in_progress';
                return (
                  <div
                    key={idx}
                    className={`p-3.5 rounded-2xl border flex items-start gap-3 transition-colors ${
                      isDone
                        ? 'bg-emerald-50/50 border-emerald-200 text-slate-800'
                        : isCurrent
                        ? 'bg-blue-50/60 border-blue-200 text-slate-900'
                        : 'bg-slate-50 border-slate-200 text-slate-500'
                    }`}
                  >
                    <div className="mt-0.5 shrink-0">
                      {isDone ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      ) : isCurrent ? (
                        <Clock className="w-4 h-4 text-[#261c72] animate-spin" />
                      ) : (
                        <CircleDot className="w-4 h-4 text-slate-400" />
                      )}
                    </div>
                    <div>
                      <div className="text-xs sm:text-sm font-semibold">
                        Étape {idx + 1} : {m.title}
                      </div>
                      <div className="text-xs text-slate-600 mt-0.5">
                        {m.description}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Outcomes */}
          {project.outcomes && project.outcomes.length > 0 && (
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
                Impacts & Résultats Mesurés
              </h4>
              <ul className="space-y-2">
                {project.outcomes.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-slate-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ff7f00] shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Tech stack */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
              Stack Technologique & Outils
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((t, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-lg text-xs font-mono bg-slate-100 border border-slate-200 text-slate-700"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer with Actions */}
        <div className="mt-6 pt-5 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
              >
                <Github className="w-4 h-4" />
                <span>Code Source</span>
              </a>
            )}
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-[#261c72] hover:bg-[#1b1353] shadow-md shadow-[#261c72]/20 transition-colors"
              >
                <span>Accéder à la Plateforme</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            )}
          </div>

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
};
