import Button from '@/components/Button';
import Loading from '@/components/Loading';
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

import type { User } from '@prisma/client';

type Props = {
  user: User;
};

const DeleteUserButton = ({ user }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const { trigger, isMutating } = useSWRMutation(
    `/api/users/${user.id}`,
    async (url: string) => {
      await axios.delete(url);
    },
  );

  const handleActionButtonClick = async () => {
    await trigger();
    await router.push('/');
    router.reload();
  };
  const handleCancelButtonClick = () => {
    setIsOpen(false);
  };

  if (isMutating) {
    <Loading />;
  }

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
          <Button variant="destructive" onClick={handleActionButtonClick}>
            アカウントを削除
          </Button>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteUserButton;