import { usePlaces } from '@/features/places/hooks/usePlaces';
import {
  defaultPlaceSchema,
  type DefaultPlaceSchema,
} from '@/features/places/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useEffect, useMemo } from 'react';
import { useForm, type UseFormReturn } from 'react-hook-form';
import useSWRMutation from 'swr/mutation';

import type { Place } from '@prisma/client';

export const useDefaultPlaceForm = (): {
  currentDefaultPlace: Place | undefined;
  form: UseFormReturn<DefaultPlaceSchema>;
  isBusy: boolean;
  sortedPlaces: Place[];
  submitHandler: () => Promise<void>;
} => {
  const { places, mutate } = usePlaces();
  const currentDefaultPlace = places.find((place) => place.isDefault);
  const defaultValues: DefaultPlaceSchema = useMemo(
    () => ({
      placeId: currentDefaultPlace?.id ?? places[0].id,
    }),
    [currentDefaultPlace, places],
  );
  const form = useForm<DefaultPlaceSchema>({
    defaultValues,
    resolver: zodResolver(defaultPlaceSchema),
  });
  const { handleSubmit, reset } = form;
  const { trigger, isMutating } = useSWRMutation(
    '/api/places/default',
    async (url: string, { arg }: { arg: DefaultPlaceSchema }) => {
      await axios.post(url, arg);
    },
  );

  const submitHandler = handleSubmit(async (fieldValues) => {
    await trigger(fieldValues);
    await mutate();
  });

  // make sure that the default place is the first choice in the options.
  const sortedPlaces = currentDefaultPlace
    ? [currentDefaultPlace, ...places.filter((place) => !place.isDefault)]
    : places;

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  return {
    currentDefaultPlace,
    form,
    isBusy: isMutating,
    sortedPlaces,
    submitHandler,
  };
};
