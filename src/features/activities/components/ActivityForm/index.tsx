import { useActivityForm } from './useActivityForm';
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
import CandidateTable from '@/features/members/components/CandidateTable';
import MembersPicker from '@/features/members/components/MembersPicker';

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
  const {
    deleteMemberByIndex,
    form,
    restMembers,
    submitHandler,
    updateMembers,
  } = useActivityForm({ members, places, onSubmit });
  const {
    control,
    formState: { errors },
  } = form;

  const placeOptions: Options = places.map(({ id, name }) => ({
    value: id,
    label: name,
  }));

  return (
    <Form {...form}>
      <form
        onSubmit={submitHandler}
        className="mx-auto flex w-full max-w-sm flex-col gap-y-6"
      >
        <FormField
          control={control}
          name="memberIds"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="required">参加者</FormLabel>
              {errors.memberIds && (
                <FormMessage>{errors.memberIds.message}</FormMessage>
              )}
              <FormControl>
                <MembersPicker
                  members={restMembers}
                  updateMembers={updateMembers}
                />
              </FormControl>
              <CandidateTable
                data={field.value
                  .map(({ memberId }) =>
                    members.find((member) => member.id === memberId),
                  )
                  // remove undefined so that TypeScript will recognize correct type.
                  .filter((member): member is Member => !!member)}
                actions={{
                  deleteRowByIndex: deleteMemberByIndex,
                }}
              />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="placeId"
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
