import axios from 'axios';
import useSWR from 'swr';

import type { GetResponseData } from '@/pages/api/places';
import type { Place } from '@prisma/client';
import type { AxiosError } from 'axios';

export const usePlaces = (): {
  places: Place[];
  isError: boolean;
  isLoading: boolean;
} => {
  const { data, error, isLoading } = useSWR<GetResponseData, AxiosError>(
    '/api/places',
    (url: string) =>
      axios.get<GetResponseData>(url).then((response) => response.data),
  );

  return {
    places: data ? data.places : [],
    isError: !!error,
    isLoading,
  };
};
