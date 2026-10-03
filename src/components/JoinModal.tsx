import React, { useState, useEffect } from 'react';
import { JoinFormData } from '../types';
import { X, CheckCircle, Sparkles } from 'lucide-react';

interface JoinModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const JoinModal: React.FC<JoinModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState<JoinFormData>({
    fullName: '',
    matricule: '',
    email: '',
    phone: '',
    level: 'Niveau 3 Ingénieur',
    preferredTrack: 'Génie Logiciel (GLO)',
    skills: '',
    motivation: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Le nom complet est obligatoire.';
    if (!formData.email.trim() || !formData.email.includes('@')) {
      newErrors.email = 'Veuillez saisir une adresse email valide.';
    }
    if (!formData.phone.trim()) newErrors.phone = 'Le numéro de téléphone / WhatsApp est requis.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitted(true);
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
      motivation: ''
    });
    setErrors({});
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl rounded-3xl bg-white border border-slate-200 shadow-2xl p-6 sm:p-8 my-8 text-left"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="join-modal-title"
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-[#ff7f00] font-bold mb-1">
              Campagne d'Adhésion 2025-2026
            </div>
            <h3 id="join-modal-title" className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Rejoindre la Communauté Club GIT
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Fermer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSubmitted ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-[#ff7f00]/10 border border-[#ff7f00]/30 text-[#ff7f00] mx-auto flex items-center justify-center shadow-xs">
              <CheckCircle className="w-8 h-8" />
            </div>

            <div className="max-w-md mx-auto">
              <h4 className="text-lg font-bold text-slate-900">Bienvenue dans l'aventure Club GIT !</h4>
              <p className="text-sm text-slate-600 mt-1">
                Votre candidature a bien été enregistrée. Le Secrétariat Général vous ajoutera au groupe de bienvenue sur WhatsApp et vous transmettra le planning des prochains ateliers.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 text-left text-xs text-slate-700 space-y-2 max-w-md mx-auto">
              <div className="font-semibold text-[#261c72] flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#ff7f00]" />
                <span>Rendez-vous hebdomadaire :</span>
              </div>
              <p>
                Chaque samedi à 09h00 au <strong>Laboratoire Réseau & Systèmes, Bâtiment Pédagogique ENSPD (PK17)</strong>. N'oubliez pas d'apporter votre ordinateur portable !
              </p>
            </div>

            <div className="pt-4">
              <button
                onClick={handleReset}
                className="px-6 py-2.5 rounded-xl text-sm font-semibold text-white bg-[#261c72] hover:bg-[#1b1353] shadow-md shadow-[#261c72]/20 transition-colors cursor-pointer"
              >
                Parfait, merci !
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 space-y-4 max-h-[70vh] overflow-y-auto pr-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Nom et Prénom <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Ex : Samuel Ewane"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className={`w-full px-3.5 py-2 rounded-xl bg-slate-50 border text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 ${
                    errors.fullName ? 'border-red-400 focus:ring-red-200' : 'border-slate-300 focus:border-[#261c72] focus:ring-[#261c72]/20'
                  }`}
                />
                {errors.fullName && <p className="text-[11px] text-red-500 mt-1">{errors.fullName}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Matricule ENSPD (facultatif)
                </label>
                <input
                  type="text"
                  placeholder="Ex : 21G00412"
                  value={formData.matricule}
                  onChange={(e) => setFormData({ ...formData, matricule: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-300 text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-[#261c72]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  placeholder="prenom.nom@enspd-udo.cm"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={`w-full px-3.5 py-2 rounded-xl bg-slate-50 border text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 ${
                    errors.email ? 'border-red-400 focus:ring-red-200' : 'border-slate-300 focus:border-[#261c72] focus:ring-[#261c72]/20'
                  }`}
                />
                {errors.email && <p className="text-[11px] text-red-500 mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Numéro Téléphone / WhatsApp <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  placeholder="+237 6..."
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className={`w-full px-3.5 py-2 rounded-xl bg-slate-50 border text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 ${
                    errors.phone ? 'border-red-400 focus:ring-red-200' : 'border-slate-300 focus:border-[#261c72] focus:ring-[#261c72]/20'
                  }`}
                />
                {errors.phone && <p className="text-[11px] text-red-500 mt-1">{errors.phone}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Niveau d'études actuel
                </label>
                <select
                  value={formData.level}
                  onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-300 text-sm text-slate-900 focus:bg-white focus:outline-none focus:border-[#261c72]"
                >
                  <option value="Niveau 1 Tronc Commun">Niveau 1 Tronc Commun</option>
                  <option value="Niveau 2 Tronc Commun">Niveau 2 Tronc Commun</option>
                  <option value="Niveau 3 Ingénieur">Niveau 3 Ingénieur</option>
                  <option value="Niveau 4 Ingénieur">Niveau 4 Ingénieur</option>
                  <option value="Niveau 5 Ingénieur">Niveau 5 Ingénieur</option>
                  <option value="Auditeur Libre / Autre">Auditeur Libre / Autre</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Filière Cible (GLO, GRT ou GCD)
                </label>
                <select
                  value={formData.preferredTrack}
                  onChange={(e) => setFormData({ ...formData, preferredTrack: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-300 text-sm text-slate-900 focus:bg-white focus:outline-none focus:border-[#261c72]"
                >
                  <option value="Génie Logiciel (GLO)">Génie Logiciel (GLO)</option>
                  <option value="Génie Réseau & Télécommunications (GRT)">Génie Réseau & Télécoms (GRT)</option>
                  <option value="Pôle Maintenance & Support IT">Pôle Maintenance & Support IT</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Compétences actuelles (débutants chaleureusement bienvenus !)
              </label>
              <input
                type="text"
                placeholder="Ex : Python, C, notions de Linux, Git, passionné d'électronique..."
                value={formData.skills}
                onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-300 text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-[#261c72]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Vos motivations pour rejoindre le Club GIT
              </label>
              <textarea
                rows={2}
                placeholder="Ex : Je souhaite participer aux hackathons, apprendre Docker et contribuer aux projets du campus..."
                value={formData.motivation}
                onChange={(e) => setFormData({ ...formData, motivation: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-300 text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-[#261c72]"
              />
            </div>

            <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
              <span className="text-[11px] text-slate-500">
                Adhésion gratuite ouverte à tous les étudiants de l'ENSPD.
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 transition-colors"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-semibold text-white bg-[#ff7f00] hover:bg-[#e67200] shadow-md shadow-[#ff7f00]/20 transition-colors cursor-pointer"
                >
                  Valider mon Adhésion
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
