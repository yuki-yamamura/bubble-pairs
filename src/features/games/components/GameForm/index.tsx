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
import { Label } from '@/components/ui/label';
import {
  gameCreateSchema,
  type GameCreateSchemaType,
} from '@/features/games/validation';
import CandidateTable from '@/features/members/components/CandidateTable';
import MemberPicker from '@/features/members/components/MemberPicker';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFieldArray, useForm } from 'react-hook-form';

import type { Activity } from '@/types/models/Activity';
import type { Member } from '@prisma/client';
import type { Control, FieldValues } from 'react-hook-form';

type Props = {
  activity: Activity;
  onSubmit: (fieldValues: GameCreateSchemaType) => void;
};

const GameForm = ({ activity, onSubmit }: Props) => {
  const defaultValues = {
    activity: activity,
    members: activity.participants.map(({ memberId }) => ({
      memberId,
    })),
    singlesCount: '0',
    doublesCount: '0',
  } satisfies GameCreateSchemaType;
  const form = useForm<GameCreateSchemaType>({
    defaultValues,
    resolver: zodResolver(gameCreateSchema),
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = form;
  const { append, remove, fields } = useFieldArray({
    control,
    name: 'members',
  });
  const submitHandler = handleSubmit((fieldValues) => {
    onSubmit(fieldValues);
  });

  const updateMembers = (addedMembers: Member[]) => {
    const values = addedMembers.map((member) => ({ memberId: member.id }));
    append(values);
  };

  const restMembers = activity.participants
    .filter((participant) => {
      const selectedMemberIds = fields.map(({ memberId }) => memberId);

      return !selectedMemberIds.includes(participant.memberId);
    })
    .map(({ member }) => member);
  const gameDetailCountOptions = Array.from(
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
        className="mx-auto flex max-w-md flex-col gap-y-6"
      >
        <Label className="flex flex-col gap-y-2">
          {`${activity.place.name} / ${activity.place.courtCount} コート`}
        </Label>
        <FormField
          control={control}
          name="members"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="required-field">
                参加者（２名以上）
              </FormLabel>
              <FormControl>
                <MemberPicker
                  members={restMembers}
                  updateParticipants={updateMembers}
                />
              </FormControl>
              {field.value?.length === 0 ? (
                <EmptyState
                  src="/images/empty-box.png"
                  alt="empty-box"
                  className="w-180 h-40"
                >
                  <span>メンバーが選択されていません。</span>
                </EmptyState>
              ) : (
                <CandidateTable
                  data={
                    field.value.map(
                      ({ memberId }) =>
                        activity.participants.find(
                          (participant) => participant.memberId === memberId,
                        )?.member as Member,
                    ) ?? []
                  }
                  actions={{
                    deleteByRowIndex: (index: number) => remove(index),
                  }}
                />
              )}
            </FormItem>
          )}
        />
        {errors.members && <FormMessage>{errors.members.message}</FormMessage>}
        <SelectField
          control={control as unknown as Control<FieldValues>}
          name="singlesCount"
          label="シングルス数"
          required={true}
          options={gameDetailCountOptions}
        />
        {errors.singlesCount && (
          <FormMessage>{errors.singlesCount.message}</FormMessage>
        )}
        <SelectField
          control={control as unknown as Control<FieldValues>}
          name="doublesCount"
          label="ダブルス数"
          required={true}
          options={gameDetailCountOptions}
        />
        {errors.doublesCount && (
          <FormMessage>{errors.doublesCount.message}</FormMessage>
        )}
        <Button type="submit">ゲームを開始</Button>
      </form>
    </Form>
  );
};

export default GameForm;
