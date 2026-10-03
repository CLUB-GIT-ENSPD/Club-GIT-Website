import React, { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { ArrowUp } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { MobileBottomNav } from '../components/MobileBottomNav';
import { Footer } from '../components/Footer';

/** Scroll to top on every route change + legacy `#rejoindre` hash compat. */
const ScrollManager: React.FC = () => {
  const { pathname, hash } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (hash === '#rejoindre' || hash === '#join') {
      navigate('/rejoindre', { replace: true });
      return;
    }
    window.scrollTo(0, 0);
  }, [pathname, hash, navigate]);

  return null;
};

export const Layout: React.FC = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col selection:bg-[#ff7f00] selection:text-white">
      <ScrollManager />
      <Navbar />

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
      <MobileBottomNav />

      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="hidden md:flex fixed bottom-8 right-8 z-30 p-3 rounded-full bg-[#261c72] hover:bg-[#1b1353] text-white shadow-lg shadow-[#261c72]/30 border border-[#261c72]/40 transition-all duration-200 active:scale-95 cursor-pointer"
          aria-label="Retourner en haut de page"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};
