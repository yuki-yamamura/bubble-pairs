import LoadingModal from '@/components/LoadingModal';
import MemberForm from '@/features/members/components/MemberForm';
import axios from 'axios';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import useSWRMutation from 'swr/mutation';

import type { MemberFormSchema } from '@/features/members/validation';
import type { PostResponseData } from '@/pages/api/members';
import type { Prisma } from '@prisma/client';

const NewMemberForm = () => {
  const router = useRouter();
  const defaultValues: MemberFormSchema = {
    name: '',
    kana: null,
    displayName: null,
    sex: 'MALE',
    level: 'BEGINNER',
    note: null,
  };
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

  const handleSubmit = async (memberSchema: MemberFormSchema) => {
    await trigger({
      ...memberSchema,
      avatar: 'https://picsum.photos/200/300.jpg?random=1',
    })
      .then(async () => {
        toast.success('メンバーを登録しました。');
        notifySuccess();
        await router.push('/members');
      })
      .catch(() => toast.error('メンバーの登録に失敗しました。'));
  };

  if (isMutating) {
    return <LoadingModal />;
  }

  return (
    <MemberForm
      defaultValues={defaultValues}
      submitButtonLabel="メンバーを追加する"
      submitMember={handleSubmit}
    />
  );
};

export default NewMemberForm;
