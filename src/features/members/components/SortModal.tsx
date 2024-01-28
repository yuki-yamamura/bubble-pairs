import { sortKeys } from '../constants';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import type { MemberSortType } from '@/features/members/validation';

type Props = {
  isSortActive: boolean;
  defaultValues: MemberSortType;
  onSubmit: (sort: MemberSortType) => void;
};
const SortModal = ({ isSortActive, defaultValues, onSubmit }: Props) => {
  const [open, setOpen] = useState(false);
  const form = useForm<MemberSortType>({ defaultValues });
  const { control, reset } = form;
  const handleSubmit = form.handleSubmit((data) => {
    onSubmit(data);
    setOpen(false);
  });
  const handleCancel = () => {
    reset();
    setOpen(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button
          variant="outline"
          className={cn(isSortActive && 'border-blue-400')}
        >
          並び替え
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>メンバー並び替え</AlertDialogTitle>
          <AlertDialogDescription>
            選択した条件でメンバーを並び替えます。
          </AlertDialogDescription>
        </AlertDialogHeader>
        <Form {...form}>
          <form>
            <FormLabel>並び順</FormLabel>
            <FormField
              control={control}
              name="sortKey"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <RadioGroup
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                    >
                      {sortKeys.map(({ label, value }) => (
                        <FormItem key={value}>
                          <FormLabel>{label}</FormLabel>
                          <FormControl>
                            <RadioGroupItem value={value} />
                          </FormControl>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                </FormItem>
              )}
            />
          </form>
        </Form>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleCancel}>
            キャンセル
          </AlertDialogCancel>
          <AlertDialogAction onClick={handleSubmit}>適用</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default SortModal;
