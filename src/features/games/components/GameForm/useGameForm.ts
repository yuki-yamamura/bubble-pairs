import {
  gameCreateSchema,
  type GameCreateSchema,
} from '@/features/games/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFieldArray, useForm } from 'react-hook-form';

import type { Activity } from '@/types/models/Activity';
import type { Member } from '@prisma/client';
import type { BaseSyntheticEvent } from 'react';
import type { Control, FieldErrors, UseFormReturn } from 'react-hook-form';

type Props = {
  activity: Activity;
  onSubmit: (fieldValues: GameCreateSchema) => Promise<void>;
};

export const useGameForm = ({
  activity,
  onSubmit,
}: Props): {
  control: Control<GameCreateSchema>;
  deleteMemberByIndex: (index: number) => void;
  form: UseFormReturn<GameCreateSchema>;
  errors: FieldErrors<GameCreateSchema>;
  restMembers: Member[];
  shouldDisableSubmitButton: boolean;
  submitHandler: (
    e?: BaseSyntheticEvent<object, unknown, unknown> | undefined,
  ) => Promise<void>;
  updateMembers: (addedMembers: Member[]) => void;
} => {
  const defaultValues = {
    activityId: activity.id,
    memberIds: activity.participants.map(({ memberId }) => ({
      memberId,
    })),
    singlesCount: 0,
    doublesCount: 0,
  } satisfies GameCreateSchema;
  const form = useForm<GameCreateSchema>({
    defaultValues,
    resolver: zodResolver(gameCreateSchema),
  });
  const {
    control,
    formState: { errors },
    handleSubmit,
    watch,
  } = form;
  const { append, fields, remove } = useFieldArray({
    control,
    name: 'memberIds',
  });

  const submitHandler = handleSubmit(async (fieldValues) => {
    await onSubmit(fieldValues);
  });
  const deleteMemberByIndex = (index: number) => remove(index);
  const updateMembers = (addedMembers: Member[]) => {
    const values = addedMembers.map((member) => ({ memberId: member.id }));
    append(values);
  };

  const restMembers = activity.participants
    .filter((participant) => {
      const selectedMemberIds = fields.map(({ memberId }) => memberId);

      return !selectedMemberIds.includes(participant.memberId);
    })
    .map(({ member }) => member);
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
