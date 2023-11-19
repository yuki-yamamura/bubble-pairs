import FormField from '../FormField';
import RadioGroup from '../FormField/RadioGroup';
import Textarea from '../FormField/Textarea';
import Textbox from '../FormField/Textbox';
import Button from '@/components/Button';
import { levelOptions } from '@/features/members/constants/levelOptions';
import { sexOptions } from '@/features/members/constants/sexOptions';
import { schema } from '@/features/members/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import type { MemberWithoutMeta } from '@/features/members/types/MemberWithoutMeta';
import type { SubmitHandler } from 'react-hook-form';

import styles from './index.module.scss';

const NewMemberForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MemberWithoutMeta>({
    defaultValues: {
      name: '',
      kana: null,
      displayName: null,
      sex: 'MALE',
      level: 'BEGINNER',
      note: null,
    },
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<MemberWithoutMeta> = (data) => {
    // todo: implement logic to submit form data.
    console.log(data);
  };

  return (
    <form
      onSubmit={(...args) => void handleSubmit(onSubmit)(...args)}
      className={styles.module}
    >
      <FormField labelText="名前（必須）" errorMessage={errors.name?.message}>
        <Textbox name="name" register={register} />
      </FormField>
      <FormField labelText="かな">
        <Textbox name="kana" register={register} />
      </FormField>
      <FormField labelText="表示名">
        <Textbox name="displayName" register={register} />
      </FormField>
      <FormField labelText="性別（必須）">
        <RadioGroup options={sexOptions} name="sex" register={register} />
      </FormField>
      <FormField labelText="レベル（必須）">
        <RadioGroup options={levelOptions} name="level" register={register} />
      </FormField>
      <FormField labelText="メモ">
        <Textarea name="note" register={register} />
      </FormField>
      <Button type="submit" text="メンバーを追加する" color="green" />
    </form>
  );
};

export default NewMemberForm;
