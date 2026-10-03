import React, { useEffect } from 'react';
import { BureauMember } from '../types';
import { X, Mail, Linkedin, Github, Award, Briefcase, GraduationCap } from 'lucide-react';

interface BureauMemberModalProps {
  member: BureauMember | null;
  onClose: () => void;
  onImageClick?: (url: string, title: string) => void;
}

export const BureauMemberModal: React.FC<BureauMemberModalProps> = ({
  member,
  onClose,
  onImageClick
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (member) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [member, onClose]);

  if (!member) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-xl rounded-3xl bg-white border border-slate-200 shadow-2xl p-6 sm:p-8 my-8 text-left overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="member-modal-title"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
          aria-label="Fermer la fiche de présentation"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Member Profile Header */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 border-b border-slate-200 pb-6 text-center sm:text-left">
          <div
            className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden bg-slate-100 border-2 border-[#261c72]/30 shadow-md shrink-0 cursor-pointer group"
            onClick={() => onImageClick && onImageClick(member.avatarUrl, `Portrait de ${member.name}`)}
            title="Cliquer pour agrandir la photo"
          >
            <img
              src={member.avatarUrl}
              alt={member.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = "/images/photo1.jpg";
              }}
            />
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-[11px] font-medium">
              Agrandir
            </div>
          </div>

          <div className="space-y-1.5 flex-1">
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold bg-[#261c72]/10 text-[#261c72]">
              <Award className="w-3.5 h-3.5" />
              <span>Bureau Exécutif · Mandat {member.mandate}</span>
            </div>

            <h3 id="member-modal-title" className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              {member.name}
            </h3>

            <div className="text-sm font-semibold text-[#ff7f00]">
              {member.role}
            </div>

            <div className="flex items-center justify-center sm:justify-start gap-1.5 text-xs text-slate-600 font-medium">
              <GraduationCap className="w-4 h-4 text-slate-400" />
              <span>{member.department}</span>
            </div>
          </div>
        </div>

        {/* Fiche de Présentation Body */}
        <div className="mt-6 space-y-5">
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5 text-[#261c72]" />
              <span>Missions & Responsabilités</span>
            </h4>
            <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-200">
              {member.bio}
            </p>
          </div>

          {/* Institutional Affiliation */}
          <div className="p-3.5 rounded-2xl bg-blue-50/60 border border-blue-100 text-xs text-slate-700 flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-[#261c72] shrink-0" />
            <span>Élève-Ingénieur de l'École Nationale Supérieure Polytechnique de Douala (ENSPD)</span>
          </div>

          {/* Contact and Social Links */}
          <div className="pt-2">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">
              Canaux de Contact & Réseaux
            </h4>
            <div className="flex flex-wrap gap-2.5">
              {member.email && (
                <a
                  href={`mailto:${member.email}`}
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-white border border-slate-300 text-slate-700 hover:text-[#261c72] hover:border-[#261c72] hover:bg-slate-50 transition-colors shadow-xs"
                >
                  <Mail className="w-3.5 h-3.5 text-[#261c72]" />
                  <span>{member.email}</span>
                </a>
              )}

              {member.linkedin && (
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-white border border-slate-300 text-slate-700 hover:text-[#261c72] hover:border-[#261c72] hover:bg-slate-50 transition-colors shadow-xs"
                >
                  <Linkedin className="w-3.5 h-3.5 text-[#261c72]" />
                  <span>Profil LinkedIn</span>
                </a>
              )}

              {member.github && (
                <a
                  href={member.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-white border border-slate-300 text-slate-700 hover:text-slate-900 hover:border-slate-500 hover:bg-slate-50 transition-colors shadow-xs"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="mt-6 pt-5 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-xs font-semibold text-white bg-[#261c72] hover:bg-[#1b1353] transition-colors cursor-pointer shadow-xs"
          >
            Fermer la fiche
          </button>
        </div>
      </div>
    </div>
  );
};
