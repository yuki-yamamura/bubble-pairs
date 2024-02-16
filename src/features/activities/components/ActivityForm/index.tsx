import Button from '@/components/Button';
import Select from '@/components/form/Select';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { activityCreateSchema } from '@/features/activities/validation';
import CandidateTable from '@/features/members/components/CandidateTable';
import MembersPicker from '@/features/members/components/MembersPicker';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFieldArray, useForm } from 'react-hook-form';

import type { ActivityCreateSchema } from '@/features/activities/validation';
import type { Options } from '@/types/Options';
import type { Member, Place } from '@prisma/client';

type Props = {
  members: Member[];
  places: Place[];
  isSubmitting: boolean;
  onSubmit: (fieldValues: ActivityCreateSchema) => Promise<void>;
};

const ActivityForm = ({ members, places, isSubmitting, onSubmit }: Props) => {
  const form = useForm<ActivityCreateSchema>({
    defaultValues: {
      participants: [],
      placeId: places[0].id,
      isOpen: true,
    },
    resolver: zodResolver(activityCreateSchema),
  });
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = form;
  const { append, remove, fields } = useFieldArray({
    control,
    name: 'participants',
  });

  const updateParticipants = (addedMembers: Member[]) => {
    const values = addedMembers.map((member) => ({ memberId: member.id }));
    append(values);
  };

  // members who haven't joined an activity yet.
  const restMembers = members.filter(
    (member) => !fields.some((field) => field.memberId === member.id),
  );
  const placeOptions: Options = places.map(({ id, name }) => ({
    value: id,
    label: name,
  }));

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit((fieldValues) => onSubmit(fieldValues))}
        className="mx-auto flex w-full max-w-sm flex-col gap-y-4"
      >
        <FormField
          control={control}
          name="participants"
          rules={{ required: true }}
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="required">参加者</FormLabel>
              {errors.participants && (
                <FormMessage>{errors.participants.message}</FormMessage>
              )}
              <FormControl>
                <MembersPicker
                  members={restMembers}
                  updateParticipants={updateParticipants}
                />
              </FormControl>
              <CandidateTable
                data={field.value
                  .map(({ memberId }) =>
                    members.find((member) => member.id === memberId),
                  )
                  // remove undefined and TypeScript recognizes correct type.
                  .filter((member): member is Member => !!member)}
                actions={{
                  deleteRowByIndex: (index: number) => remove(index),
                }}
              />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="placeId"
          rules={{ required: true }}
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="required">活動場所</FormLabel>
              <Select
                options={placeOptions}
                value={field.value}
                defaultValue={field.value}
                onValueChange={field.onChange}
              />
              {errors.placeId && (
                <FormMessage>{errors.placeId?.message}</FormMessage>
              )}
            </FormItem>
          )}
        />
        <Button
          type="submit"
          isBusy={isSubmitting}
          variant="primary-green"
          className="self-center"
        >
          アクティビティを開始
        </Button>
      </form>
    </Form>
  );
};

export default ActivityForm;
