import React from 'react';
import { Quote, GraduationCap, Award, Building, BookCheck, Shield } from 'lucide-react';

interface DepartmentHeadSectionProps {
  onImageClick?: (url: string, title: string) => void;
}

export const DepartmentHeadSection: React.FC<DepartmentHeadSectionProps> = ({ onImageClick }) => {
  const photoSrc = "/images/graduation.jpg";
  const photoTitle = "Direction du Département Génie Informatique & Télécommunications · ENSPD";

  return (
    <section id="departement" className="py-16 sm:py-24 border-b border-slate-200/80 bg-gradient-to-b from-white via-slate-50/50 to-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-white border border-slate-200/90 shadow-xl overflow-hidden p-6 sm:p-10 lg:p-14">
          {/* Subtle decorative glow accents */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#261c72]/5 rounded-full blur-3xl pointer-events-none -z-0" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#ff7f00]/5 rounded-full blur-3xl pointer-events-none -z-0" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
            {/* Left Column: Academic Portrait / Insignia (4 cols) */}
            <div className="lg:col-span-5 flex flex-col items-center text-center">
              <div
                className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-3xl overflow-hidden border-4 border-white shadow-2xl bg-slate-100 group cursor-pointer"
                onClick={() => onImageClick && onImageClick(photoSrc, photoTitle)}
                title="Agrandir la photo institutionnelle"
              >
                <img
                  src={photoSrc}
                  alt="Chef de Département Génie Informatique & Télécommunications"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = "/images/image_d_ensemble.jpg";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

                <div className="absolute bottom-3 left-3 right-3 text-white text-xs">
                  <div className="font-semibold text-slate-200 flex items-center justify-center gap-1.5">
                    <GraduationCap className="w-4 h-4 text-[#ff7f00]" />
                    <span>ENSPD · Université de Douala</span>
                  </div>
                </div>
              </div>

              {/* Title & Affiliation Badges */}
              <div className="mt-5 space-y-1.5">
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
                  Le Chef de Département
                </h3>
                <p className="text-xs sm:text-sm font-semibold text-[#261c72]">
                  Département Génie Informatique & Télécommunications
                </p>
                <p className="text-xs text-slate-500">
                  École Nationale Supérieure Polytechnique de Douala (ENSPD)
                </p>

                <div className="pt-2 flex flex-wrap items-center justify-center gap-2">
                  <span className="px-2.5 py-1 rounded-lg text-[10px] font-mono font-semibold bg-blue-50 text-[#261c72] border border-blue-200">
                    Génie Logiciel (GLO)
                  </span>
                  <span className="px-2.5 py-1 rounded-lg text-[10px] font-mono font-semibold bg-orange-50 text-[#ff7f00] border border-orange-200">
                    Réseaux & Télécoms (GRT)
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: Keynote Message / Parrainage (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              {/* Quote Mark */}
              <div className="w-12 h-12 rounded-2xl bg-[#261c72]/10 text-[#261c72] flex items-center justify-center">
                <Quote className="w-6 h-6" />
              </div>

              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight leading-tight">
                  Mot du Chef de Département
                </h2>
                <div className="h-1 w-20 bg-gradient-to-r from-[#261c72] to-[#ff7f00] rounded-full mt-2" />
              </div>

              <blockquote className="space-y-4 text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
                <p>
                  « Le département <strong>Génie Informatique & Télécommunications</strong> de l'ENSPD a pour vocation de former des ingénieurs de conception d'élite, rigoureux, créatifs et immédiatement opérationnels sur les défis numériques du XXI<sup>e</sup> siècle.
                </p>
                <p>
                  Dans cet écosystème d'exigence académique, le <strong>Club GIT</strong> est un levier d'excellence inestimable. Il matérialise le passage de la théorie aux réalisations pratiques de haut niveau : participation aux compétitions algorithmiques, maintien en condition opérationnelle du parc informatique et transmission intergénérationnelle du savoir.
                </p>
                <p className="text-slate-800 font-medium italic">
                  J'encourage l'ensemble des élèves-ingénieurs à saisir les opportunités de challenges, de bootcamps et de mentorat offertes par le club pour forger l'avenir technologique de notre nation. »
                </p>
              </blockquote>

              {/* Department Commitments Checklist */}
              <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700 border-t border-slate-100">
                <div className="flex items-center gap-2">
                  <BookCheck className="w-4 h-4 text-[#261c72] shrink-0" />
                  <span>Soutien institutionnel aux soutenances</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-[#ff7f00] shrink-0" />
                  <span>Accréditations d'ingénieur de conception</span>
                </div>
                <div className="flex items-center gap-2">
                  <Building className="w-4 h-4 text-[#261c72] shrink-0" />
                  <span>Laboratoires modernes aux campus PK17 & Ndogbong</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-[#ff7f00] shrink-0" />
                  <span>Éthique polytechnicienne & travail collaboratif</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
