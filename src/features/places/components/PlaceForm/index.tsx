import { usePlaceForm } from './usePlaceForm';
import Button from '@/components/Button';
import { Form, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import type { ButtonProps } from '@/components/ui/button';
import type { PlaceCreateSchema } from '@/features/places/validation';

type Props = {
  defaultValues: PlaceCreateSchema;
  buttonLabel: string;
  buttonVariant: ButtonProps['variant'];
  isSubmitting: boolean;
  onSubmit: (fieldValues: PlaceCreateSchema) => void;
};

const PlaceForm = ({
  defaultValues,
  buttonLabel,
  buttonVariant,
  isSubmitting,
  onSubmit,
}: Props) => {
  const { form, errors, register, shouldDisableSubmitButton, submitHandler } =
    usePlaceForm({
      defaultValues,
      onSubmit,
    });

  return (
    <Form {...form}>
      <form onSubmit={submitHandler}>
        <FormItem>
          <FormLabel>
            場所名
            <Input {...register('name')} />
          </FormLabel>
          {errors.name && <FormMessage>{errors.name.message}</FormMessage>}
        </FormItem>
        <FormItem>
          <FormLabel>
            コート数
            <Input type="number" {...register('courtCount')} />
          </FormLabel>
          {errors.courtCount && (
            <FormMessage>{errors.courtCount.message}</FormMessage>
          )}
        </FormItem>
      </form>
      <Button
        type="submit"
        isBusy={isSubmitting}
        disabled={shouldDisableSubmitButton}
        variant={buttonVariant}
      >
        {buttonLabel}
      </Button>
    </Form>
  );
};

export default PlaceForm;
