import MemberForm from '@/features/members/components/MemberForm';

import type { MemberFormType } from '@/features/members/validation';

const NewMemberScreen = () => {
  const defaultValues: MemberFormType = {
    emojiUnicode: '1f9d1',
    name: '',
    kana: null,
    displayName: null,
    sex: 'MALE',
    level: 'BEGINNER',
    note: null,
  };

  return (
    <MemberForm
      defaultValues={defaultValues}
      onSubmit={(fieldValues) => console.log(fieldValues)}
    />
  );
};

export default NewMemberScreen;
