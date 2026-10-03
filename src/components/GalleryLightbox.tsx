import React, { useEffect } from 'react';
import { GalleryItem } from '../types';
import { CLUB_META } from '../data/clubData';
import { X, ChevronLeft, ChevronRight, Calendar, ExternalLink } from 'lucide-react';

interface GalleryLightboxProps {
  items: GalleryItem[];
  currentIndex: number | null;
  onClose: () => void;
  onNavigate: (newIndex: number) => void;
}

export const GalleryLightbox: React.FC<GalleryLightboxProps> = ({
  items,
  currentIndex,
  onClose,
  onNavigate
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (currentIndex === null) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onNavigate((currentIndex - 1 + items.length) % items.length);
      if (e.key === 'ArrowRight') onNavigate((currentIndex + 1) % items.length);
    };

    if (currentIndex !== null) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentIndex, items.length, onClose, onNavigate]);

  if (currentIndex === null || !items[currentIndex]) return null;

  const currentItem = items[currentIndex];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 sm:p-6"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Visionneuse de photos du club"
    >
      {/* Top Bar with counter and close */}
      <div className="absolute top-4 left-4 right-4 z-10 flex items-center justify-between text-white">
        <div className="text-xs font-mono text-slate-400">
          {currentIndex + 1} / {items.length}
        </div>
        <button
          onClick={onClose}
          className="p-2 rounded-xl text-slate-300 hover:text-white bg-slate-900/80 hover:bg-slate-800 transition-colors cursor-pointer"
          aria-label="Fermer la visionneuse"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onNavigate((currentIndex - 1 + items.length) % items.length);
        }}
        className="absolute left-3 sm:left-6 z-10 p-3 rounded-full bg-slate-900/70 hover:bg-slate-800 text-white transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 cursor-pointer"
        aria-label="Photo précédente"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onNavigate((currentIndex + 1) % items.length);
        }}
        className="absolute right-3 sm:right-6 z-10 p-3 rounded-full bg-slate-900/70 hover:bg-slate-800 text-white transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 cursor-pointer"
        aria-label="Photo suivante"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Main Image Container */}
      <div
        className="max-w-5xl max-h-[85vh] flex flex-col items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={currentItem.imageUrl}
          alt={currentItem.title}
          referrerPolicy="no-referrer"
          className="max-w-full max-h-[65vh] object-contain rounded-2xl shadow-2xl"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = "/images/photo1.jpg";
          }}
        />

        {/* Caption */}
        <div className="mt-4 text-center max-w-2xl px-4">
          <div className="flex items-center justify-center gap-3 text-xs text-[#ff7f00] mb-1">
            <span className="flex items-center gap-1 font-mono">
              <Calendar className="w-3.5 h-3.5" />
              {currentItem.date}
            </span>
            <span>·</span>
            <span className="uppercase tracking-wider font-mono text-[11px] text-slate-400">
              {currentItem.category}
            </span>
          </div>

          <h3 className="text-base sm:text-lg font-bold text-white mb-1">
            {currentItem.title}
          </h3>
          <p className="text-xs sm:text-sm text-slate-300">
            {currentItem.description}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2 mt-3">
            <a
              href={CLUB_META.socials.googleDrive}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <span>Voir dans Google Drive</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <a
              href={CLUB_META.socials.googlePhotos}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/20 text-[#ff7f00] transition-colors"
            >
              <span>Album Google Photos</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
