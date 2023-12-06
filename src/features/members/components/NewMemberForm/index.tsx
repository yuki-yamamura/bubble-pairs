import MemberForm from '@/features/members/components/MemberForm';
import axios from 'axios';
import { useRouter } from 'next/router';

import type { MemberSchema } from '@/features/members/validation';
import type { MemberResponseData } from '@/pages/api/member';

const NewMemberForm = () => {
  const router = useRouter();

  const handleSubmit = async (data: MemberSchema) => {
    const response = await axios.post<MemberResponseData>('/api/member', {
      // todo: remove avatar after adding it to the form.
      avatar: 'https://picsum.photos/200/300.jpg?random=1',
      ...data,
    });

    if (response.status === 201) {
      await router.push('/members');
      // reload page to get up-to-date members.
      router.reload();
    } else {
      // todo: show the toast to notify a user of the failure.
      console.error('something went wrong');
    }
  };

  return (
    <MemberForm
      submitButtonLabel="メンバーを追加する"
      submitMember={handleSubmit}
    />
  );
};

export default NewMemberForm;
