import Loading from '@/components/Loading';
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
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from '@/components/ui/command';
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
  activityCreateSchema,
  type ActivityCreateSchemaType,
} from '@/features/activities/validation';
import MemberSelectTable from '@/features/members/components/MemberSelectTable';
import { useMembers } from '@/features/members/hooks/useMembers';
import { getDisplayName } from '@/features/members/utils';
import { usePlaces } from '@/features/places/hooks/usePlaces';
import { cn } from '@/lib/shadcn-ui';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { Check, ChevronDown, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';

import type { GetResponseData } from '@/pages/api/places';
import type { Member } from '@prisma/client';

type Props = {
  onSubmit: (fieldValues: ActivityCreateSchemaType) => void;
};

const ActivityForm = ({ onSubmit }: Props) => {
  const { members, isLoading: loadingMembers } = useMembers();
  const { places, isLoading: loadingPlaces } = usePlaces();
  const [selectedMembers, setSelectedMembers] = useState<Member[]>([]);
  const [isComboboxOpen, setIsComboboxOpen] = useState(false);

  const form = useForm<ActivityCreateSchemaType>({
    defaultValues: async () => {
      const response = await axios.get<GetResponseData>('/api/places');
      const placeId = response.data.places.at(0)?.id as number;

      return {
        participants: [],
        placeId,
        isOpen: true,
      };
    },
    resolver: zodResolver(activityCreateSchema),
  });
  const { control, handleSubmit, getValues, setValue } = form;
  const { append, remove } = useFieldArray({
    control,
    name: 'participants',
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
    setSelectedMembers([]);
  };
  const handleCancelButtonClick = () => {
    setSelectedMembers([]);
  };

  const candidates = members.filter((member) => {
    const participants = getValues('participants');

    if (participants) {
      return !participants.some(({ memberId }) => memberId === member.id);
    } else {
      false;
    }
  });

  const placeOptions = places
    ? places.map((place) => ({
        label: place.name,
        value: place.id,
      }))
    : [];

  if (loadingMembers || loadingPlaces) {
    return <Loading />;
  }

  if (!members || !places) {
    return <div>Something went wrong.</div>;
  }

  return (
    <Form {...form}>
      <form onSubmit={submitHandler}>
        <FormField
          control={control}
          name="participants"
          render={({ field }) => (
            <FormItem>
              <FormLabel>参加者（２名以上）</FormLabel>
              <ul>
                {field.value?.map(({ memberId }, index) => (
                  <li key={memberId}>
                    <div className="flex items-center gap-x-4">
                      <span>
                        {getDisplayName(
                          members.find(
                            (member) => member.id === memberId,
                          ) as Member,
                        )}
                      </span>
                      <Trash2
                        size={16}
                        onClick={() => {
                          remove(index);
                        }}
                      />
                    </div>
                  </li>
                ))}
              </ul>
              <FormControl>
                <AlertDialog>
                  <AlertDialogTrigger
                    disabled={members.length === field.value?.length}
                    asChild
                  >
                    <Button
                      variant="ghost"
                      className="text-blue-400"
                      disabled={members.length === field.value?.length}
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
                    <MemberSelectTable
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
          name="placeId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>場所</FormLabel>
              <Popover open={isComboboxOpen} onOpenChange={setIsComboboxOpen}>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={isComboboxOpen}
                    >
                      {
                        placeOptions.find(
                          (placeItem) => placeItem.value === field.value,
                        )?.label
                      }
                      <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent>
                  <Command>
                    <CommandEmpty>場所が見つかりませんでした</CommandEmpty>
                    <CommandGroup>
                      {placeOptions.map(({ label, value }) => (
                        <CommandItem
                          key={value}
                          value={value.toString()}
                          onSelect={(currentValue) => {
                            const parsedCurrentValue = parseInt(currentValue);
                            setValue(field.name, parsedCurrentValue);
                            setIsComboboxOpen(false);
                          }}
                        >
                          <Check
                            className={cn(
                              'mr-2 h-4 w-4',
                              value === field.value
                                ? 'opacity-100'
                                : 'opacity-0',
                            )}
                          />
                          <span>{label}</span>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default ActivityForm;
