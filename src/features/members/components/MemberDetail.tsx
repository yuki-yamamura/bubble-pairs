import { useMembers } from '../hooks/useMembers';
import LoadingModal from '@/components/LoadingModal';
import { Button } from '@/components/ui/button';
import MemberForm from '@/features/members/components/MemberForm';
import axios from 'axios';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import useSWRMutation from 'swr/mutation';

import type { MemberUpdateSchemaType } from '@/features/members/validation';
import type { Member } from '@prisma/client';

const MemberDetail = () => {
  const router = useRouter();
  const memberId = router.query.id as string;
  const { members, isLoading } = useMembers();
  const member = members.find((member) => member.id === memberId) as Member;
  const { trigger: updateTrigger, isMutating: isUpdating } = useSWRMutation(
    `/api/members/${memberId}`,
    async (url: string, { arg }: { arg: MemberUpdateSchemaType }) => {
      await axios.put(url, arg);
    },
  );
  const { trigger: deleteTrigger, isMutating: isDeleting } = useSWRMutation(
    `/api/members/${memberId}`,
    async (url: string) => {
      await axios.delete(url);
    },
  );

  const handleSubmit = (fieldValues: MemberUpdateSchemaType) => {
    updateTrigger(fieldValues)
      .then(() => {
        toast.success('メンバーを更新しました。');
        void router.push('/members');
      })
      .catch(() => toast.error('メンバーを更新できませんでした。'));
  };
  const handleDeleteButtonClick = () => {
    deleteTrigger()
      .then(() => {
        toast.success('メンバーを削除しました。');
        void router.push('/members');
      })
      .catch(() => toast.error('メンバーを削除できませんでした。'));
  };

  if (isLoading || isUpdating || isDeleting) {
    return <LoadingModal />;
  }

  return (
    <div>
      <MemberForm defaultValues={member} onSubmit={handleSubmit} />
      <Button variant="destructive" onClick={handleDeleteButtonClick}>
        メンバーを削除
      </Button>
    </div>
  );
};

export default MemberDetail;
