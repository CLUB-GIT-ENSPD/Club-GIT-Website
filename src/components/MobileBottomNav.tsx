import React from 'react';
import { Home, Layers, Terminal, Users, Wrench, Image as ImageIcon } from 'lucide-react';

interface MobileBottomNavProps {
  activeSection: string;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({ activeSection }) => {
  const tabs = [
    { id: 'hero', label: 'Accueil', icon: Home, href: '#' },
    { id: 'filieres', label: 'Filières', icon: Layers, href: '#filieres' },
    { id: 'projets', label: 'Projets', icon: Terminal, href: '#projets' },
    { id: 'bureau', label: 'Bureau', icon: Users, href: '#bureau' },
    { id: 'services', label: 'Services', icon: Wrench, href: '#services' },
    { id: 'galerie', label: 'Galerie', icon: ImageIcon, href: '#galerie' },
  ];

  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-slate-200 px-2 py-1 shadow-lg"
      aria-label="Navigation mobile principale"
    >
      <div className="grid grid-cols-6 items-center justify-items-center h-14">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeSection === tab.id;
          return (
            <a
              key={tab.id}
              href={tab.href}
              className={`flex flex-col items-center justify-center min-w-[44px] min-h-[44px] px-1 rounded-xl transition-colors ${
                isActive ? 'text-[#261c72] font-semibold' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <div className="relative">
                <Icon className={`w-4 h-4 transition-transform ${isActive ? 'scale-110 text-[#261c72]' : ''}`} />
                {isActive && (
                  <span className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-[#ff7f00] rounded-full" />
                )}
              </div>
              <span className="text-[10px] tracking-tight mt-1 truncate max-w-[48px] text-center">
                {tab.label}
              </span>
            </a>
          );
        })}
      </div>
    </nav>
  );
};
