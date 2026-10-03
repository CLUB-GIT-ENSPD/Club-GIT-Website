import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CLUB_META } from '../data/clubData';
import { Mail, MapPin, ArrowUp, Send, Check, MessageCircle, Instagram, Facebook } from 'lucide-react';
import { useModal } from '../app/ModalContext';

export const Footer: React.FC = () => {
  const { openJoinModal, openServiceModal, openPrivacyModal } = useModal();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail && newsletterEmail.includes('@')) {
      setIsSubscribed(true);
      setNewsletterEmail('');
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="footer" className="bg-slate-50 border-t border-slate-200 text-slate-600 pt-16 pb-24 md:pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 pb-12 border-b border-slate-200">
          {/* Col 1: Club Brand & Mission (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-10 flex items-center justify-center">
                <img
                  src="/images/logo-version-2.png"
                  alt="Logo Club GIT"
                  className="h-9 w-auto object-contain"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = "/images/logo_couleur.png";
                  }}
                />
              </div>
              <span className="font-display font-bold text-lg text-slate-900">
                <span className="text-[#261c72]">Club GIT</span> <span className="text-[#ff7f00]">·</span> <span className="text-[#261c72]">ENSPD</span>
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Association académique et scientifique du département Génie Informatique & Télécommunications de l'École Nationale Supérieure Polytechnique de Douala (ENSPD).
            </p>

            <div className="pt-2 text-xs space-y-2 text-slate-600">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#ff7f00] shrink-0" />
                <span>Campus de Ndogbong / PK17, Douala, Cameroun</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#261c72] shrink-0" />
                <a href={`mailto:${CLUB_META.email}`} className="hover:text-[#261c72] transition-colors">
                  {CLUB_META.email}
                </a>
              </div>
            </div>
          </div>

          {/* Col 2: Navigation Links (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-900">
              Navigation
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/club" className="hover:text-[#261c72] transition-colors">À Propos</Link>
              </li>
              <li>
                <Link to="/club" className="hover:text-[#261c72] transition-colors">Département GIT</Link>
              </li>
              <li>
                <Link to="/club" className="hover:text-[#261c72] transition-colors">Partenaires</Link>
              </li>
              <li>
                <Link to="/filieres" className="hover:text-[#261c72] transition-colors">Filières Pédagogiques</Link>
              </li>
              <li>
                <Link to="/projets" className="hover:text-[#261c72] transition-colors">Projets & Réalisations</Link>
              </li>
              <li>
                <Link to="/bureau" className="hover:text-[#261c72] transition-colors">Bureau Exécutif</Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-[#261c72] transition-colors">Services & Support</Link>
              </li>
              <li>
                <Link to="/galerie" className="hover:text-[#261c72] transition-colors">Galerie Photos</Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Services & Opportunities (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-900">
              Services & Opportunités
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => openServiceModal('Clinique de Maintenance & Dépannage PC')}
                  className="hover:text-[#ff7f00] text-left transition-colors cursor-pointer"
                >
                  Clinique Maintenance PC
                </button>
              </li>
              <li>
                <button
                  onClick={() => openServiceModal('Accompagnement Académique & Soutenances')}
                  className="hover:text-[#261c72] text-left transition-colors cursor-pointer"
                >
                  Coaching & Soutenances d'Ingénieur
                </button>
              </li>
              <li>
                <button
                  onClick={() => openServiceModal('Ateliers Pratiques & Bootcamps Accélérés')}
                  className="hover:text-[#261c72] text-left transition-colors cursor-pointer"
                >
                  Bootcamps du Samedi Matin
                </button>
              </li>
              <li>
                <button
                  onClick={openJoinModal}
                  className="text-[#ff7f00] font-semibold hover:text-[#e67200] text-left transition-colors cursor-pointer"
                >
                  Challenge d'Audition & Adhésion →
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Newsletter & Sober Social Icons (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-900">
              Gazette Technologique
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Recevez les dates des prochains hackathons, annonces de stages et ouvertures des ateliers techniques.
            </p>

            {isSubscribed ? (
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Merci pour votre inscription à la gazette !</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  placeholder="votre.email@enspd-udo.cm"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#261c72]"
                  required
                />
                <button
                  type="submit"
                  className="p-2 rounded-xl bg-[#261c72] hover:bg-[#1b1353] text-white transition-colors shrink-0 cursor-pointer shadow-xs"
                  aria-label="S'inscrire"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            )}

            {/* Sober Social Icons */}
            <div className="pt-2">
              <div className="text-[11px] font-semibold text-slate-600 mb-2">Suivez nos activités :</div>
              <div className="flex items-center gap-2">
                <a
                  href={CLUB_META.socials.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-xl bg-slate-200/70 hover:bg-slate-300/80 text-slate-600 hover:text-slate-900 transition-colors"
                  title="Chaîne WhatsApp officielle"
                  aria-label="Chaîne WhatsApp"
                >
                  <MessageCircle className="w-4 h-4" />
                </a>

                <a
                  href={CLUB_META.socials.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-xl bg-slate-200/70 hover:bg-slate-300/80 text-slate-600 hover:text-slate-900 transition-colors"
                  title="Instagram officiel"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>

                <a
                  href={CLUB_META.socials.facebook}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-xl bg-slate-200/70 hover:bg-slate-300/80 text-slate-600 hover:text-slate-900 transition-colors"
                  title="Facebook officiel"
                  aria-label="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar with Privacy Policy */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>
            &copy; 2026 Club GIT · École Nationale Supérieure Polytechnique de Douala. Tous droits réservés.
          </p>

          <div className="flex items-center gap-4">
            <button
              onClick={openPrivacyModal}
              className="hover:text-[#261c72] hover:underline cursor-pointer"
            >
              Politique de Confidentialité
            </button>

            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 text-slate-600 hover:text-[#261c72] transition-colors cursor-pointer"
              aria-label="Remonter en haut de page"
            >
              <span>Retour en haut</span>
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
