import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, Wrench, UserPlus } from 'lucide-react';
import { useModal } from '../app/ModalContext';

const navLinks = [
  { to: '/', label: 'Accueil', end: true },
  { to: '/club', label: 'Le Club', end: false },
  { to: '/filieres', label: 'Filières', end: false },
  { to: '/projets', label: 'Projets', end: false },
  { to: '/bureau', label: 'Bureau', end: false },
  { to: '/services', label: 'Services', end: false },
  { to: '/galerie', label: 'Galerie', end: false },
];

export const Navbar: React.FC = () => {
  const { openServiceModal, openJoinModal } = useModal();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-200 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs'
          : 'bg-white/85 backdrop-blur-xs border-b border-slate-200/60'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          {/* Zone 1: Brand with authentic club logo */}
          <Link
            to="/"
            className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#261c72] rounded-lg"
            aria-label="Accueil Club GIT ENSPD"
          >
            <div className="h-10 sm:h-11 flex items-center justify-center">
              <img
                src="/images/logo-version-2.png"
                alt="Logo Club GIT"
                className="h-9 sm:h-10 w-auto object-contain transition-transform group-hover:scale-105"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = "/images/logo_couleur.png";
                }}
              />
            </div>
            <span className="font-display font-bold text-lg sm:text-xl tracking-tight text-slate-900 group-hover:text-[#261c72] transition-colors">
              <span className="text-[#261c72]">Club GIT</span> <span className="text-[#ff7f00]">·</span> <span className="text-[#261c72]">ENSPD</span>
            </span>
          </Link>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden md:flex items-center gap-5 lg:gap-7 text-sm font-medium text-slate-600">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                className={({ isActive }) =>
                  `relative py-1 whitespace-nowrap transition-colors hover:text-[#261c72] ${
                    isActive ? 'text-[#261c72] font-semibold' : 'text-slate-600'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {link.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#ff7f00] rounded-full" />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Zone 3: Primary Actions (#261c72 & #ff7f00) */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={() => openServiceModal()}
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-[#261c72] bg-white border border-[#261c72]/30 rounded-xl hover:bg-[#261c72]/5 hover:border-[#261c72] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#261c72] whitespace-nowrap cursor-pointer shadow-xs"
            >
              <Wrench className="w-3.5 h-3.5 text-[#261c72]" />
              <span>Demande Maintenance</span>
            </button>

            <button
              onClick={openJoinModal}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-[#ff7f00] rounded-xl hover:bg-[#e67200] shadow-sm shadow-[#ff7f00]/30 transition-all active:scale-98 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ff7f00] whitespace-nowrap cursor-pointer"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>Rejoindre</span>
            </button>
          </div>

          {/* Mobile Menu Trigger button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => openServiceModal()}
              className="sm:hidden min-w-[40px] min-h-[40px] flex items-center justify-center p-2 rounded-xl bg-orange-50 text-[#ff7f00] border border-orange-200 text-xs font-medium"
              aria-label="Demande de service"
            >
              <Wrench className="w-4 h-4" />
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="min-w-[44px] min-h-[44px] flex items-center justify-center p-2 rounded-xl text-slate-700 hover:text-[#261c72] hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#261c72]"
              aria-label="Menu principal"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-3 shadow-lg animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-blue-50 text-[#261c72] font-semibold'
                      : 'text-slate-700 hover:bg-slate-100 hover:text-[#261c72]'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-200 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openServiceModal();
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-[#261c72] bg-slate-50 border border-slate-300 rounded-xl hover:bg-slate-100"
            >
              <Wrench className="w-4 h-4 text-[#261c72]" />
              <span>Demande de Maintenance</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openJoinModal();
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-[#ff7f00] rounded-xl hover:bg-[#e67200] shadow-sm"
            >
              <UserPlus className="w-4 h-4" />
              <span>Postuler au Club GIT</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
