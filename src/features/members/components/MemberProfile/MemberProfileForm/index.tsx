import LoadingModal from '@/components/LoadingModal';
import MemberForm from '@/features/members/components/MemberForm';
import axios from 'axios';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import useSWRMutation from 'swr/mutation';

import type { MemberFormSchema } from '@/features/members/validation';
import type { Member } from '@prisma/client';

type Props = {
  member: Member;
};

const MemberProfileForm = ({ member }: Props) => {
  const router = useRouter();
  const { trigger, isMutating } = useSWRMutation(
    `/api/members/${member.id}`,
    async (url: string, { arg }: { arg: MemberFormSchema }) => {
      await axios.put(url, arg);
    },
  );

  const notifySuccess = () => toast.success('メンバーの情報を更新しました。');
  const notifyError = () =>
    toast.error('メンバーの情報を更新できませんでした。');

  const submitMember = (fieldValues: MemberFormSchema) => {
    trigger(fieldValues)
      .then(async () => {
        notifySuccess();
        await router.push('/members');
      })
      .catch(() => notifyError());
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
