import EmojiPickerModal from '@/components/EmojiPickerModal';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { levelMap, sexMap } from '@/features/members/constants';
import { memberCreateSchema } from '@/features/members/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import type {
  MemberCreateSchemaType,
  MemberUpdateSchemaType,
} from '@/features/members/validation';
import type { EmojiClickData } from 'emoji-picker-react';

type Props = {
  defaultValues: MemberCreateSchemaType | MemberUpdateSchemaType;
  onSubmit: (fieldValues: MemberCreateSchemaType) => void;
};
const MemberForm = ({ defaultValues, onSubmit }: Props) => {
  const form = useForm<MemberCreateSchemaType>({
    defaultValues,
    resolver: zodResolver(memberCreateSchema),
  });
  const { control, register, getValues, setValue } = form;
  const emojiUnicode = getValues('emojiUnicode');
  const submitHandler = form.handleSubmit((fieldValues) => {
    onSubmit(fieldValues);
  });

  const handleEmojiSelect = (emoji: EmojiClickData, _e: MouseEvent) => {
    setValue('emojiUnicode', emoji.unified, { shouldValidate: true });
  };

  return (
    <Form {...form}>
      <EmojiPickerModal
        initialEmojiUnicode={emojiUnicode}
        onEmojiClick={handleEmojiSelect}
      />
      <form onSubmit={submitHandler}>
        <FormItem>
          <FormLabel>名前（必須）</FormLabel>
          <FormControl>
            <Input {...register('name')} />
          </FormControl>
        </FormItem>
        <FormItem>
          <FormLabel>かな</FormLabel>
          <FormControl>
            <Input {...register('kana')} />
          </FormControl>
        </FormItem>
        <FormItem>
          <FormLabel>表示名</FormLabel>
          <FormControl>
            <Input {...register('displayName')} />
          </FormControl>
        </FormItem>
        <FormField
          control={control}
          name="sex"
          render={({ field }) => (
            <FormItem>
              <FormLabel>性別（必須）</FormLabel>
              <FormControl>
                <RadioGroup
                  defaultValue={field.value}
                  onValueChange={field.onChange}
                  className="flex gap-x-4"
                >
                  {Array.from(sexMap).map(([value, label]) => (
                    <FormItem key={value}>
                      <FormControl>
                        <Label>
                          <RadioGroupItem value={value} />
                          <span>{label}</span>
                        </Label>
                      </FormControl>
                    </FormItem>
                  ))}
                </RadioGroup>
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="level"
          render={({ field }) => (
            <FormItem>
              <FormLabel>レベル（必須）</FormLabel>
              <FormControl>
                <RadioGroup
                  id="hoge"
                  defaultValue={field.value}
                  onValueChange={field.onChange}
                  className="flex gap-x-4"
                >
                  {Array.from(levelMap).map(([value, label]) => (
                    <FormItem key={value}>
                      <FormControl>
                        <Label>
                          <RadioGroupItem value={value} />
                          <span>{label}</span>
                        </Label>
                      </FormControl>
                    </FormItem>
                  ))}
                </RadioGroup>
              </FormControl>
            </FormItem>
          )}
        />
        <FormItem>
          <FormLabel>メモ</FormLabel>
          <FormControl>
            <Textarea {...register('note')} />
          </FormControl>
        </FormItem>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default MemberForm;
