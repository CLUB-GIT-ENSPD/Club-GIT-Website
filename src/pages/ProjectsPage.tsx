import React, { useState } from 'react';
import { ProjectsSection } from '../components/ProjectsSection';
import { ProjectDetailModal } from '../components/ProjectDetailModal';
import { Project } from '../types';
import { useModal } from '../app/ModalContext';

export const ProjectsPage: React.FC = () => {
  const { openImage } = useModal();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <div className="pt-16 sm:pt-[72px]">
      <ProjectsSection
        onSelectProject={(project) => setSelectedProject(project)}
        onImageClick={(url, title) => openImage(url, title)}
      />

      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onImageClick={(url, title) => openImage(url, title)}
      />
    </div>
  );
};
