import LoadingModal from '@/components/LoadingModal';
import MemberForm from '@/features/members/components/MemberForm';
import axios from 'axios';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import useSWRMutation from 'swr/mutation';

import type { MemberCreateSchemaType } from '../validation';
import type { PostResponseData } from '@/pages/api/members';

const NewMemberForm = () => {
  const router = useRouter();
  const defaultValues: MemberCreateSchemaType = {
    name: '',
    kana: null,
    displayName: null,
    sex: 'MALE',
    level: 'BEGINNER',
    note: null,
    emojiUnicode: '1f9d1',
  };

  const { trigger, isMutating } = useSWRMutation(
    '/api/members',
    (url: string, { arg }: { arg: MemberCreateSchemaType }) => {
      return axios
        .post<PostResponseData>(url, arg)
        .then((response) => response.data);
    },
  );

  const handleSubmit = (fieldValues: MemberCreateSchemaType) => {
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

  return <MemberForm defaultValues={defaultValues} onSubmit={handleSubmit} />;
};

export default NewMemberForm;
