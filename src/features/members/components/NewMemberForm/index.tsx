import LoadingModal from '@/components/LoadingModal';
import MemberForm from '@/features/members/components/MemberForm';
import { useMembers } from '@/features/members/hooks/useMembers';
import axios, { isAxiosError } from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';
import toast from 'react-hot-toast';

import type { MemberSchema } from '@/features/members/validation';
import type { MemberResponseData } from '@/pages/api/member';
import type { HttpResponse } from '@/types/HttpResponse';

const NewMemberForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { members, mutate } = useMembers();

  const notifySuccess = () => toast.success('メンバーを登録しました。');
  const notifyError = () => toast.error('メンバーの登録に失敗しました。');
  const handleSubmit = async (memberCreateInput: MemberSchema) => {
    setIsLoading(true);

    const postMember = async (): Promise<
      HttpResponse<MemberResponseData, Error>
    > => {
      try {
        const response = await axios.post<MemberResponseData>('/api/member', {
          avatar: 'https://picsum.photos/200/300.jpg?random=1',
          ...memberCreateInput,
        });
        const { data, status } = response;

        return { data, status };
      } catch (error) {
        if (isAxiosError(error)) {
          return { error, status: 500 };
        }

        return { error: new Error('something went wrong'), status: 500 };
      }
    };

    const { data, error } = await postMember();
    if (data !== undefined && error) {
      notifySuccess();
      await mutate({ members: [...members, data.member] });
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
