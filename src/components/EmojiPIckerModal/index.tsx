import EmojiPicker from '@/components/EmojiPicker';
import Modal from '@/components/Modal';

import type { EmojiClickData } from 'emoji-picker-react';
import type { RefObject } from 'react';

type Props = {
  dialogRef: RefObject<HTMLDialogElement>;
  onEmojiClick: (emoji: EmojiClickData, event: MouseEvent) => void;
};

const EmojiPickerModal = ({ dialogRef, onEmojiClick }: Props) => {
  const handleEmojiClick = (emoji: EmojiClickData, event: MouseEvent) => {
    dialogRef.current?.close();
    onEmojiClick(emoji, event);
  };

  return (
    <Modal ref={dialogRef}>
      <EmojiPicker onEmojiClick={handleEmojiClick} />
    </Modal>
  );
};

export default EmojiPickerModal;
