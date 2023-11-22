import { useMemberForm } from '../hooks/useMemberForm';
import Component from '../presenter';
import { levelOptions } from '@/features/members/constants/levelOptions';
import { sexOptions } from '@/features/members/constants/sexOptions';

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
