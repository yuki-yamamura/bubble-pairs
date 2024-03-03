import { activityCreateSchema } from '@/features/activities/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFieldArray, useForm } from 'react-hook-form';

import type { ActivityCreateSchema } from '@/features/activities/validation';
import type { Member, Place } from '@prisma/client';
import type { UseFormReturn } from 'react-hook-form';

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
  deleteMemberByIndex: (index: number) => void;
  form: UseFormReturn<ActivityCreateSchema>;
  restMembers: Member[];
  submitHandler: () => Promise<void>;
  updateMembers: (addedMembers: Member[]) => void;
} => {
  const defaultValues = {
    memberIds: [],
    placeId: places[0].id,
    isOpen: true,
  } satisfies ActivityCreateSchema;
  const form = useForm<ActivityCreateSchema>({
    defaultValues,
    resolver: zodResolver(activityCreateSchema),
  });
  const { control, handleSubmit } = form;
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

  const restMembers = members.filter((member) => {
    const selectedMemberIds = fields.map(({ memberId }) => memberId);

    return !selectedMemberIds.includes(member.id);
  });

  return {
    deleteMemberByIndex,
    form,
    restMembers,
    submitHandler,
    updateMembers,
  };
};
