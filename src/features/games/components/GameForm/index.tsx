import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Command, CommandGroup, CommandItem } from '@/components/ui/command';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  gameCreateSchema,
  type GameCreateSchemaType,
} from '@/features/games/validation';
import MemberPicker from '@/features/members/components/MemberPicker';
import { cn } from '@/lib/shadcn-ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { Check, ChevronDown, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';

import type { Activity } from '@/types/models/Activity';
import type { Member } from '@prisma/client';

type Props = {
  activity: Activity;
  onSubmit: (fieldValues: GameCreateSchemaType) => void;
};

const GameForm = ({ activity, onSubmit }: Props) => {
  const [selectedMembers, setSelectedMembers] = useState<Member[]>([]);
  const [isSinglesComboboxOpen, setIsSinglesComboboxOpen] = useState(false);
  const [isDoublesComboboxOpen, setIsDoublesComboboxOpen] = useState(false);
  const participants = activity.participants.map(
    (participant) => participant.member,
  );
  const possibleCourtCounts = Array.from(
    Array(activity.place.courtCount + 1),
    (_, index) => index,
  );
  const defaultValues = {
    activityId: activity.id,
    members: activity.participants.map(({ memberId }) => ({
      memberId,
    })),
    singlesCount: 0,
    doublesCount: 0,
  } satisfies GameCreateSchemaType;
  const form = useForm<GameCreateSchemaType>({
    defaultValues,
    resolver: zodResolver(gameCreateSchema),
  });
  const { control, handleSubmit, getValues, setValue } = form;
  const { append, remove } = useFieldArray({
    control,
    name: 'members',
  });
  const submitHandler = handleSubmit((fieldValues) => {
    onSubmit(fieldValues);
  });

  const updateSelectedMembers = (member: Member) => {
    if (
      selectedMembers.some((selectedMember) => selectedMember.id === member.id)
    ) {
      setSelectedMembers(
        selectedMembers.filter(
          (selectedMember) => selectedMember.id !== member.id,
        ),
      );
    } else {
      setSelectedMembers((previousSelectedMembers) => [
        ...previousSelectedMembers,
        member,
      ]);
    }
  };
  const handleAddMembersButtonClick = () => {
    append(
      selectedMembers.map((selectedMember) => ({
        memberId: selectedMember.id,
      })),
    );
  };
  const handleCancelButtonClick = () => {
    setSelectedMembers([]);
  };

  const candidates = participants.filter((participant) => {
    const members = getValues('members');

    if (members) {
      return !members.some(({ memberId }) => memberId === participant.id);
    } else {
      false;
    }
  });

  return (
    <Form {...form}>
      <form onSubmit={submitHandler}>
        <FormField
          control={control}
          name="members"
          render={({ field }) => (
            <FormItem>
              <FormLabel>参加者（２名以上）</FormLabel>
              <ul>
                {field.value?.map(({ memberId }, index) => (
                  <li key={memberId}>
                    <div className="flex items-center gap-x-4">
                      <span>{memberId}</span>
                      <Trash2 size={16} onClick={() => remove(index)} />
                    </div>
                  </li>
                ))}
              </ul>
              <FormControl>
                <AlertDialog>
                  <AlertDialogTrigger
                    disabled={
                      activity.participants.length === field.value?.length
                    }
                    asChild
                  >
                    <Button
                      variant="ghost"
                      className="text-blue-400"
                      disabled={
                        activity.participants.length === field.value?.length
                      }
                    >
                      参加者を追加...
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>参加者を追加</AlertDialogTitle>
                      <AlertDialogDescription>
                        追加する参加者を選択してください。
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <MemberPicker
                      members={candidates}
                      selectedMembers={selectedMembers}
                      updateSelectedMembers={updateSelectedMembers}
                    />
                    <div className="flex gap-x-4">
                      <AlertDialogCancel onClick={handleCancelButtonClick}>
                        キャンセル
                      </AlertDialogCancel>
                      <AlertDialogAction onClick={handleAddMembersButtonClick}>
                        メンバーを追加
                      </AlertDialogAction>
                    </div>
                  </AlertDialogContent>
                </AlertDialog>
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="singlesCount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>シングルス数</FormLabel>
              <Popover
                open={isSinglesComboboxOpen}
                onOpenChange={setIsSinglesComboboxOpen}
              >
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={isSinglesComboboxOpen}
                    >
                      {field.value}
                      <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent>
                  <Command>
                    <CommandGroup>
                      {possibleCourtCounts.map((courtCount) => (
                        <CommandItem
                          key={courtCount}
                          value={courtCount.toString()}
                          onSelect={(currentValue) => {
                            const parsedCurrentValue = parseInt(currentValue);
                            setValue(field.name, parsedCurrentValue);
                            setIsSinglesComboboxOpen(false);
                          }}
                        >
                          <Check
                            className={cn(
                              'mr-2 h-4 w-4',
                              courtCount === field.value
                                ? 'opacity-100'
                                : 'opacity-0',
                            )}
                          />
                          <span>{courtCount}</span>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="doublesCount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ダブルス数</FormLabel>
              <Popover
                open={isDoublesComboboxOpen}
                onOpenChange={setIsDoublesComboboxOpen}
              >
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={isDoublesComboboxOpen}
                    >
                      {field.value}
                      <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent>
                  <Command>
                    <CommandGroup>
                      {possibleCourtCounts.map((courtCount) => (
                        <CommandItem
                          key={courtCount}
                          value={courtCount.toString()}
                          onSelect={(currentValue) => {
                            const parsedCurrentValue = parseInt(currentValue);
                            setValue(field.name, parsedCurrentValue);
                            setIsSinglesComboboxOpen(false);
                          }}
                        >
                          <Check
                            className={cn(
                              'mr-2 h-4 w-4',
                              courtCount === field.value
                                ? 'opacity-100'
                                : 'opacity-0',
                            )}
                          />
                          <span>{courtCount}</span>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
            </FormItem>
          )}
        />
        <Button type="submit">ゲームを開始</Button>
      </form>
    </Form>
  );
};

export default GameForm;
