import React from 'react';
import { ZoomIn } from 'lucide-react';

interface AboutSectionProps {
  onImageClick?: (url: string, title: string) => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onImageClick }) => {
  const timelineSteps = [
    {
      step: "01",
      title: "Pratique & Projets Réels au Cœur du Cursus",
      subtitle: "De la théorie académique à la production logicielle et réseau",
      description: "À l'ENSPD, les concepts étudiés en cours prennent corps dans nos laboratoires. Les étudiants conçoivent des applications complètes, testent des architectures distribuées et participent à des marathons de programmation dès les premières années.",
      bullets: [
        "Sprints collaboratifs et revues de code en équipes",
        "Solutions logicielles déployées pour les besoins réels du campus",
        "Maîtrise des standards industriels : Git, Docker, microservices"
      ],
      accent: "#261c72",
      image: "/images/photo1.jpg",
      imageCaption: "Étudiants du Club GIT en session de programmation collaborative"
    },
    {
      step: "02",
      title: "Clinique de Maintenance & Dépannage PC",
      subtitle: "Un matériel informatique toujours opérationnel pour chaque étudiant",
      description: "Une machine en panne ne doit jamais interrompre la formation d'un futur ingénieur. Notre atelier assure diagnostics hardware, nettoyage thermique, réparations et installations d'environnements Linux adaptés aux cours.",
      bullets: [
        "Dépoussiérage et optimisation thermique des ordinateurs portables",
        "Installation double-boot sécurisée (Ubuntu / Windows)",
        "Plus de 240 ordinateurs remis en état de marche par an"
      ],
      accent: "#ff7f00",
      image: "/images/maintenance.jpg",
      imageCaption: "Atelier pratique de diagnostic matériel et maintenance hardware"
    },
    {
      step: "03",
      title: "Accompagnement & Répétition des Soutenances",
      subtitle: "Un encadrement rigoureux pour réussir son jury avec mention",
      description: "Pour les soutenances de stage ouvrier, de stage technique et de fin d'études d'ingénieur de conception, le Club GIT organise des jurys blancs chronométrés. Les aînés relisent les mémoires, vérifient les démonstrations et préparent aux questions exigeantes.",
      bullets: [
        "Simulations chronométrées en conditions réelles d'amphithéâtre",
        "Relecture méthodologique et mise aux normes ENSPD des mémoires",
        "100% de réussite validée lors des sessions solennelles de diplôme"
      ],
      accent: "#261c72",
      image: "/images/graduation.jpg",
      imageCaption: "Promotion des nouveaux ingénieurs de conception GIT ENSPD"
    },
    {
      step: "04",
      title: "Réseau d'Alumni & Ateliers du Samedi",
      subtitle: "Une communauté active connectée à l'écosystème professionnel",
      description: "Chaque samedi matin, la salle de laboratoire s'anime pour des ateliers pratiques ouverts à tous les niveaux. Nos alumni, désormais ingénieurs dans de grands groupes et startups internationales, partagent leur expérience et ouvrent des opportunités de stage.",
      bullets: [
        "Ateliers thématiques chaque samedi matin (09h00 à 13h00)",
        "Mentorat personnalisé et opportunités de stage exclusives",
        "Esprit d'entraide polytechnicienne inter-promotions"
      ],
      accent: "#ff7f00",
      image: "/images/image_d_ensemble.jpg",
      imageCaption: "Assemblée générale et journée d'intégration du Club GIT"
    }
  ];

  return (
    <section id="about" className="py-16 sm:py-24 border-b border-slate-200/80 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header: Clean title, no kicker subtitle on top */}
        <div className="max-w-3xl mx-auto text-center mb-16 sm:mb-20">
          <h2 className="text-2xl sm:text-4xl font-bold text-slate-900 tracking-tight leading-tight">
            Forger une nouvelle génération d'ingénieurs aptes à bâtir les infrastructures de demain.
          </h2>
          <p className="mt-4 text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            Association académique et scientifique du département Génie Informatique & Télécommunications de l'ENSPD, active sur le campus de Ndogbong et PK17 à Douala.
          </p>
        </div>

        {/* Vertical Timeline with Alternating Image & Content */}
        <div className="relative">
          {/* Central Vertical Connector Line (Desktop) */}
          <div className="hidden lg:block absolute left-1/2 top-4 bottom-12 -translate-x-1/2 w-0.5 bg-gradient-to-b from-[#261c72] via-[#ff7f00] to-[#261c72]" />

          <div className="space-y-16 sm:space-y-24">
            {timelineSteps.map((step, idx) => {
              const isEven = idx % 2 === 0;

              return (
                <div
                  key={step.step}
                  className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center"
                >
                  {/* Timeline Badge in Center (Desktop) */}
                  <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-2xl bg-white border-2 border-slate-200 shadow-lg items-center justify-center">
                    <span
                      className="font-mono text-sm font-bold"
                      style={{ color: step.accent }}
                    >
                      {step.step}
                    </span>
                  </div>

                  {/* Left Column (Desktop) */}
                  <div
                    className={`lg:col-span-5 ${
                      isEven ? 'lg:text-right' : 'lg:order-last lg:text-left'
                    }`}
                  >
                    {isEven ? (
                      /* Image on Left for Even items */
                      <div
                        className="relative rounded-3xl overflow-hidden shadow-lg border border-slate-200 bg-slate-100 cursor-pointer group aspect-[4/3]"
                        onClick={() => onImageClick && onImageClick(step.image, step.imageCaption)}
                        title="Cliquer pour agrandir la photo"
                      >
                        <img
                          src={step.image}
                          alt={step.title}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          onError={(e) => {
                            (e.currentTarget as HTMLImageElement).src = "/images/photo1.jpg";
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-transparent" />

                        {/* Hover Zoom Icon */}
                        <div className="absolute top-3 right-3 p-2 rounded-xl bg-black/40 backdrop-blur-md text-white border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 text-[11px]">
                          <ZoomIn className="w-3.5 h-3.5 text-[#ff7f00]" />
                          <span>Agrandir</span>
                        </div>

                        <div className="absolute bottom-3 left-4 right-4 text-white text-left">
                          <p className="text-xs text-slate-200 font-medium leading-snug">
                            {step.imageCaption}
                          </p>
                        </div>
                      </div>
                    ) : (
                      /* Text on Left for Odd items (Clean, no AI icon badges) */
                      <div className="space-y-3.5">
                        <div className="font-mono text-xs font-bold" style={{ color: step.accent }}>
                          Étape {step.step}
                        </div>

                        <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                          {step.title}
                        </h3>

                        <p className="text-xs sm:text-sm font-medium text-slate-700">
                          {step.subtitle}
                        </p>

                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                          {step.description}
                        </p>

                        <ul className="space-y-1.5 pt-1">
                          {step.bullets.map((b, bIdx) => (
                            <li key={bIdx} className="flex items-start gap-2 text-xs text-slate-700">
                              <span className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: step.accent }} />
                              <span>{b}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Spacer Column (Desktop: 2 cols for center timeline) */}
                  <div className="hidden lg:block lg:col-span-2" />

                  {/* Right Column (Desktop) */}
                  <div
                    className={`lg:col-span-5 ${
                      isEven ? 'lg:text-left' : 'lg:order-first lg:text-left'
                    }`}
                  >
                    {isEven ? (
                      /* Text on Right for Even items */
                      <div className="space-y-3.5">
                        <div className="font-mono text-xs font-bold" style={{ color: step.accent }}>
                          Étape {step.step}
                        </div>

                        <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                          {step.title}
                        </h3>

                        <p className="text-xs sm:text-sm font-medium text-slate-700">
                          {step.subtitle}
                        </p>

                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                          {step.description}
                        </p>

                        <ul className="space-y-1.5 pt-1">
                          {step.bullets.map((b, bIdx) => (
                            <li key={bIdx} className="flex items-start gap-2 text-xs text-slate-700">
                              <span className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: step.accent }} />
                              <span>{b}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : (
                      /* Image on Right for Odd items */
                      <div
                        className="relative rounded-3xl overflow-hidden shadow-lg border border-slate-200 bg-slate-100 cursor-pointer group aspect-[4/3]"
                        onClick={() => onImageClick && onImageClick(step.image, step.imageCaption)}
                        title="Cliquer pour agrandir la photo"
                      >
                        <img
                          src={step.image}
                          alt={step.title}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          onError={(e) => {
                            (e.currentTarget as HTMLImageElement).src = "/images/photo1.jpg";
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-transparent" />

                        {/* Hover Zoom Icon */}
                        <div className="absolute top-3 right-3 p-2 rounded-xl bg-black/40 backdrop-blur-md text-white border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 text-[11px]">
                          <ZoomIn className="w-3.5 h-3.5 text-[#ff7f00]" />
                          <span>Agrandir</span>
                        </div>

                        <div className="absolute bottom-3 left-4 right-4 text-white text-left">
                          <p className="text-xs text-slate-200 font-medium leading-snug">
                            {step.imageCaption}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
