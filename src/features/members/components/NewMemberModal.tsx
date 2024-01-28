import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogFooter,
  AlertDialogHeader,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import NewMemberForm from '@/features/members/components/NewMemberForm';
import {
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@radix-ui/react-alert-dialog';

const NewMemberModal = () => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button>メンバー追加</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>メンバー追加</AlertDialogTitle>
        </AlertDialogHeader>
        <NewMemberForm />
        <AlertDialogFooter>
          <AlertDialogCancel>キャンセル</AlertDialogCancel>
          <AlertDialogAction>メンバーを追加</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default NewMemberModal;
