import LoadingModal from '@/components/LoadingModal';
import MemberForm from '@/features/members/components/MemberForm';
import axios from 'axios';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import useSWRMutation from 'swr/mutation';

import type { MemberCreateSchemaType } from '../validation';
import type { PostResponseData } from '@/pages/api/members';

const NewMember = () => {
  const router = useRouter();
  const defaultValues: MemberCreateSchemaType = {
    name: '',
    sex: 'MALE',
    level: 'BEGINNER',
    note: null,
    emojiUnicode: '1f9d1', // adult unicode: I think this is suitable for default avatar
  };

  const { trigger, isMutating } = useSWRMutation(
    '/api/members',
    (url: string, { arg }: { arg: MemberCreateSchemaType }) => {
      return axios
        .post<PostResponseData>(url, arg)
        .then((response) => response.data);
    },
  );

  const handleSubmit = async (fieldValues: MemberCreateSchemaType) => {
    try {
      await trigger(fieldValues);
      toast.success('メンバーを登録しました。');
      await router.push('/members');
    } catch {
      toast.error('メンバーを登録できませんでした。');
    }
  };

  if (isMutating) {
    return <LoadingModal />;
  }

  return (
    <MemberForm
      defaultValues={defaultValues}
      submitButtonLabel="メンバーを登録"
      onSubmit={handleSubmit}
    />
  );
};

export default NewMember;
