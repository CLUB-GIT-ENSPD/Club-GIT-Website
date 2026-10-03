import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { MobileBottomNav } from './components/MobileBottomNav';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { DepartmentHeadSection } from './components/DepartmentHeadSection';
import { PartnersSection } from './components/PartnersSection';
import { TracksSection } from './components/TracksSection';
import { ProjectsSection } from './components/ProjectsSection';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { BureauSection } from './components/BureauSection';
import { BureauMemberModal } from './components/BureauMemberModal';
import { ServicesSection } from './components/ServicesSection';
import { ServiceRequestModal } from './components/ServiceRequestModal';
import { GallerySection } from './components/GallerySection';
import { ImageModal } from './components/ImageModal';
import { PrivacyPolicyModal } from './components/PrivacyPolicyModal';
import { Footer } from './components/Footer';
import { JoinPage } from './pages/JoinPage';
import { Project, BureauMember } from './types';
import { ArrowUp } from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState<'home' | 'join'>('home');
  const [activeSection, setActiveSection] = useState('hero');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedBureauMember, setSelectedBureauMember] = useState<BureauMember | null>(null);
  const [previewImage, setPreviewImage] = useState<{ url: string; title?: string } | null>(null);
  const [serviceModalOpen, setServiceModalOpen] = useState(false);
  const [selectedServiceTitle, setSelectedServiceTitle] = useState<string | undefined>(undefined);
  const [privacyModalOpen, setPrivacyModalOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Sync hash routing (e.g. #rejoindre)
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#rejoindre' || window.location.hash === '#join') {
        setCurrentView('join');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setCurrentView('home');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Active section scroll spy (Home page only)
  useEffect(() => {
    if (currentView !== 'home') return;

    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);

      const sections = ['hero', 'about', 'departement', 'partenaires', 'filieres', 'projets', 'bureau', 'services', 'galerie'];
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentView]);

  const navigateToJoin = () => {
    window.location.hash = '#rejoindre';
    setCurrentView('join');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToHome = () => {
    window.location.hash = '';
    setCurrentView('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenServiceModal = (serviceTitle?: string) => {
    setSelectedServiceTitle(serviceTitle);
    setServiceModalOpen(true);
  };

  const handleImageClick = (url: string, title?: string) => {
    setPreviewImage({ url, title });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // If user navigated to the dedicated Join Page
  if (currentView === 'join') {
    return <JoinPage onBackToHome={navigateToHome} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col selection:bg-[#ff7f00] selection:text-white">
      {/* Top Navigation Bar (3-Zone Contract) */}
      <Navbar
        onOpenServiceModal={handleOpenServiceModal}
        onOpenJoinModal={navigateToJoin}
        activeSection={activeSection}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        <Hero
          onOpenServiceModal={() => handleOpenServiceModal()}
          onOpenJoinModal={navigateToJoin}
          onImageClick={handleImageClick}
        />

        <AboutSection onImageClick={handleImageClick} />

        <DepartmentHeadSection onImageClick={handleImageClick} />

        <PartnersSection onImageClick={handleImageClick} />

        <TracksSection
          onSelectTrackForProjects={(trackId) => {
            const el = document.getElementById('projets');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          onImageClick={handleImageClick}
        />

        <ProjectsSection
          onSelectProject={(project) => setSelectedProject(project)}
          onImageClick={handleImageClick}
        />

        <BureauSection
          onSelectMember={(member) => setSelectedBureauMember(member)}
        />

        <ServicesSection
          onOpenServiceModal={(title) => handleOpenServiceModal(title)}
        />

        <GallerySection />
      </main>

      {/* Footer */}
      <Footer
        onOpenJoinModal={navigateToJoin}
        onOpenServiceModal={() => handleOpenServiceModal()}
        onOpenPrivacyModal={() => setPrivacyModalOpen(true)}
      />

      {/* Mobile Ergonomic Bottom Tab Navigation */}
      <MobileBottomNav activeSection={activeSection} />

      {/* Quick Scroll To Top Button (Desktop) */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="hidden md:flex fixed bottom-8 right-8 z-30 p-3 rounded-full bg-[#261c72] hover:bg-[#1b1353] text-white shadow-lg shadow-[#261c72]/30 border border-[#261c72]/40 transition-all duration-200 active:scale-95 cursor-pointer"
          aria-label="Retourner en haut de page"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}

      {/* Interactive Project Detail Modal */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onImageClick={handleImageClick}
      />

      {/* Bureau Member Presentation Sheet Modal */}
      <BureauMemberModal
        member={selectedBureauMember}
        onClose={() => setSelectedBureauMember(null)}
        onImageClick={handleImageClick}
      />

      {/* Global Image Zoom Modal */}
      <ImageModal
        imageUrl={previewImage?.url || null}
        title={previewImage?.title}
        onClose={() => setPreviewImage(null)}
      />

      {/* Service Request Modal */}
      <ServiceRequestModal
        isOpen={serviceModalOpen}
        onClose={() => {
          setServiceModalOpen(false);
          setSelectedServiceTitle(undefined);
        }}
        defaultService={selectedServiceTitle}
      />

      {/* Privacy Policy Modal */}
      <PrivacyPolicyModal
        isOpen={privacyModalOpen}
        onClose={() => setPrivacyModalOpen(false)}
      />
    </div>
  );
}
