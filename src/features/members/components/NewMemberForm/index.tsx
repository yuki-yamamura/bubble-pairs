import LoadingModal from '@/components/LoadingModal';
import MemberForm from '@/features/members/components/MemberForm';
import { useMembers } from '@/features/members/hooks/useMembers';
import { request } from '@/lib/axios';
import { useRouter } from 'next/router';
import { useState } from 'react';
import toast from 'react-hot-toast';

import type { MemberSchema } from '@/features/members/validation';
import type { MemberResponseData } from '@/pages/api/member';
import type { AxiosRequestConfig } from 'axios';

const NewMemberForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { members, mutate } = useMembers();

  const notifySuccess = () => toast.success('メンバーを登録しました。');
  const notifyError = () => toast.error('メンバーの登録に失敗しました。');
  const handleSubmit = async (memberCreateInput: MemberSchema) => {
    setIsLoading(true);

    const axiosRequestConfig: AxiosRequestConfig = {
      url: '/api/member',
      method: 'POST',
      data: {
        avatar: 'https://picsum.photos/200/300.jpg?random=1',
        ...memberCreateInput,
      },
    };
    const result = await request<MemberResponseData>(axiosRequestConfig);

    if (result.type === 'success') {
      notifySuccess();
      await mutate({ members: [...members, result.data.member] });
      await router.push('/members');
    } else {
      notifyError();
    }

    setIsLoading(false);
  };

  if (isLoading) {
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
