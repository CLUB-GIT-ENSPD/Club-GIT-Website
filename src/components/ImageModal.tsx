import React, { useEffect } from 'react';
import { X, ZoomIn } from 'lucide-react';

interface ImageModalProps {
  imageUrl: string | null;
  title?: string;
  onClose: () => void;
}

export const ImageModal: React.FC<ImageModalProps> = ({ imageUrl, title, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (imageUrl) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [imageUrl, onClose]);

  if (!imageUrl) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Image agrandie"
    >
      <div
        className="relative max-w-5xl max-h-[90vh] flex flex-col items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Control Bar */}
        <div className="w-full flex items-center justify-between text-white pb-3 px-2">
          <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-200 truncate pr-4">
            <ZoomIn className="w-4 h-4 text-[#ff7f00] shrink-0" />
            <span className="truncate">{title || "Agrandissement photo"}</span>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer shrink-0"
            aria-label="Fermer l'image"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Enlarged Image */}
        <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-black border border-white/10 flex items-center justify-center">
          <img
            src={imageUrl}
            alt={title || "Image agrandie"}
            className="max-w-full max-h-[78vh] object-contain"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = "/images/photo1.jpg";
            }}
          />
        </div>

        {/* Caption */}
        {title && (
          <p className="mt-2 text-xs text-slate-300 text-center px-4">
            {title}
          </p>
        )}
      </div>
    </div>
  );
};
