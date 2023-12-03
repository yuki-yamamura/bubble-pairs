import MemberForm from '@/features/members/components/MemberForm';
import { useMemberForm } from '@/features/members/hooks/useMemberForm';

const NewMemberForm = () => {
  const { submitHandler } = useMemberForm();

  const handleSubmit = submitHandler((data) => console.log(data));

  return (
    <MemberForm
      submitButtonLabel="メンバーを追加する"
      onSubmit={handleSubmit}
    />
  );
};

export default NewMemberForm;
