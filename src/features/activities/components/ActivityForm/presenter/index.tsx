import { useForm } from 'react-hook-form';

type FormValues = {
  place: string;
};

const ActivityForm = () => {
  const { register, handleSubmit } = useForm<FormValues>();
  const submitHandler = handleSubmit((data) => console.log(data));

  return (
    <form onSubmit={submitHandler}>
      <select {...register('place')}>
        <option>foo</option>
        <option>bar</option>
        <option>hoge</option>
      </select>
      <button type="submit">Submit</button>
    </form>
  );
};

export default ActivityForm;
