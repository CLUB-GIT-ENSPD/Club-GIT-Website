import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ImageModal } from '../components/ImageModal';
import { PrivacyPolicyModal } from '../components/PrivacyPolicyModal';
import { ServiceRequestModal } from '../components/ServiceRequestModal';

interface PreviewImage {
  url: string;
  title?: string;
}

interface ModalContextValue {
  openServiceModal: (serviceTitle?: string) => void;
  openJoinModal: () => void;
  openPrivacyModal: () => void;
  openImage: (url: string, title?: string) => void;
}

const ModalContext = createContext<ModalContextValue | null>(null);

export function useModal(): ModalContextValue {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error('useModal must be used inside <ModalProvider>');
  return ctx;
}

export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const [serviceModalOpen, setServiceModalOpen] = useState(false);
  const [selectedServiceTitle, setSelectedServiceTitle] = useState<string | undefined>(undefined);
  const [privacyModalOpen, setPrivacyModalOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState<PreviewImage | null>(null);

  const openServiceModal = useCallback((serviceTitle?: string) => {
    setSelectedServiceTitle(serviceTitle);
    setServiceModalOpen(true);
  }, []);

  const openJoinModal = useCallback(() => {
    navigate('/rejoindre');
  }, [navigate]);

  const openPrivacyModal = useCallback(() => {
    setPrivacyModalOpen(true);
  }, []);

  const openImage = useCallback((url: string, title?: string) => {
    setPreviewImage({ url, title });
  }, []);

  const value = useMemo(
    () => ({ openServiceModal, openJoinModal, openPrivacyModal, openImage }),
    [openServiceModal, openJoinModal, openPrivacyModal, openImage]
  );

  return (
    <ModalContext.Provider value={value}>
      {children}

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
    </ModalContext.Provider>
  );
};
