import Loading from '@/components/Loading';
import { Button } from '@/components/ui/button';
import MemberTable from '@/features/members/components/MemberTable';
import NoMemberFound from '@/features/members/components/NoMemberFound';
import { useMembers } from '@/features/members/hooks/useMembers';
import axios from 'axios';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';

import type { Member } from '@prisma/client';

const Members = () => {
  const router = useRouter();
  const { members, error, isLoading, mutate } = useMembers();

  const handleNewMemberButtonClick = () => {
    void router.push('/members/new');
  };

  const deleteMember = async (memberId: Member['id']) => {
    await axios.delete(`/api/members/${memberId}`);
    await mutate();
    toast.success('メンバーを削除しました。');
  };
  const openMemberDetail = async (memberId: Member['id']) => {
    await router.push(`/members/${memberId}`);
  };

  if (isLoading) {
    return <Loading />;
  }

  if (error || !members) {
    throw new Error();
  }

  return (
    <div className="relative h-full w-full">
      <div className="mb-8 flex gap-x-4">
        <Button type="button" onClick={handleNewMemberButtonClick}>
          メンバー登録
        </Button>
      </div>
      {members.length !== 0 ? (
        <MemberTable
          data={members}
          actions={{
            deleteMember,
            openMemberDetail,
          }}
        />
      ) : (
        <NoMemberFound />
      )}
    </div>
  );
};

export default Members;
