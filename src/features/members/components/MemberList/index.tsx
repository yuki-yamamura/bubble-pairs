import Button from '@/components/Button';
import EmptyState from '@/components/EmptyState';
import Loading from '@/components/Loading';
import { Separator } from '@/components/ui/separator';
import MemberTable from '@/features/members/components/MemberTable';
import { useMembers } from '@/features/members/hooks/useMembers';
import axios from 'axios';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';

import type { Member } from '@prisma/client';

const MemberList = () => {
  const router = useRouter();
  const { members, isLoading, mutate } = useMembers();

  const handleNewMemberButtonClick = () => {
    void router.push('/members/new');
  };

  const deleteMember = async (memberId: Member['id']) => {
    await axios.delete(`/api/members/${memberId}`);
    await mutate();
    toast.success('メンバーを削除しました。');
  };
  const openMemberDetail = (memberId: Member['id']) => {
    void router.push(`/members/${memberId}`);
  };

  return (
    <div>
      {/* <Breadcrumbs /> */}
      <Separator className="my-2" />
      <div className="flex justify-end">
        <Button
          type="button"
          onClick={handleNewMemberButtonClick}
          variant="outline"
          className="h-10 w-10 rounded-full p-0"
        >
          <Plus size={16} className="text-slate-400" />
        </Button>
      </div>
      {isLoading ? (
        <Loading text="メンバーを読み込んでいます..." />
      ) : members?.length === 0 ? (
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

export default MemberList;
