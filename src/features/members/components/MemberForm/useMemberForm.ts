import { memberCreateSchema } from '@/features/members/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import type MemberForm from '.';
import type { MemberCreateSchema } from '@/features/members/validation';
import type { EmojiClickData } from 'emoji-picker-react';
import type { BaseSyntheticEvent } from 'react';
import type {
  Control,
  FieldErrors,
  UseFormRegister,
  UseFormReturn,
  UseFormSetFocus,
  UseFormWatch,
} from 'react-hook-form';

type Props = Pick<
  React.ComponentPropsWithoutRef<typeof MemberForm>,
  'defaultValues' | 'onSubmit'
>;

export const useMemberForm = ({
  defaultValues,
  onSubmit,
}: Props): {
  control: Control<MemberCreateSchema>;
  errors: FieldErrors<MemberCreateSchema>;
  form: UseFormReturn<MemberCreateSchema>;
  onEmojiSelect: (emoji: EmojiClickData, _: MouseEvent) => void;
  register: UseFormRegister<MemberCreateSchema>;
  setFocus: UseFormSetFocus<MemberCreateSchema>;
  shouldDisableSubmitButton: boolean;
  submitHandler: (
    e?: BaseSyntheticEvent<object, unknown, unknown> | undefined,
  ) => Promise<void>;
  watch: UseFormWatch<MemberCreateSchema>;
} => {
  const form = useForm<MemberCreateSchema>({
    defaultValues,
    resolver: zodResolver(memberCreateSchema),
  });
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
    setFocus,
    setValue,
    watch,
  } = form;

  const handleEmojiSelect = (emoji: EmojiClickData, _: MouseEvent) => {
    setValue('emojiUnicode', emoji.unified);
  };
  const submitHandler = handleSubmit((fieldValues) => onSubmit(fieldValues));
  const shouldDisableSubmitButton =
    JSON.stringify(defaultValues) === JSON.stringify(watch());

  return {
    control,
    errors,
    form,
    onEmojiSelect: handleEmojiSelect,
    register,
    setFocus,
    shouldDisableSubmitButton,
    submitHandler,
    watch,
  };
};
