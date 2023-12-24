import LoadingModal from '@/components/LoadingModal';
import MemberForm from '@/features/members/components/MemberForm';
import axios from 'axios';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import useSWRMutation from 'swr/mutation';

import type { MemberSchema } from '@/features/members/validation';
import type { PostResponseData } from '@/pages/api/members';
import type { Prisma } from '@prisma/client';

const NewMemberForm = () => {
  const router = useRouter();
  const fetcher = async (
    url: string,
    { arg }: { arg: Prisma.MemberCreateInput },
  ) => {
    const response = await axios.post<PostResponseData>(url, arg);

    return response.data;
  };

  const { trigger, isMutating } = useSWRMutation<
    PostResponseData,
    Error,
    '/api/members',
    Prisma.MemberCreateInput
  >('/api/members', fetcher);

  const notifySuccess = () => toast.success('メンバーを登録しました。');
  const notifyError = () => toast.error('メンバーの登録に失敗しました。');
  const handleSubmit = async (memberSchema: MemberSchema) => {
    await trigger({
      ...memberSchema,
      avatar: 'https://picsum.photos/200/300.jpg?random=1',
    })
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
      submitButtonLabel="メンバーを追加する"
      submitMember={handleSubmit}
    />
  );
};

export default NewMemberForm;
