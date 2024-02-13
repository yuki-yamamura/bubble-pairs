import MemberForm from '@/features/members/components/MemberForm';
import { $Enums } from '@prisma/client';
import axios from 'axios';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import useSWRMutation from 'swr/mutation';

import type { MemberCreateSchema } from '@/features/members/validation';
import type { PostResponseData } from '@/pages/api/members';

const NewMember = () => {
  const router = useRouter();
  const { trigger, isMutating } = useSWRMutation(
    '/api/members',
    (url: string, { arg }: { arg: MemberCreateSchema }) => {
      return axios
        .post<PostResponseData>(url, arg)
        .then((response) => response.data);
    },
  );

  const handleSubmit = async (fieldValues: MemberCreateSchema) => {
    try {
      await trigger(fieldValues);
      await router.push('/members');
      toast.success('メンバーを登録しました。');
    } catch {
      toast.error('メンバーを登録できませんでした。');
    }
  };

  const defaultValues: MemberCreateSchema = {
    name: '',
    sex: $Enums.Sex.MALE,
    level: $Enums.Level.BEGINNER,
    note: null,
    emojiUnicode: '1f9d1', // adult unicode: I think this is suitable as default avatar.
  };

  return (
    <MemberForm
      defaultValues={defaultValues}
      buttonLabel="メンバーを登録"
      isSubmitting={isMutating}
      onSubmit={handleSubmit}
    />
  );
};

export default NewMember;
