import React, { useState, useEffect } from 'react';
import { ServiceRequestForm } from '../types';
import { X, CheckCircle, AlertCircle, Wrench } from 'lucide-react';

interface ServiceRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultService?: string;
}

export const ServiceRequestModal: React.FC<ServiceRequestModalProps> = ({
  isOpen,
  onClose,
  defaultService
}) => {
  const [formData, setFormData] = useState<ServiceRequestForm>({
    fullName: '',
    email: '',
    phone: '',
    academicLevel: 'Niveau 3 Ingénieur (GLO/GRT)',
    serviceType: defaultService || 'Diagnostic matériel & Réparation',
    deviceOrTopic: '',
    urgency: 'normale',
    details: ''
  });

  const [submittedTicket, setSubmittedTicket] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (defaultService) {
      setFormData((prev) => ({ ...prev, serviceType: defaultService }));
    }
  }, [defaultService]);

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
    if (!formData.fullName.trim()) newErrors.fullName = 'Le nom complet est requis.';
    if (!formData.email.trim() || !formData.email.includes('@')) {
      newErrors.email = 'Une adresse email valide est requise.';
    }
    if (!formData.phone.trim()) newErrors.phone = 'Le numéro de téléphone / WhatsApp est requis.';
    if (!formData.details.trim()) newErrors.details = 'Veuillez préciser la panne ou le besoin.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    // Generate random maintenance ticket code
    const ticketNum = 'MAINT-' + Math.floor(1000 + Math.random() * 9000);
    setSubmittedTicket(ticketNum);
  };

  const handleReset = () => {
    setSubmittedTicket(null);
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      academicLevel: 'Niveau 3 Ingénieur (GLO/GRT)',
      serviceType: 'Diagnostic matériel & Réparation',
      deviceOrTopic: '',
      urgency: 'normale',
      details: ''
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
        aria-labelledby="service-modal-title"
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-[#ff7f00] font-bold mb-1 flex items-center gap-1.5">
              <Wrench className="w-3.5 h-3.5" />
              <span>Clinique Informatique & Dépannage PC · ENSPD</span>
            </div>
            <h3 id="service-modal-title" className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Demande de Maintenance
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

        {submittedTicket ? (
          /* Confirmation State */
          <div className="py-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-600 mx-auto flex items-center justify-center shadow-xs">
              <CheckCircle className="w-8 h-8" />
            </div>

            <div className="max-w-md mx-auto">
              <h4 className="text-lg font-bold text-slate-900">Demande de Maintenance Enregistrée !</h4>
              <p className="text-sm text-slate-600 mt-1">
                Votre ticket a été assigné au Pôle Maintenance Hardware & Réseau du Club GIT.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#261c72]/10 border border-[#261c72]/30 inline-block font-mono text-lg font-bold text-[#261c72] tabular-nums">
              Ticket N° {submittedTicket}
            </div>

            <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 text-left text-xs text-slate-800 space-y-2 max-w-lg mx-auto">
              <div className="font-semibold text-slate-900 flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 text-[#ff7f00]" />
                <span>Modalités & Tarification de l'intervention :</span>
              </div>
              <p>
                La maintenance des PC se fait moyennant des frais qui vous seront communiqués directement par le prestataire / technicien après examen du diagnostic et prise en charge.
              </p>
              <p className="text-slate-600">
                Vous recevrez un devis clair par WhatsApp sous 24h avant toute intervention. Vous pourrez ensuite déposer votre ordinateur au <strong>Laboratoire Numérique / Salle Club GIT (Campus PK17 / Ndogbong)</strong>.
              </p>
            </div>

            <div className="pt-4">
              <button
                onClick={handleReset}
                className="px-6 py-2.5 rounded-xl text-sm font-semibold text-white bg-[#261c72] hover:bg-[#1b1353] shadow-md shadow-[#261c72]/20 transition-colors cursor-pointer"
              >
                Terminer et Fermer
              </button>
            </div>
          </div>
        ) : (
          /* Maintenance Submission Form */
          <form onSubmit={handleSubmit} className="mt-6 space-y-4 max-h-[70vh] overflow-y-auto pr-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Nom et Prénom <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Ex : Danielle Danielle Ngo"
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
                  Numéro de Téléphone / WhatsApp <span className="text-red-500">*</span>
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
                  Adresse Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  placeholder="votre.email@enspd-udo.cm"
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
                  Niveau d'Études / Spécialité
                </label>
                <select
                  value={formData.academicLevel}
                  onChange={(e) => setFormData({ ...formData, academicLevel: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-300 text-sm text-slate-900 focus:bg-white focus:outline-none focus:border-[#261c72]"
                >
                  <option value="Niveau 1 Tronc Commun">Niveau 1 Tronc Commun</option>
                  <option value="Niveau 2 Tronc Commun">Niveau 2 Tronc Commun</option>
                  <option value="Niveau 3 Ingénieur (GLO/GRT)">Niveau 3 Ingénieur (GLO/GRT)</option>
                  <option value="Niveau 4 Ingénieur (GLO/GRT)">Niveau 4 Ingénieur (GLO/GRT)</option>
                  <option value="Niveau 5 Ingénieur (Fin d'études)">Niveau 5 Ingénieur (Fin d'études)</option>
                  <option value="Enseignant / Personnel ENSPD">Enseignant / Personnel ENSPD</option>
                  <option value="Autre département ENSPD">Autre département ENSPD</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Type d'Intervention de Maintenance
                </label>
                <select
                  value={formData.serviceType}
                  onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-300 text-sm text-slate-900 focus:bg-white focus:outline-none focus:border-[#261c72]"
                >
                  <option value="Diagnostic matériel & Réparation">Diagnostic matériel & Réparation</option>
                  <option value="Dépoussiérage & Remplacement pâte thermique">Dépoussiérage & Remplacement pâte thermique</option>
                  <option value="Installation Double-Boot Linux & Windows">Installation Double-Boot Linux & Windows</option>
                  <option value="Optimisation système & Nettoyage malwares">Optimisation système & Nettoyage malwares</option>
                  <option value="Remplacement composant (RAM, SSD, Batterie, Écran)">Remplacement composant (RAM, SSD, Batterie, Écran)</option>
                  <option value="Autre problème matériel ou logiciel">Autre problème matériel ou logiciel</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Degré d'Urgence
                </label>
                <select
                  value={formData.urgency}
                  onChange={(e) => setFormData({ ...formData, urgency: e.target.value as any })}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-300 text-sm text-slate-900 focus:bg-white focus:outline-none focus:border-[#261c72]"
                >
                  <option value="normale">Normale (Délai standard 24h-48h)</option>
                  <option value="urgente">Urgente (Machine requise pour TP ou examen immédiat)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Marque et Modèle de l'Ordinateur
              </label>
              <input
                type="text"
                placeholder="Ex : Dell Latitude 5420, HP ProBook 450 G8, Lenovo ThinkPad, Asus ZenBook..."
                value={formData.deviceOrTopic}
                onChange={(e) => setFormData({ ...formData, deviceOrTopic: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-300 text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-[#261c72]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Description de la Panne ou du Problème <span className="text-red-500">*</span>
              </label>
              <textarea
                rows={3}
                placeholder="Ex : La machine s'éteint au bout de 15 minutes, ventilateur bruyant, écran bleu au démarrage, besoin d'installer Linux Ubuntu pour les TP..."
                value={formData.details}
                onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                className={`w-full px-3.5 py-2 rounded-xl bg-slate-50 border text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 ${
                  errors.details ? 'border-red-400 focus:ring-red-200' : 'border-slate-300 focus:border-[#261c72] focus:ring-[#261c72]/20'
                }`}
              />
              {errors.details && <p className="text-[11px] text-red-500 mt-1">{errors.details}</p>}
            </div>

            <div className="p-3 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs text-amber-900 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span>
                <strong>Information tarifaire :</strong> La maintenance des PC se fait moyennant des frais qui seront communiqués par le prestataire après soumission de votre demande et examen du diagnostic.
              </span>
            </div>

            <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
              <p className="text-xs text-slate-500">
                Frais d'intervention communiqués sur devis après diagnostic.
              </p>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full sm:w-auto px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="w-full sm:w-auto px-5 py-2 rounded-xl text-xs font-semibold text-white bg-[#ff7f00] hover:bg-[#e67200] shadow-sm shadow-[#ff7f00]/30 transition-colors cursor-pointer"
                >
                  Soumettre la Demande de Maintenance
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
