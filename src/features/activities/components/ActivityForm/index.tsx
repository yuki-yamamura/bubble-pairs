import EmptyState from '@/components/EmptyState';
import SelectField from '@/components/form/fields/SelectField';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  activityCreateSchema,
  type ActivityCreateSchemaType,
} from '@/features/activities/validation';
import CandidateTable from '@/features/members/components/CandidateTable';
import MemberPicker from '@/features/members/components/MemberPicker';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useFieldArray, useForm } from 'react-hook-form';

import type { Member, Place } from '@prisma/client';
import type { Control, FieldValues } from 'react-hook-form';

type Props = {
  members: Member[];
  places: Place[];
  onSubmit: (fieldValues: ActivityCreateSchemaType) => void;
};

const ActivityForm = ({ members, places, onSubmit }: Props) => {
  const form = useForm<ActivityCreateSchemaType>({
    defaultValues: {
      participants: [],
      placeId: places[0].id,
      isOpen: true,
    },
    resolver: zodResolver(activityCreateSchema),
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = form;
  const { append, remove, fields } = useFieldArray({
    control,
    name: 'participants',
  });
  const submitHandler = handleSubmit((fieldValues) => {
    onSubmit(fieldValues);
  });

  const updateParticipants = (addedMembers: Member[]) => {
    const values = addedMembers.map((member) => ({ memberId: member.id }));
    append(values);
  };

  // members who haven't joined yet
  const restMembers = members.filter((member) => {
    const participantIds = fields.map((value) => value.memberId);

    return !participantIds.includes(member.id);
  });
  const placeOptions = places.map(({ name, id }) => ({
    value: id,
    label: name,
  }));

  return (
    <Form {...form}>
      <form
        onSubmit={submitHandler}
        className="mx-auto flex max-w-md flex-col gap-y-6"
      >
        <FormField
          control={control}
          name="participants"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="required-field">
                参加者（２名以上）
              </FormLabel>
              <FormControl>
                <MemberPicker
                  members={restMembers}
                  updateParticipants={updateParticipants}
                />
              </FormControl>
              {field.value?.length === 0 && (
                <EmptyState
                  image="/images/empty-box.png"
                  className="w-180 h-40"
                >
                  <span>メンバーが選択されていません。</span>
                  <span>
                    <Link
                      // todo: navigate default members
                      href="#"
                      className="text-blue-400 hover:underline focus:underline"
                    >
                      いつも参加するメンバー
                    </Link>{' '}
                    を登録できます。
                  </span>
                </EmptyState>
              )}
              {field.value?.length !== 0 && (
                <CandidateTable
                  data={
                    field.value.map(({ memberId }) =>
                      members.find((member) => member.id === memberId),
                    ) as Member[]
                  }
                  actions={{
                    deleteByRowIndex: (index: number) => remove(index),
                  }}
                />
              )}
            </FormItem>
          )}
        />
        <SelectField
          control={control as unknown as Control<FieldValues>}
          name="placeId"
          label="場所"
          required={true}
          options={placeOptions}
        />
        {errors.placeId && <FormMessage>{errors.placeId?.message}</FormMessage>}
        <Button type="submit" variant="accent" className="mx-auto max-w-fit">
          アクティビティを開始
        </Button>
      </form>
    </Form>
  );
};

export default ActivityForm;
