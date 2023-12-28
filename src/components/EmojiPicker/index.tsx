import { EmojiStyle } from 'emoji-picker-react';
import dynamic from 'next/dynamic';

import type { EmojiClickData } from 'emoji-picker-react';

const Picker = dynamic(() => import('emoji-picker-react'), { ssr: false });

type Props = {
  onEmojiClick: (emoji: EmojiClickData, e: MouseEvent) => void;
};

const EmojiPicker = ({ onEmojiClick }: Props) => (
  <Picker
    emojiStyle={EmojiStyle.TWITTER}
    skinTonesDisabled
    previewConfig={{
      showPreview: false,
    }}
    onEmojiClick={onEmojiClick}
  />
);

export default EmojiPicker;
