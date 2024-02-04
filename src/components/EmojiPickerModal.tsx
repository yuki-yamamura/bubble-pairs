import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { type EmojiClickData, EmojiStyle } from 'emoji-picker-react';
import dynamic from 'next/dynamic';
import { useState } from 'react';

const Picker = dynamic(() => import('emoji-picker-react'), { ssr: false });

type Props = {
  initialEmojiUnicode: string;
  onEmojiClick: (emoji: EmojiClickData, event: MouseEvent) => void;
};

const EmojiPickerModal = ({ initialEmojiUnicode, onEmojiClick }: Props) => {
  const [open, setOpen] = useState(false);
  const handleEmojiClick = (emoji: EmojiClickData, event: MouseEvent) => {
    onEmojiClick(emoji, event);
    setOpen(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="outline" size="sm" className="rounded-3xl">
          プロフィール画像を変更
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogDescription className="mx-auto w-full max-w-fit">
            プロフィール画像を選択してください。
          </AlertDialogDescription>
        </AlertDialogHeader>
        <Picker
          emojiStyle={EmojiStyle.TWITTER}
          skinTonesDisabled
          previewConfig={{
            defaultEmoji: initialEmojiUnicode,
            showPreview: false,
          }}
          onEmojiClick={handleEmojiClick}
          className="mx-auto w-full"
        />
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default EmojiPickerModal;
