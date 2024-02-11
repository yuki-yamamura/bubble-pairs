import Loading from '@/components/Loading';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { useRouter } from 'next/router';
import useSWRMutation from 'swr/mutation';

const UserDeleteButton = () => {
  const router = useRouter();

  const { trigger, isMutating } = useSWRMutation(
    // todo: get user id from session, and remove the user.
    `/api/users/guest`,
    async (url: string) => {
      await axios.delete(url);
    },
  );

  const handleActionButtonClick = async () => {
    await trigger();
    await router.push('/');
  };

  if (isMutating) {
    return <Loading />;
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">ユーザーを削除</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>ユーザーを削除</AlertDialogTitle>
          <AlertDialogDescription>
            <span>この操作は取り消せません。</span>
            <span>本当に実行しますか？</span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogCancel>キャンセル</AlertDialogCancel>
        <AlertDialogAction onClick={handleActionButtonClick}>
          ユーザーを削除
        </AlertDialogAction>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default UserDeleteButton;
