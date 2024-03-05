import {
  defaultPlaceSchema,
  type DefaultPlaceSchema,
} from '@/features/places/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useForm, type UseFormReturn } from 'react-hook-form';
import useSWRMutation from 'swr/mutation';

import type { Place } from '@prisma/client';

type Props = {
  defaultPlace: Place;
};

export const useDefaultPlaceForm = ({
  defaultPlace,
}: Props): {
  form: UseFormReturn<DefaultPlaceSchema>;
  isBusy: boolean;
  submitHandler: () => Promise<void>;
} => {
  const form = useForm<DefaultPlaceSchema>({
    defaultValues: {
      placeId: defaultPlace.id,
    },
    resolver: zodResolver(defaultPlaceSchema),
  });
  const { handleSubmit } = form;
  const { trigger, isMutating } = useSWRMutation(
    '/api/places/default',
    async (url: string, { arg }: { arg: DefaultPlaceSchema }) => {
      await axios.post(url, arg);
    },
  );

  const submitHandler = handleSubmit(async (fieldValues) => {
    await trigger(fieldValues);
  });

  return {
    form,
    isBusy: isMutating,
    submitHandler,
  };
};
