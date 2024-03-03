import { memberCreateSchema } from '@/features/members/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import type MemberForm from '.';
import type { MemberCreateSchema } from '@/features/members/validation';
import type { EmojiClickData } from 'emoji-picker-react';
import type { UseFormReturn } from 'react-hook-form';

type Props = Pick<
  React.ComponentPropsWithoutRef<typeof MemberForm>,
  'defaultValues' | 'onSubmit'
>;

export const useMemberForm = ({
  defaultValues,
  onSubmit,
}: Props): {
  form: UseFormReturn<MemberCreateSchema>;
  onEmojiSelect: (emoji: EmojiClickData, _: MouseEvent) => void;
  submitHandler: () => Promise<void>;
} => {
  const form = useForm<MemberCreateSchema>({
    defaultValues,
    resolver: zodResolver(memberCreateSchema),
  });
  const { handleSubmit, setValue } = form;

  const handleEmojiSelect = (emoji: EmojiClickData, _: MouseEvent) => {
    setValue('emojiUnicode', emoji.unified);
  };
  const submitHandler = handleSubmit((fieldValues) => onSubmit(fieldValues));

  return {
    form,
    onEmojiSelect: handleEmojiSelect,
    submitHandler,
  };
};
