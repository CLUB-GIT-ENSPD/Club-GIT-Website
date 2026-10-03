import React, { useEffect } from 'react';
import { X, ShieldCheck, Lock, FileText, CheckCircle2 } from 'lucide-react';
import { CLUB_META } from '../data/clubData';

interface PrivacyPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyPolicyModal: React.FC<PrivacyPolicyModalProps> = ({ isOpen, onClose }) => {
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

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl rounded-3xl bg-white border border-slate-200 shadow-2xl p-6 sm:p-8 my-8 text-left max-h-[85vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="privacy-modal-title"
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-slate-200 pb-4 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-[#261c72]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 id="privacy-modal-title" className="text-lg sm:text-xl font-bold text-slate-900">
                Politique de Confidentialité & Protection des Données
              </h2>
              <p className="text-xs text-slate-500 font-mono">
                Club GIT · Département Génie Informatique & Télécommunications (ENSPD)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Fermer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="overflow-y-auto py-5 pr-2 space-y-6 text-xs sm:text-sm text-slate-600 leading-relaxed">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-slate-700">
            <p>
              Le <strong>Club Génie Informatique & Télécommunications (Club GIT)</strong> de l'École Nationale Supérieure Polytechnique de Douala attache la plus haute importance à la protection de la vie privée et des données à caractère personnel de ses membres, candidats et bénéficiaires de services.
            </p>
          </div>

          {/* Section 1 */}
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-[#261c72] text-white flex items-center justify-center text-[10px] font-mono">1</span>
              <span>Données Collectées & Finalités</span>
            </h3>
            <p>
              Les informations recueillies via nos formulaires sont strictement réservées à des finalités académiques et associatives :
            </p>
            <ul className="space-y-1.5 pl-6 list-disc text-slate-700">
              <li>
                <strong>Candidature au Club & Challenge d'Audition :</strong> Nom, prénom, matricule ENSPD, adresse email académique ou personnelle, niveau d'études, filière souhaitée (GLO ou GRT) et numéro WhatsApp. Ces données permettent d'organiser les épreuves en présentiel, d'affecter les candidats aux jurys et d'envoyer les convocations horaires.
              </li>
              <li>
                <strong>Demande de Maintenance PC :</strong> Nom, contact, marque et modèle de l'appareil, description de la panne. Ces données permettent au prestataire technique d'établir le diagnostic et de communiquer le devis des réparations.
              </li>
            </ul>
          </div>

          {/* Section 2 */}
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-[#261c72] text-white flex items-center justify-center text-[10px] font-mono">2</span>
              <span>Règlement des Frais d'Audition</span>
            </h3>
            <p>
              Les frais d'audition d'un montant de <strong>1 000 FCFA</strong> sont <strong>exclusivement réglés sur place</strong> en présentiel le jour du challenge au campus de l'ENSPD. Aucune coordonnée bancaire, mot de passe ni carte de crédit n'est demandée ni traitée sur ce site web. Cet argent est strictement non remboursable.
            </p>
          </div>

          {/* Section 3 */}
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-[#261c72] text-white flex items-center justify-center text-[10px] font-mono">3</span>
              <span>Non-Cession & Confidentialité</span>
            </h3>
            <p>
              Vos données ne sont <strong>en aucun cas vendues, louées, ni cédées</strong> à des tiers à des fins publicitaires ou commerciales. Seuls les membres autorisés du Bureau Exécutif (Présidence, Secrétariat Général, Pôle Pédagogique) et les prestataires techniques de maintenance ont accès aux informations strictement nécessaires à leurs missions.
            </p>
          </div>

          {/* Section 4 */}
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-[#261c72] text-white flex items-center justify-center text-[10px] font-mono">4</span>
              <span>Conservation & Sécurité</span>
            </h3>
            <p>
              Les fiches de candidature sont conservées pour la durée de l'année académique 2025-2026 afin d'assurer le suivi des promotions et l'attribution des certificats de participation. Les données relatives aux demandes de maintenance sont archivées pour une durée maximale de 6 mois après clôture du ticket.
            </p>
          </div>

          {/* Section 5 */}
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-[#261c72] text-white flex items-center justify-center text-[10px] font-mono">5</span>
              <span>Vos Droits & Contact</span>
            </h3>
            <p>
              Conformément à la législation en vigueur sur la protection des données au Cameroun, vous disposez d'un droit permanent d'accès, de rectification et de suppression de vos données personnelles. Pour exercer ce droit, écrivez directement à :
            </p>
            <div className="p-3 rounded-xl bg-slate-100 font-mono text-xs text-[#261c72] font-semibold">
              {CLUB_META.email}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-slate-200 shrink-0 flex items-center justify-between">
          <span className="text-[11px] text-slate-500">
            Dernière mise à jour : Année académique 2025-2026 · ENSPD
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-xs font-semibold text-white bg-[#261c72] hover:bg-[#1b1353] shadow-xs cursor-pointer"
          >
            J'ai compris
          </button>
        </div>
      </div>
    </div>
  );
};
