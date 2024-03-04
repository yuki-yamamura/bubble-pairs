import { useGameForm } from './useGameForm';
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

import type { GameCreateSchema } from '@/features/games/validation';
import type { Activity } from '@/types/models/Activity';
import type { Options } from '@/types/Options';
import type { Member } from '@prisma/client';

type Props = {
  activity: Activity;
  isSubmitting: boolean;
  onSubmit: (fieldValues: GameCreateSchema) => Promise<void>;
};

const GameForm = ({ activity, isSubmitting, onSubmit }: Props) => {
  const {
    deleteMemberByIndex,
    form,
    restMembers,
    shouldDisableApplyButton,
    submitHandler,
    updateMembers,
    onApplyPreviousValues,
  } = useGameForm({ activity, onSubmit });
  const {
    control,
    formState: { errors },
  } = form;

  const gameDetailCountOptions: Options = Array.from(
    Array(activity.place.courtCount + 1),
    (_, index) => index,
  ).map((count) => ({
    value: count.toString(),
    label: count.toString(),
  }));

  return (
    <Form {...form}>
      <form
        onSubmit={submitHandler}
        className="mx-auto flex max-w-sm flex-col gap-y-6"
      >
        <Button
          type="button"
          disabled={shouldDisableApplyButton}
          variant="outline"
          onClick={onApplyPreviousValues}
          className="max-w-fit self-center"
        >
          前回の条件を使う
        </Button>
        <FormField
          control={control}
          name="memberIds"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="required">参加者</FormLabel>
              <FormControl>
                <MembersPicker
                  members={restMembers}
                  updateMembers={updateMembers}
                />
              </FormControl>
              <CandidateTable
                data={field.value
                  .map(
                    ({ memberId }) =>
                      activity.participants.find(
                        (participant) => participant.memberId === memberId,
                      )?.member,
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
        {errors.memberIds && (
          <FormMessage>{errors.memberIds.message}</FormMessage>
        )}
        <FormField
          control={control}
          name="singlesCount"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="required">シングルス数</FormLabel>
              <Select
                options={gameDetailCountOptions}
                value={field.value.toString()}
                defaultValue={field.value.toString()}
                onValueChange={field.onChange}
              />
              {errors.singlesCount && (
                <FormMessage>{errors.singlesCount.message}</FormMessage>
              )}
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="doublesCount"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="required">ダブルス数</FormLabel>
              <Select
                options={gameDetailCountOptions}
                value={field.value.toString()}
                defaultValue={field.value.toString()}
                onValueChange={field.onChange}
              />
              {errors.doublesCount && (
                <FormMessage>{errors.doublesCount.message}</FormMessage>
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
          ゲームをはじめる
        </Button>
      </form>
    </Form>
  );
};

export default GameForm;
