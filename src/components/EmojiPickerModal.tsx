import Emoji from '@/components/Emoji';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
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
        <div className="flex items-center gap-x-4">
          <button type="button">
            <Emoji unified={initialEmojiUnicode} size={48} />
          </button>
          <Button variant="outline" size="sm">
            プロフィール画像を変更
          </Button>
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>アバターを選択</AlertDialogTitle>
          <AlertDialogDescription>
            Emoji を選択してください。
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
        />
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default EmojiPickerModal;
