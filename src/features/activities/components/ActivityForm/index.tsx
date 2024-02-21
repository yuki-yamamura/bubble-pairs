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
    control,
    deleteMemberByIndex,
    form,
    errors,
    restMembers,
    shouldDisableSubmitButton,
    submitHandler,
    updateMembers,
  } = useActivityForm({ members, places, onSubmit });

  const placeOptions: Options = places.map(({ id, name }) => ({
    value: id,
    label: name,
  }));

  return (
    <Form {...form}>
      <form
        onSubmit={submitHandler}
        className="mx-auto flex w-full max-w-sm flex-col gap-y-4"
      >
        <FormField
          control={control}
          name="participants"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="required">参加者</FormLabel>
              {errors.participants && (
                <FormMessage>{errors.participants.message}</FormMessage>
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
              <FormLabel className="required">場所</FormLabel>
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
          disabled={shouldDisableSubmitButton}
          variant="primary-green"
          className="self-center"
        >
          アクティビティをはじめる
        </Button>
      </form>
    </Form>
  );
};

export default ActivityForm;
