import React from 'react';
import { CLUB_META } from '../data/clubData';
import { ArrowRight, Wrench, ZoomIn } from 'lucide-react';

interface HeroProps {
  onOpenServiceModal: () => void;
  onOpenJoinModal: () => void;
  onImageClick?: (url: string, title: string) => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenServiceModal,
  onOpenJoinModal,
  onImageClick
}) => {
  const heroImageSrc = "/src/assets/images/hero_enspd_tech_lab_1790990938202.jpg";
  const heroImageTitle = "Laboratoire de Génie Informatique & Télécommunications · ENSPD PK17";

  return (
    <section id="hero" className="relative pt-24 pb-16 sm:pt-32 sm:pb-24 overflow-hidden border-b border-slate-200/80 bg-gradient-to-b from-white via-slate-50/50 to-slate-50">
      {/* Subtle atmospheric radial lights (#261c72 and #ff7f00 accents) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[450px] bg-gradient-to-tr from-[#261c72]/8 via-[#ff7f00]/8 to-transparent blur-3xl -z-10 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Title & Actions (no subtitle on top of title) */}
          <div className="lg:col-span-7">
            {/* Main Headline (Clean, no kicker on top) */}
            <h1
              className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 mb-5 sm:mb-6 leading-[1.12]"
              style={{ textWrap: 'balance' }}
            >
              L'excellence par le <span className="text-[#261c72]">code</span>, les <span className="text-[#261c72]">télécoms</span> et l'<span className="text-[#ff7f00]">innovation</span> collaborative.
            </h1>

            {/* Value proposition paragraph */}
            <p className="text-base sm:text-lg text-slate-600 mb-8 sm:mb-9 leading-relaxed max-w-2xl">
              Association académique et technologique des élèves-ingénieurs du département Génie Informatique & Télécommunications de l'ENSPD. Projets innovants, hackathons, clinique de maintenance PC et mentorat rigoureux pour vos soutenances.
            </p>

            {/* Action Buttons: Clean & Direct */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mb-4">
              <button
                onClick={onOpenJoinModal}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-[#261c72] rounded-xl hover:bg-[#1b1353] shadow-md shadow-[#261c72]/20 transition-all active:scale-98 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#261c72]"
              >
                <span>Rejoignez-nous</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenServiceModal}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 text-sm font-semibold text-slate-800 bg-white border-2 border-[#ff7f00] rounded-xl hover:bg-orange-50 hover:text-[#ff7f00] transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ff7f00] shadow-xs"
              >
                <Wrench className="w-4 h-4 text-[#ff7f00]" />
                <span>Demande de Maintenance</span>
              </button>
            </div>
          </div>

          {/* Right Column: First image takes ALL white space & clickable to enlarge */}
          <div className="lg:col-span-5 h-full flex items-center">
            <div
              className="relative w-full h-80 sm:h-96 lg:h-[460px] rounded-3xl overflow-hidden shadow-2xl border border-slate-200 cursor-pointer group"
              onClick={() => onImageClick && onImageClick(heroImageSrc, heroImageTitle)}
              title="Cliquer pour agrandir la photo"
            >
              <img
                src={heroImageSrc}
                alt={heroImageTitle}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = "/images/graduation.jpg";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/25 to-transparent" />

              {/* Hover Zoom Badge */}
              <div className="absolute top-4 right-4 p-2.5 rounded-xl bg-black/40 backdrop-blur-md text-white border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1.5 text-xs">
                <ZoomIn className="w-4 h-4 text-[#ff7f00]" />
                <span>Agrandir</span>
              </div>

              {/* Bottom Info Banner */}
              <div className="absolute bottom-5 left-5 right-5 text-white">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#ff7f00] mb-1">
                  <span>Laboratoire Numérique & Réseaux</span>
                  <span>·</span>
                  <span>ENSPD PK17</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-200 leading-snug">
                  Étudiants et ingénieurs en session collaborative de développement applicatif et configuration réseau.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Proof of impact metrics cards */}
        <div className="mt-14 pt-10 border-t border-slate-200 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {CLUB_META.stats.map((stat, idx) => (
            <div
              key={idx}
              className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:border-[#ff7f00]/50 hover:shadow-md transition-all group"
            >
              <div className="text-2xl sm:text-3xl font-bold font-mono text-slate-900 group-hover:text-[#261c72] transition-colors tabular-nums tracking-tight">
                {stat.value}
              </div>
              <div className="text-sm font-semibold text-slate-800 mt-1 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ff7f00]" />
                <span>{stat.label}</span>
              </div>
              <div className="text-xs text-slate-500 mt-1 leading-snug">
                {stat.detail}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
