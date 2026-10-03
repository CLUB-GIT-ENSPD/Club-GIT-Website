import React from 'react';
import { ServicesSection } from '../components/ServicesSection';
import { useModal } from '../app/ModalContext';

export const ServicesPage: React.FC = () => {
  const { openServiceModal } = useModal();

  return (
    <div className="pt-16 sm:pt-[72px]">
      <ServicesSection onOpenServiceModal={(title) => openServiceModal(title)} />
    </div>
  );
};
