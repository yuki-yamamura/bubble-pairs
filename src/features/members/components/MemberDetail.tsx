import MemberForm from '@/features/members/components/MemberForm';
import axios from 'axios';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import useSWRMutation from 'swr/mutation';

import type { MemberUpdateSchema } from '@/features/members/validation';
import type { Member } from '@prisma/client';

type Props = {
  member: Member;
};

const MemberDetail = ({ member }: Props) => {
  const router = useRouter();
  const { trigger, isMutating } = useSWRMutation(
    `/api/members/${member.id}`,
    async (url: string, { arg }: { arg: MemberUpdateSchema }) => {
      await axios.put(url, arg);
    },
  );

  const handleSubmit = async (fieldValues: MemberUpdateSchema) => {
    try {
      await trigger(fieldValues);
      await router.push('/members');
      toast.success('メンバーを更新しました。');
    } catch {
      toast.error('メンバーを更新できませんでした。');
    }
  };

  return (
    <MemberForm
      defaultValues={member}
      buttonLabel="変更を保存"
      buttonVariant="outline"
      isSubmitting={isMutating}
      onSubmit={handleSubmit}
    />
  );
};

export default MemberDetail;
