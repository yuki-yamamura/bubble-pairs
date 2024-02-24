import Button from '@/components/Button';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';
import useSWRMutation from 'swr/mutation';

import type { ButtonProps } from '@/components/ui/button';

type Props = ButtonProps;

const DeleteButton = ({ className }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const { trigger, isMutating } = useSWRMutation(
    '/api/users/[userId]',
    async (url: string) => {
      await axios.delete(url);
    },
  );

  const handleActionButtonClick = async () => {
    await trigger();
    setIsOpen(false);
    await router.push('/');
  };
  const handleCancelButtonClick = () => {
    setIsOpen(false);
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" className={className}>
          アカウントを削除
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogDescription className="mb-8 mt-4 text-center">
          この操作は取り消せません。本当によろしいですか？
        </AlertDialogDescription>
        <div className="flex justify-end gap-x-4">
          <Button variant="outline" onClick={handleCancelButtonClick}>
            キャンセル
          </Button>
          <Button
            isBusy={isMutating}
            variant="destructive"
            onClick={handleActionButtonClick}
          >
            アカウントを削除
          </Button>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteButton;
