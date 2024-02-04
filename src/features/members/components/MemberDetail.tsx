import Loading from '@/components/Loading';
import MemberForm from '@/features/members/components/MemberForm';
import axios from 'axios';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import useSWRMutation from 'swr/mutation';

import type { MemberUpdateSchemaType } from '@/features/members/validation';
import type { Member } from '@prisma/client';

type Props = {
  member: Member;
};

const MemberDetail = ({ member }: Props) => {
  const router = useRouter();
  const { trigger, isMutating } = useSWRMutation(
    `/api/members/${member.id}`,
    async (url: string, { arg }: { arg: MemberUpdateSchemaType }) => {
      await axios.put(url, arg);
    },
  );

  const handleSubmit = async (fieldValues: MemberUpdateSchemaType) => {
    try {
      await trigger(fieldValues);
      toast.success('メンバーを更新しました。');
      await router.push('/members');
    } catch {
      toast.error('メンバーを更新できませんでした。');
    }
  };

  if (isMutating) {
    return <Loading />;
  }

  return (
    <MemberForm
      defaultValues={member}
      submitButtonLabel="メンバーを更新"
      onSubmit={handleSubmit}
    />
  );
};

export default MemberDetail;
