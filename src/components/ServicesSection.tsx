import React from 'react';
import { SERVICES_DATA } from '../data/clubData';
import { GraduationCap, Wrench, Terminal, Layers, ArrowRight, CheckCircle2, Clock } from 'lucide-react';

interface ServicesSectionProps {
  onOpenServiceModal: (serviceTitle?: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onOpenServiceModal }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'GraduationCap':
        return <GraduationCap className="w-6 h-6 text-[#261c72]" />;
      case 'Wrench':
        return <Wrench className="w-6 h-6 text-[#ff7f00]" />;
      case 'Terminal':
        return <Terminal className="w-6 h-6 text-[#261c72]" />;
      case 'Layers':
        return <Layers className="w-6 h-6 text-[#ff7f00]" />;
      default:
        return <Wrench className="w-6 h-6 text-[#261c72]" />;
    }
  };

  return (
    <section id="services" className="py-16 sm:py-24 border-b border-slate-200/80 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-4xl font-bold text-slate-900 tracking-tight leading-tight">
            Des services concrets pour propulser chaque étudiant de l'ENSPD.
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
            Le Club GIT n'est pas qu'un espace de formation théorique : nous opérons un guichet d'entraide technique, de réparation d'ordinateurs et de coaching intensif pour vos soutenances.
          </p>
        </div>

        {/* Services Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {SERVICES_DATA.map((service, idx) => {
            const isOrange = idx % 2 === 1;
            const isLastTwo = idx >= 2;

            return (
              <div
                key={service.id}
                className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 hover:border-slate-300 hover:shadow-lg transition-all flex flex-col justify-between space-y-6 shadow-xs group"
              >
                <div className="space-y-4">
                  {/* Clean Icon (without colored square box) + Timing Badge */}
                  <div className="flex items-center justify-between">
                    <div>
                      {getIcon(service.icon)}
                    </div>
                    <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-500 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-200">
                      <Clock className="w-3.5 h-3.5 text-[#261c72]" />
                      <span>{service.averageTime}</span>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-[#261c72] transition-colors mb-2">
                      {service.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  {/* Deliverables */}
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2.5">
                      Prestations Incluses :
                    </div>
                    <ul className="space-y-2">
                      {service.deliverables.map((item, dIdx) => (
                        <li key={dIdx} className="flex items-start gap-2.5 text-xs text-slate-600">
                          <CheckCircle2 className="w-4 h-4 text-[#ff7f00] shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Bottom Card Action: button only on the first two vignettes; removed on the last two */}
                <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div className="text-[11px] text-slate-500">
                    <span className="font-semibold text-slate-700">Public :</span> {service.targetAudience}
                  </div>

                  {!isLastTwo ? (
                    <button
                      onClick={() => onOpenServiceModal(service.title)}
                      className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-white shadow-sm transition-all cursor-pointer whitespace-nowrap active:scale-98 ${
                        isOrange
                          ? 'bg-[#ff7f00] hover:bg-[#e67200] shadow-[#ff7f00]/20'
                          : 'bg-[#261c72] hover:bg-[#1b1353] shadow-[#261c72]/20'
                      }`}
                    >
                      <span>Demander ce Service</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <span className="text-xs font-medium text-slate-400 italic">
                      Organisation interne au campus
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
