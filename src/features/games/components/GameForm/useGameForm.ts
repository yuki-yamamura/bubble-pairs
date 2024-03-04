import { getAllPlayers } from '../../logic';
import { gameCreateSchema } from '@/features/games/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { type Member, Rule } from '@prisma/client';
import { useFieldArray, useForm } from 'react-hook-form';

import type { GameCreateSchema } from '@/features/games/validation';
import type { Activity } from '@/types/models/Activity';
import type { BaseSyntheticEvent } from 'react';
import type { UseFormReturn } from 'react-hook-form';

type Props = {
  activity: Activity;
  onSubmit: (fieldValues: GameCreateSchema) => Promise<void>;
};

export const useGameForm = ({
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

  const previousGame = activity.games.find(
    (_, index) => index === activity.games.length - 1,
  );
  const shouldDisableApplyButton = previousGame === undefined;
  const restMembers = activity.participants
    .filter((participant) => {
      const selectedMemberIds = fields.map(({ memberId }) => memberId);

      return !selectedMemberIds.includes(participant.memberId);
    })
    .map(({ member }) => member);

  const submitHandler = handleSubmit(async (fieldValues) => {
    await onSubmit(fieldValues);
  });
  // handler for the previous conditions button
  const handleApplyPreviousValues = () => {
    if (!previousGame) return;

    const memberIds = getAllPlayers(previousGame)
      .map((player) => ({ memberId: player.participant.memberId }))
      .concat(
        previousGame.resters.map((rester) => ({
          memberId: rester.participant.memberId,
        })),
      );
    const singlesCount = previousGame.gameDetails.filter(
      (gameDetail) => gameDetail.rule === Rule.SINGLES,
    ).length;
    const doublesCount = previousGame.gameDetails.filter(
      (gameDetail) => gameDetail.rule === Rule.DOUBLES,
    ).length;

    reset({
      activityId: activity.id,
      memberIds,
      singlesCount,
      doublesCount,
    });
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
