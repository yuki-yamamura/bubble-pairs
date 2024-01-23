import MemberSelect from './MemberSelect';
import Modal from '@/components/Modal';
import { useState } from 'react';

import type { Member } from '@prisma/client';

type Props = {
  members: Member[];
  onSaveButtonClick: (members: Member[]) => void;
  dialogRef: React.RefObject<HTMLDialogElement>;
};

const MemberSelectModal = ({
  members,
  onSaveButtonClick,
  dialogRef,
}: Props) => {
  const defaultMemberOptions = members.map((member) => ({
    member,
    isSelected: false,
  }));

  const [memberOptions, setMemberOptions] = useState(defaultMemberOptions);

  const updateMemberOptions = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const updatedMemberOptions = memberOptions.map((memberOption) => {
      if (e.target.value === memberOption.member.id.toString()) {
        memberOption.isSelected === !memberOption.isSelected;
      }

      return memberOption;
    });
    setMemberOptions(updatedMemberOptions);
  };

  const onCloseButtonClick = () => {
    if (!dialogRef.current) return;

    dialogRef.current.close();
  };

  return (
    <Modal ref={dialogRef}>
      <button type="button" onClick={onCloseButtonClick}>
        close modal
      </button>
      <button
        type="button"
        onClick={() => {
          const selectedMembers = memberOptions.map(
            (memberOption) => memberOption.member,
          );
          onSaveButtonClick(selectedMembers);
        }}
      >
        add members to the list
      </button>
      <MemberSelect
        memberOptions={memberOptions}
        updateMemberOptions={updateMemberOptions}
      />
    </Modal>
  );
};

export default MemberSelectModal;
