import React from 'react';
import { Link } from 'react-router-dom';
import { TRACKS_DATA } from '../data/clubData';
import { Code, Network, ArrowRight, GraduationCap, Briefcase, ZoomIn } from 'lucide-react';

interface TracksSectionProps {
  onSelectTrackForProjects?: (trackId: string) => void;
  onImageClick?: (url: string, title: string) => void;
}

export const TracksSection: React.FC<TracksSectionProps> = ({
  onSelectTrackForProjects,
  onImageClick
}) => {
  return (
    <section id="filieres" className="py-16 sm:py-24 border-b border-slate-200/80 bg-slate-50/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-4xl font-bold text-slate-900 tracking-tight leading-tight">
            Les 2 filières d'ingénierie du département GIT.
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
            Formations d'ingénieurs de conception d'élite à l'ENSPD : architecture logicielle distribuée et ingénierie des réseaux & télécommunications numériques.
          </p>
        </div>

        {/* 2 Visual Cards Side-by-Side (GLO & GRT) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          {TRACKS_DATA.map((track) => {
            const isGLO = track.id === 'glo';
            const Icon = isGLO ? Code : Network;
            const accentColor = isGLO ? '#261c72' : '#ff7f00';

            return (
              <div
                key={track.id}
                className="rounded-3xl bg-white border border-slate-200 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between group"
              >
                <div>
                  {/* Visual Photo Banner (Clickable to enlarge) */}
                  <div
                    className="relative h-56 sm:h-64 w-full overflow-hidden bg-slate-100 cursor-pointer"
                    onClick={() => onImageClick && onImageClick(track.imageUrl, `Filière ${track.name} (${track.shortCode}) - ENSPD`)}
                    title="Cliquer pour agrandir la photo de la filière"
                  >
                    <img
                      src={track.imageUrl}
                      alt={track.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = "/images/photo1.jpg";
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent" />

                    {/* ShortCode Badge Top-Right */}
                    <div className="absolute top-4 right-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-xl text-xs font-mono font-bold bg-white/95 text-slate-900 shadow-sm">
                        Cycle Bac+5 · {track.shortCode}
                      </span>
                    </div>

                    {/* Zoom Icon Hover Indicator */}
                    <div className="absolute top-4 left-4 p-2 rounded-xl bg-black/40 backdrop-blur-md text-white border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1.5 text-xs">
                      <ZoomIn className="w-3.5 h-3.5 text-[#ff7f00]" />
                      <span>Agrandir</span>
                    </div>

                    {/* Title Banner Bottom */}
                    <div className="absolute bottom-4 left-5 right-5 text-white">
                      <div className="flex items-center gap-2 mb-1">
                        <div
                          className="w-8 h-8 rounded-lg flex items-center justify-center"
                          style={{ backgroundColor: isGLO ? '#261c72' : '#ff7f00' }}
                        >
                          <Icon className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-xs font-mono uppercase tracking-wider text-[#ff7f00] font-semibold">
                          ENSPD Douala
                        </span>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                        {track.name} ({track.shortCode})
                      </h3>
                    </div>
                  </div>

                  {/* Card Content: Concise & Visual */}
                  <div className="p-6 sm:p-7 space-y-5">
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {track.description}
                    </p>

                    {/* Technologies & Stack taught (clean tags) */}
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2.5 flex items-center gap-1.5">
                        <Code className="w-3.5 h-3.5 text-[#261c72]" />
                        <span>Technologies & Outils Clés</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {track.technologies.map((tech, i) => (
                          <span
                            key={i}
                            className="px-2.5 py-1 rounded-lg text-xs font-mono bg-slate-100 border border-slate-200 text-slate-700"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Targeted Careers */}
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2 flex items-center gap-1.5">
                        <Briefcase className="w-3.5 h-3.5 text-[#ff7f00]" />
                        <span>Débouchés Principaux</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs text-slate-700">
                        {track.careers.slice(0, 4).map((career, i) => (
                          <div key={i} className="flex items-center gap-1.5 bg-slate-50 p-2 rounded-xl border border-slate-200/80">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#261c72] shrink-0" />
                            <span className="truncate">{career}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="px-6 py-4 sm:px-7 sm:py-4 bg-slate-50/80 border-t border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs text-slate-600">
                    <GraduationCap className="w-4 h-4 text-[#ff7f00]" />
                    <span className="font-semibold text-slate-800">Diplôme d'Ingénieur</span>
                  </div>

                  <Link
                    to="/projets"
                    onClick={() => onSelectTrackForProjects && onSelectTrackForProjects(track.id)}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-[#261c72] hover:text-[#ff7f00] transition-colors"
                  >
                    <span>Voir les projets {track.shortCode}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
