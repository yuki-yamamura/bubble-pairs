import NumberInput from '@/components/NumberInput';
import { useGameForm } from '@/features/games/hooks/useGameForm';
import MemberSelectModal from '@/features/members/components/MemberSelectModal';
import { useMembers } from '@/features/members/hooks/useMembers';
import axios from 'axios';
import { useRef } from 'react';
import { useFieldArray } from 'react-hook-form';

import type { GameFormType } from '@/features/games/validation';
import type { Activity } from '@/types/models/Activity';
import type { Member } from '@prisma/client';

type Props = {
  activity: Activity;
};

const GameForm = ({ activity: { id, participants, place } }: Props) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const defaultValues = {
    activityId: id,
    members: participants.map(({ memberId }) => ({ memberId })),
    singlesCount: 0,
    doublesCount: place.courtCount / 2,
  } satisfies GameFormType;
  const {
    control,
    fieldValues,
    handleSubmit,
    decrementSinglesCount,
    incrementSinglesCount,
    decrementDoublesCount,
    incrementDoublesCount,
  } = useGameForm(defaultValues);
  const { fields, append } = useFieldArray({
    control,
    name: 'members',
  });
  const { members } = useMembers();

  const submitHandler = handleSubmit(async (data) => {
    await axios.post(`/api/activities/${id}/games`, data);
  });

  const handleNewGamesButtonClick = () => {
    dialogRef.current?.showModal();
  };

  const updateMembers = (members: Member[]) => {
    const value = members.map((member) => ({ memberId: member.id }));
    append(value);
  };

  return (
    <form onSubmit={submitHandler}>
      <input type="hidden" {...fieldValues.activityId} />
      <button type="button" onClick={handleNewGamesButtonClick}>
        change members
      </button>
      <MemberSelectModal
        members={members}
        onSaveButtonClick={updateMembers}
        dialogRef={dialogRef}
      />
      <ul>
        {fields.map((field, index) => (
          <li key={field.id}>
            <label>
              <input type="checkbox" value={index} />
              {members.find((member) => member.id === field.memberId)?.name}
            </label>
          </li>
        ))}
      </ul>
      <label>
        <span>シングルス数</span>
        <NumberInput
          decrement={decrementSinglesCount}
          increment={incrementSinglesCount}
          {...fieldValues.singlesCount}
        />
      </label>
      <label>
        <span>ダブルス数</span>
        <NumberInput
          decrement={decrementDoublesCount}
          increment={incrementDoublesCount}
          {...fieldValues.doublesCount}
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default GameForm;
