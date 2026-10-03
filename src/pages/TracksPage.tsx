import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TracksSection } from '../components/TracksSection';
import { useModal } from '../app/ModalContext';

export const TracksPage: React.FC = () => {
  const { openImage } = useModal();
  const navigate = useNavigate();

  return (
    <div className="pt-16 sm:pt-[72px]">
      <TracksSection
        onSelectTrackForProjects={() => navigate('/projets')}
        onImageClick={(url, title) => openImage(url, title)}
      />
    </div>
  );
};
