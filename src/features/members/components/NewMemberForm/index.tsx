import LoadingModal from '@/components/LoadingModal';
import MemberForm from '@/features/members/components/BaseMemberForm';
import axios from 'axios';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import useSWRMutation from 'swr/mutation';

import type { PostResponseData } from '@/pages/api/members';

const NewMemberForm = () => {
  const router = useRouter();
  const defaultValues: MemberForm = {
    emojiUnicode: '1f9d1',
    name: '',
    kana: null,
    displayName: null,
    sex: 'MALE',
    level: 'BEGINNER',
    note: null,
  };

  const { trigger, isMutating } = useSWRMutation<
    PostResponseData,
    Error,
    '/api/members',
    MemberForm
  >('/api/members', (url: string, { arg }: { arg: MemberForm }) => {
    return axios
      .post<PostResponseData>(url, arg)
      .then((response) => response.data);
  });

  const handleSubmit = (fieldValues: MemberForm) => {
    trigger(fieldValues)
      .then(() => {
        toast.success('メンバーを登録しました。');
        void router.push('/members');
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
