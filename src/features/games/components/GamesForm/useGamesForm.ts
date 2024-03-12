import { gameCreateSchema } from '@/features/games/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { type Member } from '@prisma/client';
import { useFieldArray, useForm } from 'react-hook-form';

import type { GameCreateSchema } from '@/features/games/validation';
import type { Activity } from '@/types/models/Activity';
import type { BaseSyntheticEvent } from 'react';
import type { UseFormReturn } from 'react-hook-form';

type Props = {
  activity: Activity;
  onSubmit: (fieldValues: GameCreateSchema) => Promise<void>;
};

export const useGamesForm = ({
  activity,
  onSubmit,
}: Props): {
  deleteMemberByIndex: (index: number) => void;
  form: UseFormReturn<GameCreateSchema>;
  restMembers: Member[];
  shouldDisableApplyButton: boolean;
  submitHandler: (
    e?: BaseSyntheticEvent<object, unknown, unknown> | undefined,
  ) => Promise<void>;
  updateMembers: (addedMembers: Member[]) => void;
  onApplyPreviousValues: () => void;
} => {
  const defaultValues = {
    activityId: activity.id,
    memberIds: activity.participants.map(({ memberId }) => ({
      memberId,
    })),
    gameCount: 1,
    singlesCount: 0,
    doublesCount: 0,
  } satisfies GameCreateSchema;
  const form = useForm<GameCreateSchema>({
    defaultValues,
    resolver: zodResolver(gameCreateSchema),
  });
  const { control, handleSubmit, reset } = form;
  const { append, fields, remove } = useFieldArray({
    control,
    name: 'memberIds',
  });

  const deleteMemberByIndex = (index: number) => remove(index);
  const updateMembers = (addedMembers: Member[]) => {
    const values = addedMembers.map((member) => ({ memberId: member.id }));
    append(values);
  };

  const serializedPreviousValues = localStorage.getItem('previous-game-values');
  const previousGame = activity.games.find(
    (_, index) => index === activity.games.length - 1,
  );
  const shouldDisableApplyButton = !previousGame || !serializedPreviousValues;
  const restMembers = activity.participants
    .filter((participant) => {
      const selectedMemberIds = fields.map(({ memberId }) => memberId);

      return !selectedMemberIds.includes(participant.memberId);
    })
    .map(({ member }) => member);

  const submitHandler = handleSubmit(async (fieldValues) => {
    try {
      await onSubmit(fieldValues);
      localStorage.setItem('previous-game-values', JSON.stringify(fieldValues));
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
    }
  });
  // handler for the previous conditions button
  const handleApplyPreviousValues = () => {
    if (!previousGame) return;
    if (!serializedPreviousValues) return;

    const previousValues = JSON.parse(
      serializedPreviousValues,
    ) as GameCreateSchema;
    gameCreateSchema.parse(previousValues);

    reset(previousValues);
  };

  return {
    deleteMemberByIndex,
    form,
    restMembers,
    shouldDisableApplyButton,
    submitHandler,
    updateMembers,
    onApplyPreviousValues: handleApplyPreviousValues,
  };
};
