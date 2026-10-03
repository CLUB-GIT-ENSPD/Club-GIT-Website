import React from 'react';
import { AboutSection } from '../components/AboutSection';
import { DepartmentHeadSection } from '../components/DepartmentHeadSection';
import { PartnersSection } from '../components/PartnersSection';
import { useModal } from '../app/ModalContext';

export const ClubPage: React.FC = () => {
  const { openImage } = useModal();

  return (
    <div className="pt-16 sm:pt-[72px]">
      <AboutSection onImageClick={(url, title) => openImage(url, title)} />
      <DepartmentHeadSection onImageClick={(url, title) => openImage(url, title)} />
      <PartnersSection onImageClick={(url, title) => openImage(url, title)} />
    </div>
  );
};
