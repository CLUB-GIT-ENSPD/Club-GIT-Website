import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Users } from 'lucide-react';
import { Hero } from '../components/Hero';
import { PROJECTS_DATA, TRACKS_DATA } from '../data/clubData';
import { useModal } from '../app/ModalContext';

export const HomePage: React.FC = () => {
  const { openServiceModal, openImage } = useModal();
  const navigate = useNavigate();
  const featuredProjects = PROJECTS_DATA.slice(0, 3);

  return (
    <div>
      <Hero
        onOpenServiceModal={() => openServiceModal()}
        onOpenJoinModal={() => navigate('/rejoindre')}
        onImageClick={(url, title) => openImage(url, title)}
      />

      {/* Filières preview */}
      <section className="py-16 sm:py-20 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-8">
            <div className="max-w-2xl">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                Deux filières d'excellence.
              </h2>
              <p className="mt-2 text-slate-600 text-sm sm:text-base">
                Génie Logiciel (GLO) & Réseaux Télécoms (GRT) — le cœur du département GIT.
              </p>
            </div>
            <Link
              to="/filieres"
              className="hidden sm:inline-flex items-center gap-1 text-sm font-semibold text-[#261c72] hover:text-[#ff7f00] transition-colors shrink-0"
            >
              <span>Tout découvrir</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {TRACKS_DATA.map((track) => (
              <Link
                key={track.id}
                to="/filieres"
                className="rounded-3xl bg-slate-50 border border-slate-200 overflow-hidden hover:shadow-lg hover:border-[#261c72]/30 transition-all group"
              >
                <div className="relative h-44 sm:h-52 overflow-hidden">
                  <img
                    src={track.imageUrl}
                    alt={track.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = '/images/photo1.jpg';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                  <div className="absolute bottom-4 left-5 right-5 text-white">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-[#ff7f00] font-semibold">
                      Cycle Bac+5 · {track.shortCode}
                    </span>
                    <h3 className="text-xl font-bold tracking-tight">{track.name}</h3>
                  </div>
                </div>
                <p className="p-5 text-sm text-slate-600 leading-relaxed line-clamp-2">
                  {track.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Projets preview */}
      <section className="py-16 sm:py-20 bg-slate-50/70 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-8">
            <div className="max-w-2xl">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                Projets phares du club.
              </h2>
              <p className="mt-2 text-slate-600 text-sm sm:text-base">
                Des solutions concrètes conçues par les étudiants pour le campus.
              </p>
            </div>
            <Link
              to="/projets"
              className="hidden sm:inline-flex items-center gap-1 text-sm font-semibold text-[#261c72] hover:text-[#ff7f00] transition-colors shrink-0"
            >
              <span>Tous les projets</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredProjects.map((project) => (
              <Link
                key={project.id}
                to="/projets"
                className="rounded-3xl bg-white border border-slate-200 overflow-hidden hover:shadow-lg hover:border-[#261c72]/30 transition-all group flex flex-col"
              >
                <div className="relative h-40 overflow-hidden bg-slate-100">
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = '/images/photo1.jpg';
                    }}
                  />
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <h3 className="font-bold text-slate-900 tracking-tight leading-snug">
                    {project.title}
                  </h3>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed line-clamp-2 flex-1">
                    {project.summary}
                  </p>
                  <div className="mt-3 flex items-center gap-1.5 text-xs text-slate-500">
                    <Users className="w-3.5 h-3.5" />
                    <span>Équipe de {project.teamCount} · {project.progress}%</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-8 text-center sm:hidden">
            <Link
              to="/projets"
              className="inline-flex items-center gap-1 text-sm font-semibold text-[#261c72]"
            >
              <span>Tous les projets</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA band */}
      <section className="py-16 sm:py-20 bg-[#261c72]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
            Prêt à construire l'avenir avec nous ?
          </h2>
          <p className="mt-3 text-white/70 text-sm sm:text-base max-w-2xl mx-auto">
            Rejoignez plus de 280 élèves-ingénieurs : projets réels, hackathons, cliniques de
            maintenance et mentorat académique.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/rejoindre"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-[#ff7f00] rounded-xl hover:bg-[#e67200] shadow-lg shadow-black/20 transition-all"
            >
              <span>Rejoindre le Club GIT</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/club"
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 text-sm font-semibold text-white border border-white/30 rounded-xl hover:bg-white/10 transition-all"
            >
              Découvrir le club
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
