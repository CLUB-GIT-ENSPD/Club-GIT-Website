import React, { useState, useEffect } from 'react';
import { GALLERY_DATA, CLUB_META } from '../data/clubData';
import { GalleryItem } from '../types';
import { GalleryLightbox } from './GalleryLightbox';
import { resolveGoogleImageUrl } from '../utils/googleStorageHelper';
import { Maximize2, Calendar, FolderGit2, Image as ImageIcon, ExternalLink, Plus, Check, Cloud } from 'lucide-react';

const STORAGE_KEY = 'club_git_drive_gallery_items';

export const GallerySection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'workshops' | 'ceremonies' | 'maintenance' | 'hackathons'>('all');
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>(GALLERY_DATA);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newPhotoUrl, setNewPhotoUrl] = useState('');
  const [newPhotoTitle, setNewPhotoTitle] = useState('');
  const [newPhotoCategory, setNewPhotoCategory] = useState<'workshops' | 'ceremonies' | 'maintenance' | 'hackathons'>('workshops');
  const [syncSuccess, setSyncSuccess] = useState(false);

  // Load any saved Drive / Google Photos items from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setGalleryItems([...parsed, ...GALLERY_DATA]);
        }
      }
    } catch {
      // fallback to GALLERY_DATA
    }
  }, []);

  const handleAddDrivePhoto = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPhotoUrl.trim() || !newPhotoTitle.trim()) return;

    const resolved = resolveGoogleImageUrl(newPhotoUrl);
    const newItem: GalleryItem = {
      id: 'drive-' + Date.now(),
      title: newPhotoTitle.trim(),
      category: newPhotoCategory,
      date: 'Ajout Google Drive',
      imageUrl: resolved,
      description: 'Image synchronisée directement depuis Google Drive / Google Photos.',
      tags: ['GoogleDrive', 'Cloud', newPhotoCategory]
    };

    const updated = [newItem, ...galleryItems];
    setGalleryItems(updated);

    try {
      const customItems = updated.filter(item => item.id.startsWith('drive-'));
      localStorage.setItem(STORAGE_KEY, JSON.stringify(customItems));
    } catch {
      // Ignore local storage quota
    }

    setNewPhotoUrl('');
    setNewPhotoTitle('');
    setShowAddModal(false);
    setSyncSuccess(true);
    setTimeout(() => setSyncSuccess(false), 4000);
  };

  const categories = [
    { id: 'all', label: 'Toutes les photos' },
    { id: 'workshops', label: 'Ateliers & Formations' },
    { id: 'ceremonies', label: 'Cérémonies & Promotions' },
    { id: 'maintenance', label: 'Clinique Maintenance' },
    { id: 'hackathons', label: 'Hackathons' },
  ];

  const filteredPhotos = selectedCategory === 'all'
    ? galleryItems
    : galleryItems.filter((p) => p.category === selectedCategory);

  return (
    <section id="galerie" className="py-16 sm:py-24 border-b border-slate-200/80 bg-slate-50/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header: Clean title, no kicker subtitle on top */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-8 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-2xl sm:text-4xl font-bold text-slate-900 tracking-tight leading-tight">
              La vie du Club GIT en images.
            </h2>
            <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
              Marathons de programmation, cliniques de dépannage informatique, soutenances d'ingénieurs et ateliers du samedi synchronisés avec Google Drive & Google Photos.
            </p>
          </div>

          {/* Cloud Storage & Album Links (Google Drive & Google Photos) */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setShowAddModal(true)}
              className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-[#261c72] bg-white border border-[#261c72]/30 hover:border-[#261c72] hover:bg-slate-50 shadow-xs transition-all cursor-pointer"
              title="Lier une photo ou un lien Google Drive"
            >
              <Plus className="w-4 h-4 text-[#ff7f00]" />
              <span>Lier une photo Drive</span>
            </button>

            <a
              href={CLUB_META.socials.googlePhotos}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-800 bg-white border border-slate-300 hover:border-[#ff7f00] hover:text-[#ff7f00] hover:bg-orange-50/50 shadow-xs transition-all"
              title="Consulter l'album officiel sur Google Photos"
            >
              <ImageIcon className="w-4 h-4 text-[#ff7f00]" />
              <span>Album Google Photos</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
            </a>

            <a
              href={CLUB_META.socials.googleDrive}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-white bg-[#261c72] hover:bg-[#1b1353] shadow-md shadow-[#261c72]/20 transition-all"
              title="Accéder au dossier Google Drive avec toutes les photos haute résolution"
            >
              <FolderGit2 className="w-4 h-4" />
              <span>Dossier Google Drive</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-80" />
            </a>
          </div>
        </div>

        {/* Sync feedback notification */}
        {syncSuccess && (
          <div className="mb-6 p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2 animate-in fade-in">
            <Check className="w-4 h-4 text-emerald-600" />
            <span>Votre image Google Drive a été ajoutée et s'affiche désormais directement dans la galerie !</span>
          </div>
        )}

        {/* Filter segment tabs */}
        <div className="flex overflow-x-auto pb-2 gap-1.5 mb-8 scrollbar-none">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id as any)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-[#261c72] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 bg-white border border-slate-200'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {filteredPhotos.map((photo, index) => {
            const resolvedUrl = resolveGoogleImageUrl(photo.imageUrl);
            return (
              <div
                key={photo.id}
                onClick={() => setActivePhotoIndex(index)}
                className="group relative rounded-3xl overflow-hidden bg-white border border-slate-200 hover:border-[#261c72]/60 hover:shadow-lg cursor-pointer shadow-xs transition-all duration-300 aspect-[4/3]"
              >
                <img
                  src={resolvedUrl}
                  alt={photo.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = "/images/photo1.jpg";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent opacity-85 group-hover:opacity-95 transition-opacity" />

                {/* Hover maximize icon */}
                <div className="absolute top-3 right-3 p-2 rounded-xl bg-white/85 backdrop-blur-xs text-slate-800 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm">
                  <Maximize2 className="w-4 h-4" />
                </div>

                {/* Cloud sync indicator if from Drive */}
                {photo.id.startsWith('drive-') && (
                  <div className="absolute top-3 left-3 px-2 py-0.5 rounded-md bg-[#261c72]/80 backdrop-blur-xs text-white text-[10px] font-mono flex items-center gap-1">
                    <Cloud className="w-3 h-3 text-[#ff7f00]" />
                    <span>Drive</span>
                  </div>
                )}

                {/* Bottom Details */}
                <div className="absolute bottom-3 left-3 right-3 text-left">
                  <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#ff7f00] font-semibold mb-1">
                    <Calendar className="w-3 h-3" />
                    <span>{photo.date}</span>
                  </div>
                  <h3 className="text-xs sm:text-sm font-bold text-white line-clamp-1 leading-snug">
                    {photo.title}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>

        {/* Drive Info Footnote */}
        <div className="mt-8 p-4 rounded-2xl bg-white border border-slate-200 text-xs text-slate-600 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p>
            Vous disposez de photos ou vidéos du club ? Vous pouvez les synchroniser directement depuis votre dossier Google Drive ou Google Photos.
          </p>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowAddModal(true)}
              className="text-[#ff7f00] hover:underline font-semibold cursor-pointer"
            >
              + Ajouter un lien Drive
            </button>
            <span className="text-slate-300">·</span>
            <a
              href={CLUB_META.socials.googleDrive}
              target="_blank"
              rel="noreferrer"
              className="text-[#261c72] hover:text-[#ff7f00] font-semibold inline-flex items-center gap-1 shrink-0"
            >
              <span>Accéder au dossier complet</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      <GalleryLightbox
        items={filteredPhotos}
        currentIndex={activePhotoIndex}
        onClose={() => setActivePhotoIndex(null)}
        onNavigate={(newIndex) => setActivePhotoIndex(newIndex)}
      />

      {/* Add Drive Photo Modal Dialog */}
      {showAddModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in"
          onClick={() => setShowAddModal(false)}
        >
          <div
            className="w-full max-w-lg bg-white rounded-3xl border border-slate-200 p-6 shadow-2xl text-left"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-200 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <FolderGit2 className="w-5 h-5 text-[#261c72]" />
                <h3 className="font-bold text-base text-slate-900">
                  Lier une Photo Google Drive ou Google Photos
                </h3>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-700 p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddDrivePhoto} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Lien partagé de l'image (Google Drive ou Google Photos) <span className="text-red-500">*</span>
                </label>
                <input
                  type="url"
                  placeholder="https://drive.google.com/file/d/... ou https://photos.app.goo.gl/..."
                  value={newPhotoUrl}
                  onChange={(e) => setNewPhotoUrl(e.target.value)}
                  required
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-300 text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-[#261c72]"
                />
                <p className="text-[11px] text-slate-500 mt-1">
                  Les liens de partage Google Drive (lecture autorisée) sont automatiquement convertis en flux d'affichage direct.
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Titre de la photo <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Ex : Remise des prix du Marathon de Code 2026"
                  value={newPhotoTitle}
                  onChange={(e) => setNewPhotoTitle(e.target.value)}
                  required
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-300 text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-[#261c72]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Catégorie
                </label>
                <select
                  value={newPhotoCategory}
                  onChange={(e) => setNewPhotoCategory(e.target.value as any)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-300 text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-[#261c72]"
                >
                  <option value="workshops">Ateliers & Formations</option>
                  <option value="ceremonies">Cérémonies & Promotions</option>
                  <option value="maintenance">Clinique Maintenance</option>
                  <option value="hackathons">Hackathons</option>
                </select>
              </div>

              <div className="pt-3 border-t border-slate-200 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 cursor-pointer"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-semibold text-white bg-[#261c72] hover:bg-[#1b1353] shadow-xs cursor-pointer"
                >
                  Ajouter à la Galerie
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
