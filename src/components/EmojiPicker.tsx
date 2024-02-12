import Button from '@/components/Button';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { type EmojiClickData, EmojiStyle } from 'emoji-picker-react';
import dynamic from 'next/dynamic';
import { useState } from 'react';

const Picker = dynamic(() => import('emoji-picker-react'), { ssr: false });

type Props = {
  defaultUnicode: string;
  onEmojiClick: (emoji: EmojiClickData, event: MouseEvent) => void;
};

const EmojiPicker = ({ defaultUnicode, onEmojiClick }: Props) => {
  const [open, setOpen] = useState(false);

  const handleEmojiClick = (emoji: EmojiClickData, event: MouseEvent) => {
    onEmojiClick(emoji, event);
    setOpen(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="outline" size="sm">
          プロフィール画像を変更
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogDescription className="text-center">
            絵文字を選択してください。
          </AlertDialogDescription>
        </AlertDialogHeader>
        <Picker
          emojiStyle={EmojiStyle.TWITTER}
          skinTonesDisabled
          previewConfig={{
            defaultEmoji: defaultUnicode,
          }}
          onEmojiClick={handleEmojiClick}
          className="mx-auto w-full"
        />
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default EmojiPicker;
