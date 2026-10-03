import React, { useState } from 'react';
import { BureauSection } from '../components/BureauSection';
import { BureauMemberModal } from '../components/BureauMemberModal';
import { BureauMember } from '../types';
import { useModal } from '../app/ModalContext';

export const BureauPage: React.FC = () => {
  const { openImage } = useModal();
  const [selectedMember, setSelectedMember] = useState<BureauMember | null>(null);

  return (
    <div className="pt-16 sm:pt-[72px]">
      <BureauSection onSelectMember={(member) => setSelectedMember(member)} />

      <BureauMemberModal
        member={selectedMember}
        onClose={() => setSelectedMember(null)}
        onImageClick={(url, title) => openImage(url, title)}
      />
    </div>
  );
};
