import { levelOptions } from '../../constants/levelOptions';
import { sexOptions } from '../../constants/sexOptions';
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
import { useForm } from 'react-hook-form';

import type { MemberFilter } from '../../validation';

const FilterModalTmp = () => {
  const form = useForm<MemberFilter>({
    defaultValues: {
      sexes: [],
      levels: [],
    },
  });
  const { handleSubmit, control } = form;
  const submitHandler = handleSubmit((data) => console.log(data));

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">絞り込み</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>メンバー絞り込み</AlertDialogTitle>
          <AlertDialogDescription>
            選択した条件に合うメンバーを表示します。
          </AlertDialogDescription>
        </AlertDialogHeader>
        <Form {...form}>
          <form onSubmit={submitHandler}>
            <div>
              <FormLabel>性別</FormLabel>
              <FormField
                control={control}
                name="sexes"
                render={() => (
                  <FormItem>
                    {sexOptions.map(({ label, value }) => (
                      <FormField
                        key={value}
                        control={control}
                        name="sexes"
                        render={({ field }) => (
                          <FormItem key={value}>
                            <FormControl>
                              <Label>
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
            <div>
              <FormLabel>レベル</FormLabel>
              <FormField
                control={control}
                name="levels"
                render={() => (
                  <FormItem>
                    {levelOptions.map(({ label, value }) => (
                      <FormField
                        key={value}
                        control={control}
                        name="levels"
                        render={({ field }) => (
                          <FormItem key={value}>
                            <FormControl>
                              <Label>
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
            <Button type="submit">Submit</Button>
          </form>
        </Form>
        <AlertDialogFooter>
          <AlertDialogCancel>キャンセル</AlertDialogCancel>
          <AlertDialogAction>適用</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default FilterModalTmp;
