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
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Label } from '@/components/ui/label';
import { levelMap, sexMap } from '@/features/members/constants';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import type { MemberFilterType } from '@/features/members/validation';

type Props = {
  isFilterActive: boolean;
  defaultValues: MemberFilterType;
  onSubmit: (filter: MemberFilterType) => void;
};

const FilterModal = ({ isFilterActive, defaultValues, onSubmit }: Props) => {
  const [open, setOpen] = useState(false);
  const form = useForm<MemberFilterType>({ defaultValues });
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
          className={cn(isFilterActive && 'border-blue-400')}
        >
          絞り込み
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>メンバー絞り込み</AlertDialogTitle>
          <AlertDialogDescription>
            選択した条件に合うメンバーを表示します。
          </AlertDialogDescription>
        </AlertDialogHeader>
        <Form {...form}>
          <form>
            <div>
              <FormLabel>性別</FormLabel>
              <FormField
                control={control}
                name="sexes"
                render={() => (
                  <FormItem>
                    {Array.from(sexMap).map(([value, label]) => (
                      <FormField
                        key={value}
                        control={control}
                        name="sexes"
                        render={({ field }) => (
                          <FormItem key={value}>
                            <FormControl>
                              <Label className="flex gap-x-2">
                                <Checkbox
                                  checked={field.value.includes(value)}
                                  onCheckedChange={(checked) => {
                                    if (checked) {
                                      field.onChange([...field.value, value]);
                                    } else {
                                      field.onChange(
                                        field.value.filter(
                                          (sex) => sex !== value,
                                        ),
                                      );
                                    }
                                  }}
                                  className="h-[14px] w-[14px]"
                                />
                                <span>{label}</span>
                              </Label>
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    ))}
                  </FormItem>
                )}
              />
            </div>
            <div className="mt-4">
              <FormLabel>レベル</FormLabel>
              <FormField
                control={control}
                name="levels"
                render={() => (
                  <FormItem>
                    {Array.from(levelMap).map(([value, label]) => (
                      <FormField
                        key={value}
                        control={control}
                        name="levels"
                        render={({ field }) => (
                          <FormItem key={value}>
                            <FormControl>
                              <Label className="flex gap-x-2">
                                <Checkbox
                                  checked={field.value.includes(value)}
                                  onCheckedChange={(checked) => {
                                    if (checked) {
                                      field.onChange([...field.value, value]);
                                    } else {
                                      field.onChange(
                                        field.value.filter(
                                          (level) => level !== value,
                                        ),
                                      );
                                    }
                                  }}
                                  className="h-[14px] w-[14px]"
                                />
                                <span>{label}</span>
                              </Label>
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    ))}
                  </FormItem>
                )}
              />
            </div>
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

export default FilterModal;
