import axios from 'axios';
import useSWR from 'swr';

import type { GetResponseData } from '@/types/api/activities/[activityId]';
import type { Activity } from '@/types/models/Activity';
import type { AxiosError } from 'axios';
import type { KeyedMutator } from 'swr';

export const useActivity = (
  activityId: Activity['id'],
): {
  activity: Activity | undefined;
  error: AxiosError | undefined;
  isLoading: boolean;
  mutate: KeyedMutator<GetResponseData>;
} => {
  const { data, error, isLoading, mutate } = useSWR<
    GetResponseData,
    AxiosError
  >(`/api/activities/${activityId}`, (url: string) => {
    return axios.get<GetResponseData>(url).then((response) => response.data);
  });

  return {
    activity: data?.activity,
    error,
    isLoading,
    mutate,
  };
};
