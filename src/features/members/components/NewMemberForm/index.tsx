import LoadingModal from '@/components/LoadingModal';
import MemberForm from '@/features/members/components/MemberForm';
import { useMembers } from '@/features/members/hooks/useMembers';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';
import toast from 'react-hot-toast';

import type { MemberSchema } from '@/features/members/validation';
import type { MemberResponseData } from '@/pages/api/member';

const NewMemberForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { mutate } = useMembers();

  const notifySuccess = () => toast.success('メンバーを登録しました。');
  const notifyError = () =>
    toast.error(
      'メンバーの登録に失敗しました。時間をおいてからもう一度試してください。',
    );
  const handleSubmit = async (data: MemberSchema) => {
    setIsLoading(true);

    const response = await axios.post<MemberResponseData>('/api/member', {
      // todo: remove avatar after adding it to the form.
      avatar: 'https://picsum.photos/200/300.jpg?random=1',
      ...data,
    });

    if (response.status === 201) {
      notifySuccess();
      await mutate();
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
    <>
      <MemberForm
        submitButtonLabel="メンバーを追加する"
        submitMember={handleSubmit}
      />
    </>
  );
};

export default NewMemberForm;
