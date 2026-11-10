import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Home } from 'lucide-react';

interface ResultsHeaderProps {
  backTo?: string;
  backLabel?: string;
}

export const ResultsHeader: React.FC<ResultsHeaderProps> = ({
  backTo = '/',
  backLabel = "Retour à l'accueil",
}) => (
  <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 shadow-xs backdrop-blur-md print:hidden">
    <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:h-18 sm:px-6 lg:px-8">
      <Link to="/" className="flex min-w-0 items-center gap-3">
        <img
          src="/images/logo-version-2.png"
          alt="Logo Club GIT"
          className="h-8 w-auto shrink-0 object-contain"
          onError={(event) => {
            (event.currentTarget as HTMLImageElement).src = '/images/logo_couleur.png';
          }}
        />
        <span className="truncate font-display font-bold text-base text-slate-900">
          <span className="text-[#261c72]">Club GIT</span>{' '}
          <span className="text-[#ff7f00]">·</span>{' '}
          <span className="text-[#261c72]">ENSPD</span>
        </span>
      </Link>

      <div className="flex shrink-0 items-center gap-2">
        <Link
          to={backTo}
          className="inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-100 hover:text-[#261c72]"
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="hidden sm:inline">{backLabel}</span>
        </Link>
        <Link
          to="/rejoindre"
          className="inline-flex items-center gap-1.5 rounded-xl bg-[#261c72] px-3.5 py-2 text-xs font-semibold text-white shadow-xs transition-colors hover:bg-[#1b1353]"
        >
          <Home className="h-3.5 w-3.5" />
          <span>Candidater</span>
        </Link>
      </div>
    </div>
  </header>
);
