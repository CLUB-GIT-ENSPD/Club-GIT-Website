import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CLUB_META } from '../data/clubData';
import { ArrowLeft, CheckCircle2, HelpCircle, Mail, Award, Info } from 'lucide-react';

export const JoinPage: React.FC = () => {
  const navigate = useNavigate();
  const goHome = () => navigate('/');
  const [formData, setFormData] = useState({
    fullName: '',
    matricule: '',
    email: '',
    phone: '',
    level: 'Niveau 3 Ingénieur',
    preferredTrack: 'Génie Logiciel (GLO)',
    skills: '',
    motivation: '',
    acceptedFee: true,
    availabilitySaturday: 'oui'
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [applicationId, setApplicationId] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Veuillez saisir votre nom et prénom.';
    if (!formData.email.trim() || !formData.email.includes('@')) {
      newErrors.email = 'Veuillez renseigner une adresse email valide.';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Le numéro de téléphone / WhatsApp est indispensable.';
    }
    if (!formData.acceptedFee) {
      newErrors.acceptedFee = 'Veuillez confirmer avoir pris note des frais d\'audition de 1 000 FCFA (payables sur place).';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const id = 'GIT-MEMBRE-' + Math.floor(10000 + Math.random() * 90000);
    setApplicationId(id);
    setIsSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setFormData({
      fullName: '',
      matricule: '',
      email: '',
      phone: '',
      level: 'Niveau 3 Ingénieur',
      preferredTrack: 'Génie Logiciel (GLO)',
      skills: '',
      motivation: '',
      acceptedFee: true,
      availabilitySaturday: 'oui'
    });
    setErrors({});
  };

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

          {isSubmitted ? (
            /* Success confirmation card on the page */
            <div className="max-w-2xl mx-auto p-8 sm:p-10 rounded-3xl bg-white border border-slate-200 shadow-xl text-center space-y-6">
              <div className="w-18 h-18 rounded-3xl bg-emerald-50 border border-emerald-200 text-emerald-600 mx-auto flex items-center justify-center shadow-xs">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-[#ff7f00] font-bold">
                  Dossier de Candidature Enregistré
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
                  Bienvenue, {formData.fullName} !
                </h2>
                <p className="text-slate-600 text-sm mt-2 max-w-lg mx-auto">
                  Votre dossier a été transmis au bureau exécutif. Votre convocation horaire pour l'audition vous sera transmise par WhatsApp.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#261c72]/10 border border-[#261c72]/20 font-mono text-base sm:text-lg font-bold text-[#261c72]">
                Matricule de Candidature : {applicationId}
              </div>

              {/* On-site Payment Instruction in Blue Card */}
              <div className="p-4 sm:p-5 rounded-2xl bg-blue-50 border border-blue-200 text-left text-xs sm:text-sm text-slate-800 space-y-2">
                <div className="font-bold text-[#261c72] flex items-center gap-2">
                  <Info className="w-4 h-4 text-[#261c72]" />
                  <span>Rappel pour le jour de l'audition :</span>
                </div>
                <p className="text-slate-700 leading-relaxed">
                  Le montant de <strong>1 000 FCFA</strong> (frais d'audition non remboursables) sera réglé <strong>sur place</strong> au campus de l'ENSPD (Bloc Informatique, PK17) lors de votre passage devant le jury.
                </p>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={goHome}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl text-xs font-semibold text-white bg-[#261c72] hover:bg-[#1b1353] shadow-md shadow-[#261c72]/20 transition-all cursor-pointer"
                >
                  Retourner sur la Page d'Accueil
                </button>
                <button
                  onClick={handleReset}
                  className="w-full sm:w-auto px-5 py-3 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
                >
                  Soumettre une autre candidature
                </button>
              </div>
            </div>
          ) : (
            /* 2-Column layout: Full application form + Benefits/FAQ sidebar */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              {/* Left Column (8 cols): Complete Form */}
              <div className="lg:col-span-8 p-6 sm:p-10 rounded-3xl bg-white border border-slate-200 shadow-md">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Step 1: Identity */}
                  <div>
                    <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b border-slate-100 pb-2 mb-4 flex items-center gap-2">
                      <span className="w-6 h-6 rounded-lg bg-[#261c72] text-white flex items-center justify-center text-xs font-mono font-bold">1</span>
                      <span>Identité & Coordonnées</span>
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                          Nom complet & Prénom <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          placeholder="Ex : Danielle Danielle Ngo"
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 ${
                            errors.fullName ? 'border-red-400 focus:ring-red-200' : 'border-slate-300 focus:border-[#261c72] focus:ring-[#261c72]/20'
                          }`}
                        />
                        {errors.fullName && <p className="text-[11px] text-red-500 mt-1">{errors.fullName}</p>}
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                          Matricule ENSPD (facultatif si cycle prépa)
                        </label>
                        <input
                          type="text"
                          placeholder="Ex : 22G00451"
                          value={formData.matricule}
                          onChange={(e) => setFormData({ ...formData, matricule: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-[#261c72]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                          Adresse Email <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          placeholder="votre.nom@enspd-udo.cm"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 ${
                            errors.email ? 'border-red-400 focus:ring-red-200' : 'border-slate-300 focus:border-[#261c72] focus:ring-[#261c72]/20'
                          }`}
                        />
                        {errors.email && <p className="text-[11px] text-red-500 mt-1">{errors.email}</p>}
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                          Numéro WhatsApp / Téléphone <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="tel"
                          placeholder="+237 6..."
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 ${
                            errors.phone ? 'border-red-400 focus:ring-red-200' : 'border-slate-300 focus:border-[#261c72] focus:ring-[#261c72]/20'
                          }`}
                        />
                        {errors.phone && <p className="text-[11px] text-red-500 mt-1">{errors.phone}</p>}
                      </div>
                    </div>
                  </div>

                  {/* Step 2: Academic Profile */}
                  <div className="pt-2">
                    <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b border-slate-100 pb-2 mb-4 flex items-center gap-2">
                      <span className="w-6 h-6 rounded-lg bg-[#261c72] text-white flex items-center justify-center text-xs font-mono font-bold">2</span>
                      <span>Cursus Académique & Filière Cible</span>
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                          Niveau d'études actuel
                        </label>
                        <select
                          value={formData.level}
                          onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-sm text-slate-900 focus:bg-white focus:outline-none focus:border-[#261c72]"
                        >
                          <option value="Niveau 1 Tronc Commun">Niveau 1 Tronc Commun</option>
                          <option value="Niveau 2 Tronc Commun">Niveau 2 Tronc Commun</option>
                          <option value="Niveau 3 Ingénieur">Niveau 3 Ingénieur (1ère année)</option>
                          <option value="Niveau 4 Ingénieur">Niveau 4 Ingénieur (2ème année)</option>
                          <option value="Niveau 5 Ingénieur">Niveau 5 Ingénieur (Fin d'études)</option>
                          <option value="Autre / Auditeur libre">Autre département ENSPD</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                          Filière de Prédilection (GLO ou GRT)
                        </label>
                        <select
                          value={formData.preferredTrack}
                          onChange={(e) => setFormData({ ...formData, preferredTrack: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-sm text-slate-900 focus:bg-white focus:outline-none focus:border-[#261c72]"
                        >
                          <option value="Génie Logiciel (GLO)">Génie Logiciel (GLO)</option>
                          <option value="Génie Réseau & Télécommunications (GRT)">Génie Réseau & Télécommunications (GRT)</option>
                          <option value="Pôle Maintenance PC & Support Hardware">Pôle Maintenance PC & Support Hardware</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Step 3: Motivation & Simple Validation */}
                  <div className="pt-2">
                    <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b border-slate-100 pb-2 mb-4 flex items-center gap-2">
                      <span className="w-6 h-6 rounded-lg bg-[#261c72] text-white flex items-center justify-center text-xs font-mono font-bold">3</span>
                      <span>Compétences & Engagement</span>
                    </h2>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Outils ou langages déjà explorés (débutants bienvenus !)
                      </label>
                      <input
                        type="text"
                        placeholder="Ex : Python, C, HTML/CSS, notions de Linux, curieux de réseaux..."
                        value={formData.skills}
                        onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-[#261c72]"
                      />
                    </div>

                    <div className="mt-4">
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Pourquoi souhaitez-vous intégrer le Club GIT ?
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Ex : Je souhaite participer aux hackathons, apprendre Docker, rencontrer des aînés..."
                        value={formData.motivation}
                        onChange={(e) => setFormData({ ...formData, motivation: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-[#261c72]"
                      />
                    </div>

                    {/* Simple Confirmation Checkbox */}
                    <div className="mt-4 p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                      <div className="flex items-start gap-2.5">
                        <input
                          type="checkbox"
                          id="feeCheck"
                          checked={formData.acceptedFee}
                          onChange={(e) => setFormData({ ...formData, acceptedFee: e.target.checked })}
                          className="w-4 h-4 text-[#261c72] rounded focus:ring-[#261c72] mt-0.5"
                        />
                        <label htmlFor="feeCheck" className="text-xs text-slate-700 leading-snug">
                          J'ai pris note des frais d'audition de <strong>1 000 FCFA</strong> (non remboursables), payables <strong>sur place</strong> le jour de l'audition.
                        </label>
                      </div>
                      {errors.acceptedFee && (
                        <p className="text-[11px] text-red-600 pl-6 mt-1">{errors.acceptedFee}</p>
                      )}
                    </div>
                  </div>

                  {/* Submission CTA */}
                  <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-slate-500">
                      Règlement des frais d'audition effectué sur place le jour de l'audition.
                    </p>

                    <button
                      type="submit"
                      className="w-full sm:w-auto px-7 py-3 rounded-xl text-sm font-semibold text-white bg-[#ff7f00] hover:bg-[#e67200] shadow-md shadow-[#ff7f00]/30 transition-all active:scale-98 cursor-pointer"
                    >
                      Enregistrer ma Candidature
                    </button>
                  </div>
                </form>
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
          )}
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
