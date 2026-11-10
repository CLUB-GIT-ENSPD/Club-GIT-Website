import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CLUB_META } from '../data/clubData';
import { AuditionForm } from '../components/AuditionForm';
import { ArrowLeft, CheckCircle2, HelpCircle, Mail, Award, Info, ClipboardList } from 'lucide-react';

export const JoinPage: React.FC = () => {
  const navigate = useNavigate();
  const goHome = () => navigate('/');

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      {/* Top Header / Navigation Bar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-18 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={goHome}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:text-[#261c72] hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Retour à l'accueil</span>
            </button>

            <div className="hidden sm:flex items-center gap-3 pl-3 border-l border-slate-200">
              <img
                src="/images/logo-version-2.png"
                alt="Logo Club GIT"
                className="h-8 w-auto object-contain"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = "/images/logo_couleur.png";
                }}
              />
              <span className="font-display font-bold text-base text-slate-900">
                <span className="text-[#261c72]">Club GIT</span> <span className="text-[#ff7f00]">·</span> <span className="text-[#261c72]">ENSPD</span>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={goHome}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-[#261c72] hover:bg-[#1b1353] transition-colors cursor-pointer shadow-xs"
            >
              Voir le Site Officiel
            </button>
          </div>
        </div>
      </header>

      {/* Main Page Content */}
      <main className="flex-1 py-10 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Intro Banner */}
          <div className="max-w-3xl mb-6 sm:mb-8">
            <h1 className="text-3xl sm:text-5xl font-bold text-slate-900 tracking-tight leading-tight">
              Rejoignez l'élite des élèves-ingénieurs du Club GIT.
            </h1>
            <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
              L'adhésion au Club GIT réunit les élèves-ingénieurs du département Génie Informatique & Télécommunications de l'ENSPD autour de projets réels, de hackathons et d'ateliers collaboratifs.
            </p>
          </div>

          {/* Unique Information Vignette in Blue with Info Icon (No repetition elsewhere) */}
          <div className="mb-8 p-4 sm:p-5 rounded-2xl bg-blue-50 border border-blue-200 text-blue-950 flex items-start gap-3.5 shadow-xs">
            <Info className="w-5 h-5 text-[#261c72] shrink-0 mt-0.5" />
            <div className="space-y-1 text-xs sm:text-sm">
              <div className="font-bold text-[#261c72]">Challenge d'audition en présentiel & Adhésion (1 000 FCFA)</div>
              <p className="text-slate-700 leading-relaxed">
                L'audition est un <strong>challenge organisé par le club se déroulant en présentiel</strong>, comportant <strong>plusieurs épreuves en fonction du niveau d'étude</strong> de l'étudiant. Ces 1 000 FCFA représentent les frais d'audition pour l'adhésion au club, sont <strong>strictement non remboursables</strong> et <strong>se paient sur place</strong> le jour du challenge au campus de l'ENSPD.
              </p>
            </div>
          </div>

          {/* 2-Column layout: Audition form + Benefits/FAQ sidebar */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left Column (8 cols): Audition form */}
            <div className="lg:col-span-8 p-6 sm:p-10 rounded-3xl bg-white border border-slate-200 shadow-md">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b border-slate-100 pb-2 mb-4 flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-[#261c72] text-white flex items-center justify-center">
                  <ClipboardList className="w-3.5 h-3.5" />
                </span>
                <span>Formulaire d'audition</span>
              </h2>
              <AuditionForm />
            </div>

              {/* Right Column (4 cols): Benefits & FAQ (Clean, no redundant fee block) */}
              <div className="lg:col-span-4 space-y-6">
                {/* Benefits Card */}
                <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
                    <Award className="w-4 h-4 text-[#ff7f00]" />
                    <span>Avantages Membres Admis</span>
                  </h3>

                  <ul className="space-y-3 text-xs text-slate-600">
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#261c72] shrink-0 mt-0.5" />
                      <span>Accès prioritaire aux ateliers pratiques et bootcamps chaque samedi</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#261c72] shrink-0 mt-0.5" />
                      <span>Intégration aux équipes de projets campus et hackathons nationaux</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#261c72] shrink-0 mt-0.5" />
                      <span>Simulations et relectures approfondies pour vos soutenances de diplôme</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#261c72] shrink-0 mt-0.5" />
                      <span>Accès prioritaire à la clinique de dépannage informatique</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#261c72] shrink-0 mt-0.5" />
                      <span>Réseau privilégié avec les diplômés ingénieurs en entreprise</span>
                    </li>
                  </ul>
                </div>

                {/* FAQ Quick Accordion */}
                <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-[#261c72]" />
                    <span>Questions Fréquentes</span>
                  </h3>

                  <div className="space-y-3 text-xs">
                    <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
                      <div className="font-bold text-slate-900 mb-1">Comment se règlent les frais d'audition ?</div>
                      <p className="text-slate-600">
                        Les frais d'audition de <strong>1 000 FCFA</strong> (non remboursables) se règlent directement <strong>sur place</strong> lors de votre passage devant le jury au campus.
                      </p>
                    </div>

                    <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
                      <div className="font-bold text-slate-900 mb-1">En quoi consiste l'audition ?</div>
                      <p className="text-slate-600">
                        Un échange bienveillant d'une quinzaine de minutes pour évaluer votre motivation, votre curiosité technique et orienter votre parcours.
                      </p>
                    </div>

                    <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
                      <div className="font-bold text-slate-900 mb-1">Je suis débutant, puis-je postuler ?</div>
                      <p className="text-slate-600">
                        Oui ! Le club forme et accompagne tous les profils avec des bootcamps d'initiation progressifs.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Contact Box */}
                <div className="p-5 rounded-2xl bg-slate-100 border border-slate-200 text-xs text-slate-600 space-y-2">
                  <div className="font-bold text-slate-900">Une question sur votre candidature ?</div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-[#261c72]" />
                    <span>{CLUB_META.email}</span>
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Bureau du Club GIT · Bâtiment Pédagogique (Campus PK17 / Ndogbong)
                  </div>
                </div>
              </div>
            </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 text-center text-xs text-slate-500">
        <p>
          &copy; 2026 Club GIT · École Nationale Supérieure Polytechnique de Douala. Tous droits réservés.
        </p>
      </footer>
    </div>
  );
};
