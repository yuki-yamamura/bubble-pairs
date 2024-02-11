import axios from 'axios';
import useSWR from 'swr';

import type { GetResponseData } from '@/pages/api/places';
import type { Place } from '@prisma/client';
import type { AxiosError } from 'axios';
import type { KeyedMutator } from 'swr';

export const usePlaces = (): {
  places: Place[];
  error: AxiosError | undefined;
  isLoading: boolean;
  mutate: KeyedMutator<GetResponseData>;
} => {
  const { data, error, isLoading, mutate } = useSWR<
    GetResponseData,
    AxiosError
  >('/api/places', (url: string) =>
    axios.get<GetResponseData>(url).then((response) => response.data),
  );

  return {
    places: data?.places ?? [],
    error,
    isLoading,
    mutate,
  };
};
