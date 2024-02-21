import { activityCreateSchema } from '@/features/activities/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFieldArray, useForm } from 'react-hook-form';

import type { ActivityCreateSchema } from '@/features/activities/validation';
import type { Member, Place } from '@prisma/client';
import type { BaseSyntheticEvent } from 'react';
import type { Control, FieldErrors, UseFormReturn } from 'react-hook-form';

type Props = {
  members: Member[];
  places: Place[];
  onSubmit: (fieldValues: ActivityCreateSchema) => Promise<void>;
};

export const useActivityForm = ({
  members,
  places,
  onSubmit,
}: Props): {
  control: Control<ActivityCreateSchema>;
  deleteMemberByIndex: (index: number) => void;
  form: UseFormReturn<ActivityCreateSchema>;
  errors: FieldErrors<ActivityCreateSchema>;
  restMembers: Member[];
  shouldDisableSubmitButton: boolean;
  submitHandler: (
    e?: BaseSyntheticEvent<object, unknown, unknown> | undefined,
  ) => Promise<void>;
  updateMembers: (addedMembers: Member[]) => void;
} => {
  const defaultValues = {
    participants: [],
    placeId: places[0].id,
    isOpen: true,
  } satisfies ActivityCreateSchema;
  const form = useForm<ActivityCreateSchema>({
    defaultValues,
    resolver: zodResolver(activityCreateSchema),
  });
  const {
    control,
    formState: { errors },
    handleSubmit,
    watch,
  } = form;
  const { append, fields, remove } = useFieldArray({
    control,
    name: 'participants',
  });

  const submitHandler = handleSubmit(async (fieldValues) => {
    await onSubmit(fieldValues);
  });
  const deleteMemberByIndex = (index: number) => remove(index);
  const updateMembers = (addedMembers: Member[]) => {
    const values = addedMembers.map((member) => ({ memberId: member.id }));
    append(values);
  };

  const restMembers = members.filter((member) => {
    const selectedMemberIds = fields.map(({ memberId }) => memberId);

    return !selectedMemberIds.includes(member.id);
  });
  const shouldDisableSubmitButton =
    JSON.stringify(defaultValues) === JSON.stringify(watch());

  return {
    control,
    deleteMemberByIndex,
    form,
    errors,
    restMembers,
    shouldDisableSubmitButton,
    submitHandler,
    updateMembers,
  };
};
