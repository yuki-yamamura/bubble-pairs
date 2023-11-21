import { useMemberForm } from '../hooks/useMemberForm';
import Component from '../presenter';

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
      onSubmit={handleSubmit}
    />
  );
};

export default NewMemberForm;
