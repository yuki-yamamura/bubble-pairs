import Loading from '@/components/Loading';
import { useActivityForm } from '@/features/activities/hooks/useActivityForm';
import MemberSelectModal from '@/features/members/components/MemberSelectModal';
import { useMembers } from '@/features/members/hooks/useMembers';
import { usePlaces } from '@/features/places/hooks/usePlaces';
import axios from 'axios';
import { useRef } from 'react';
import { useFieldArray } from 'react-hook-form';

import type { ActivityFormType } from '@/features/activities/validation';
import type { Member } from '@prisma/client';

const ActivityForm = () => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const { members, isLoading: membersLoading } = useMembers();
  const { places, isLoading: placesLoading } = usePlaces();
  const defaultValues = {
    members: members.map((member) => ({ memberId: member.id })),
    placeId: places[0]?.id,
  } satisfies ActivityFormType;
  const { control, fieldValues, handleSubmit } = useActivityForm(defaultValues);

  const { fields, append } = useFieldArray({
    control,
    name: 'members',
  });

  const postActivity = async (data: ActivityFormType) => {
    await axios.post('/api/activities', data);
  };
  const submitHandler = handleSubmit((data) => postActivity(data));

  // todo: change the argument type from Member[] to number[].
  const updateMembers = (members: Member[]) => {
    const value = members.map((member) => ({ memberId: member.id }));
    append(value);

    dialogRef.current?.close();
  };

  const openMemberSelectModal = () => {
    if (!dialogRef.current) return;

    dialogRef.current.showModal();
  };

  const placeOptions = places.map((place) => ({
    label: place.name,
    value: place.id,
  }));

  if (membersLoading || placesLoading) return <Loading />;

  return (
    <form onSubmit={submitHandler}>
      <button type="button" onClick={openMemberSelectModal}>
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
      <select {...fieldValues.placeId}>
        {placeOptions?.map((placeOption) => (
          <option key={placeOption.value} value={placeOption.value}>
            {placeOption.label}
          </option>
        ))}
      </select>
      <button type="submit">Submit</button>
    </form>
  );
};

export default ActivityForm;
