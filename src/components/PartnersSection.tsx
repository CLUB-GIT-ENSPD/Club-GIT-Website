import React from 'react';
import { Building2, GraduationCap, Network, ExternalLink, ShieldCheck } from 'lucide-react';

interface PartnersSectionProps {
  onImageClick?: (url: string, title: string) => void;
}

export const PartnersSection: React.FC<PartnersSectionProps> = ({ onImageClick }) => {
  const partners = [
    {
      id: "enspd",
      name: "École Nationale Supérieure Polytechnique de Douala",
      shortName: "ENSPD",
      role: "Établissement de Tutelle & Campus d'Ingénierie",
      logo: "/images/partners/logo-enspd.svg",
      description: "Grande école d'ingénieurs polytechniciens de référence au Cameroun. Elle héberge le Club GIT, met à disposition ses laboratoires d'informatique et parraine nos compétitions technologiques.",
      badge: "Grande École d'Ingénieurs",
      accentColor: "#004A87",
      tags: ["Campus PK17 & Ndogbong", "Cycle Ingénieur de Conception", "Laboratoires Numériques"]
    },
    {
      id: "git-sdia",
      name: "Département Génie Informatique, Télécommunications & SDIA",
      shortName: "Département GIT & SDIA",
      role: "Département Académique & Pédagogique d'Attache",
      logo: "/images/partners/logo-git-sdia.svg",
      description: "Pôle d'excellence en Génie Logiciel (GLO), Réseaux & Télécommunications (GRT) et Systèmes Décisionnels & Intelligence Artificielle (SDIA). Il encadre scientifiquement toutes nos activités.",
      badge: "Computer Engineering & Telecom",
      accentColor: "#FF5E00",
      tags: ["Génie Logiciel (GLO)", "Réseaux & Télécoms (GRT)", "Intelligence Artificielle (SDIA)"]
    },
    {
      id: "univ-douala",
      name: "Université de Douala",
      shortName: "Université de Douala (UDo)",
      role: "Tutelle Universitaire d'État",
      logo: "/images/partners/logo-univ-douala.svg",
      description: "Institution universitaire publique mère garantissant le cadre académique national, la reconnaissance des diplômes et la promotion de la recherche scientifique polytechnicienne.",
      badge: "Ratio et Scientia Omnia Vincunt",
      accentColor: "#1A2B70",
      tags: ["Université d'État", "Rayonnement Scientifique", "Excellence Académique"]
    }
  ];

  return (
    <section id="partenaires" className="py-16 sm:py-24 border-b border-slate-200/80 bg-slate-50/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-xs font-semibold text-[#261c72] mb-3">
            <ShieldCheck className="w-4 h-4 text-[#ff7f00]" />
            <span>Parrainage & Tutelles Officielles</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold text-slate-900 tracking-tight leading-tight">
            Nos Partenaires Institutionnels
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
            Le Club GIT évolue sous le parrainage direct et la bienveillance académique de l'ENSPD, du département GIT & SDIA et de l'Université de Douala.
          </p>
        </div>

        {/* 3 Partners Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {partners.map((partner) => (
            <div
              key={partner.id}
              className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-slate-300 transition-all flex flex-col justify-between group"
            >
              <div className="space-y-6">
                {/* Logo Display Box */}
                <div
                  className="w-full h-40 rounded-2xl bg-slate-50/80 border border-slate-100 flex items-center justify-center p-6 cursor-pointer group-hover:bg-slate-50 transition-colors"
                  onClick={() => onImageClick && onImageClick(partner.logo, partner.name)}
                  title={`Cliquer pour agrandir le logo de ${partner.shortName}`}
                >
                  <img
                    src={partner.logo}
                    alt={`Logo officiel ${partner.name}`}
                    className="max-h-28 max-w-full object-contain filter transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                {/* Information */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2.5 py-0.5 rounded-md text-[10px] font-mono font-bold uppercase tracking-wider bg-slate-100 text-slate-700 border border-slate-200">
                      {partner.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#261c72] transition-colors leading-snug">
                    {partner.shortName}
                  </h3>
                  <p className="text-xs font-semibold text-[#ff7f00] mt-1">
                    {partner.role}
                  </p>
                  <p className="text-xs text-slate-600 mt-3 leading-relaxed">
                    {partner.description}
                  </p>
                </div>
              </div>

              {/* Tags / Pills */}
              <div className="pt-6 border-t border-slate-100 mt-6">
                <div className="flex flex-wrap gap-1.5">
                  {partner.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2 py-1 rounded-lg text-[11px] font-medium bg-slate-50 text-slate-600 border border-slate-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Institutional Trust Footnote */}
        <div className="mt-10 p-5 rounded-2xl bg-white border border-slate-200/80 text-center text-xs text-slate-600 max-w-3xl mx-auto shadow-2xs">
          <p>
            Ces partenariats garantissent l'alignement pédagogique permanent de nos hackathons, formations et cliniques techniques avec les exigences du diplôme d'ingénieur de l'ENSPD Douala.
          </p>
        </div>
      </div>
    </section>
  );
};
