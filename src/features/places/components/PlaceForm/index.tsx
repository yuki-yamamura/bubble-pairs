import { usePlaceForm } from './usePlaceForm';
import Button from '@/components/Button';
import { Form, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useEffect } from 'react';

import type { ButtonProps } from '@/components/ui/button';
import type { PlaceCreateSchema } from '@/features/places/validation';

type Props = {
  defaultValues: PlaceCreateSchema;
  buttonLabel: string;
  buttonVariant: ButtonProps['variant'];
  isSubmitting: boolean;
  onSubmit: (fieldValues: PlaceCreateSchema) => Promise<void>;
};

const PlaceForm = ({
  defaultValues,
  buttonLabel,
  buttonVariant,
  isSubmitting,
  onSubmit,
}: Props) => {
  const { form, submitHandler } = usePlaceForm({
    defaultValues,
    onSubmit,
  });
  const {
    formState: { errors },
    register,
    setFocus,
  } = form;

  useEffect(() => {
    setFocus('name');
  }, [setFocus]);

  return (
    <Form {...form}>
      <form
        onSubmit={submitHandler}
        className="mx-auto flex w-full max-w-sm flex-col gap-y-6"
      >
        <FormItem>
          <FormLabel htmlFor="name" className="required">
            名前
          </FormLabel>
          <Input id="name" placeholder="体育館" {...register('name')} />
          {errors.name && <FormMessage>{errors.name.message}</FormMessage>}
        </FormItem>
        <FormItem>
          <FormLabel htmlFor="courtCount" className="required">
            コート数
          </FormLabel>
          <Input
            id="courtCount"
            type="number"
            placeholder="1"
            {...register('courtCount', { valueAsNumber: true })}
          />
          {errors.courtCount && (
            <FormMessage>{errors.courtCount.message}</FormMessage>
          )}
        </FormItem>
        <Button
          type="submit"
          isBusy={isSubmitting}
          variant={buttonVariant}
          className="self-center"
        >
          {buttonLabel}
        </Button>
      </form>
    </Form>
  );
};

export default PlaceForm;
