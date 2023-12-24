import LoadingModal from '@/components/LoadingModal';
import MemberForm from '@/features/members/components/MemberForm';
import axios from 'axios';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import useSWRMutation from 'swr/mutation';

import type { MemberSchema } from '@/features/members/validation';
import type { MemberResponseData } from '@/pages/api/member';
import type { Prisma } from '@prisma/client';

const NewMemberForm = () => {
  const router = useRouter();
  const fetcher = async (
    url: string,
    { arg }: { arg: Prisma.MemberCreateInput },
  ) => {
    const response = await axios.post<MemberResponseData>(url, arg);

    return response.data;
  };

  const { trigger, error, isMutating } = useSWRMutation<
    MemberResponseData,
    Error,
    '/api/member',
    Prisma.MemberCreateInput
  >('/api/member', fetcher);

  const notifySuccess = () => toast.success('メンバーを登録しました。');
  const notifyError = () => toast.error('メンバーの登録に失敗しました。');
  const handleSubmit = async (memberCreateInput: MemberSchema) => {
    await trigger({
      ...memberCreateInput,
      avatar: 'https://picsum.photos/200/300.jpg?random=1',
    });
    if (error) {
      notifyError();
    } else {
      notifySuccess();
      await router.push('/members');
    }
  };

  if (isMutating) {
    return <LoadingModal />;
  }

  return (
    <MemberForm
      submitButtonLabel="メンバーを追加する"
      submitMember={handleSubmit}
    />
  );
};

export default NewMemberForm;
