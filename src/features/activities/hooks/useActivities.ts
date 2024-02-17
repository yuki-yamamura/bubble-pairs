import axios from 'axios';
import useSWR from 'swr';

import type { GetResponseData } from '@/types/api/activities';
import type { Activity } from '@/types/models/Activity';
import type { AxiosError } from 'axios';
import type { KeyedMutator } from 'swr';

export const useActivities = (): {
  activities: Activity[] | undefined;
  error: AxiosError | undefined;
  isLoading: boolean;
  mutate: KeyedMutator<GetResponseData>;
} => {
  const { data, error, isLoading, mutate } = useSWR<
    GetResponseData,
    AxiosError
  >('/api/activities', (url: string) => {
    return axios.get<GetResponseData>(url).then((response) => response.data);
  });

  return {
    activities: data?.activities ?? [],
    error,
    isLoading,
    mutate,
  };
};
