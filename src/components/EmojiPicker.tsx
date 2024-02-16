import Button from '@/components/Button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from '@/components/ui/dialog';
import { type EmojiClickData, EmojiStyle } from 'emoji-picker-react';
import dynamic from 'next/dynamic';
import { useState } from 'react';

const Picker = dynamic(() => import('emoji-picker-react'), { ssr: false });

type Props = {
  initialUnicode: string;
  onEmojiClick: (emoji: EmojiClickData, event: MouseEvent) => void;
};

const EmojiPicker = ({ initialUnicode, onEmojiClick }: Props) => {
  const [open, setOpen] = useState(false);

  const handleEmojiClick = (emoji: EmojiClickData, event: MouseEvent) => {
    onEmojiClick(emoji, event);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          プロフィール画像を変更
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogDescription className="text-center">
            絵文字を選択してください。
          </DialogDescription>
        </DialogHeader>
        <Picker
          emojiStyle={EmojiStyle.TWITTER}
          skinTonesDisabled
          previewConfig={{
            defaultEmoji: initialUnicode,
          }}
          onEmojiClick={handleEmojiClick}
          className="mx-auto w-full"
        />
      </DialogContent>
    </Dialog>
  );
};

export default EmojiPicker;
