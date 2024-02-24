import EmptyState from '@/components/EmptyState';
import Loading from '@/components/Loading';
import PlusButton from '@/components/PlusButton';
import MemberTable from '@/features/members/components/MemberTable';
import { useMembers } from '@/features/members/hooks/useMembers';
import axios from 'axios';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';

import type { Member } from '@prisma/client';

const Members = () => {
  const router = useRouter();
  const { members, isLoading, mutate } = useMembers();

  const handlePlusButtonClick = () => {
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
    return <Loading text="メンバーを読み込んでいます..." />;
  }

  return (
    <div>
      <PlusButton onClick={handlePlusButtonClick} />
      {members?.length === 0 ? (
        <EmptyState src="/images/exploring.png" alt="exploring">
          <div className="text-center leading-7">
            <p>まずはメンバーを登録しましょう。</p>
            <p>右上の「+」ボタンを押してください。</p>
          </div>
        </EmptyState>
      ) : (
        <MemberTable
          data={members ?? []}
          actions={{
            deleteMember,
            openMemberDetail,
          }}
        />
      )}
    </div>
  );
};

export default Members;
