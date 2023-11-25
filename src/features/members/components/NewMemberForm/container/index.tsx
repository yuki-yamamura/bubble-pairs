import { useMemberForm } from '../hooks/useMemberForm';
import Component from '../presenter';
import { levelOptions } from '@/features/members/components/Members/hooks/useFilter/levelOptions';
import { sexOptions } from '@/features/members/components/Members/hooks/useFilter/sexOptions';

const NewMemberForm = () => {
  const {
    fieldValues,
    fieldErrors,
    handleSubmit: submitHandler,
  } = useMemberForm();

  const handleSubmit = submitHandler((data) => {
    // todo: implement logic to submit form data.
    console.log(data);
  });

  return (
    <Component
      fieldValues={fieldValues}
      fieldErrors={fieldErrors}
      levelOptions={levelOptions}
      sexOptions={sexOptions}
      onSubmit={handleSubmit}
    />
  );
};

export default NewMemberForm;
