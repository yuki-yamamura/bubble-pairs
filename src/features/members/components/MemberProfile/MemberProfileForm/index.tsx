import LoadingModal from '@/components/LoadingModal';
import MemberForm from '@/features/members/components/BaseMemberForm';
import { MemberForm } from '@/features/members/validation';
import axios from 'axios';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import useSWRMutation from 'swr/mutation';

import type { Member } from '@prisma/client';

type Props = {
  member: Member;
};

const MemberProfileForm = ({ member }: Props) => {
  const router = useRouter();
  const { trigger, isMutating } = useSWRMutation(
    `/api/members/${member.id}`,
    async (url: string, { arg }: { arg: MemberForm }) => {
      await axios.put(url, arg);
    },
  );

  const submitMember = (fieldValues: MemberForm) => {
    trigger(fieldValues)
      .then(() => {
        toast.success('メンバーを更新しました。');
        void router.push('/members');
      })
      .catch(() => toast.error('メンバーを更新できませんでした。'));
  };

  if (isMutating) {
    return <LoadingModal />;
  }

  return (
    <MemberForm
      defaultValues={member}
      submitButtonLabel={'変更を保存する'}
      submitMember={submitMember}
    />
  );
};

export default MemberProfileForm;
