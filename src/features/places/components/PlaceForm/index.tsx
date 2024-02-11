import { Button } from '@/components/ui/button';
import { Form, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  placeCreateSchema,
  type PlaceCreateSchema,
} from '@/features/places/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

type Props = {
  defaultValues: PlaceCreateSchema;
  onSubmit: (fieldValues: PlaceCreateSchema) => void;
};

const PlaceForm = ({ defaultValues, onSubmit }: Props) => {
  const form = useForm<PlaceCreateSchema>({
    defaultValues,
    resolver: zodResolver(placeCreateSchema),
  });
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = form;

  const submitHandler = handleSubmit((fieldValues) => {
    onSubmit(fieldValues);
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
      <Button type="submit">変更を保存</Button>
    </Form>
  );
};

export default PlaceForm;
