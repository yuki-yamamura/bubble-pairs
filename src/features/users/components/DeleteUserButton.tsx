import Button from '@/components/Button';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import axios from 'axios';
import { useRouter } from 'next/router';
import { signOut } from 'next-auth/react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import useSWRMutation from 'swr/mutation';

import type { User } from '@prisma/client';
import type { AxiosError } from 'axios';

type Props = {
  user: User;
};

const DeleteUserButton = ({ user }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const { error, trigger, isMutating } = useSWRMutation<void, AxiosError>(
    `/api/users/${user.id}`,
    async (url: string) => {
      await axios.delete(url);
    },
  );

  const handleActionButtonClick = async () => {
    await trigger();
    if (error) {
      toast.error('ユーザーを削除できませんでした。');

      return;
    }

    await signOut();
    await router.push('/');
    router.reload();
  };
  const handleCancelButtonClick = () => {
    setIsOpen(false);
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">アカウントを削除</Button>
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

export default DeleteUserButton;
