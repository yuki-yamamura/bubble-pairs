import axios from 'axios';
import useSWR from 'swr';

import type { GetResponseData } from '@/pages/api/activities';
import type { Activity } from '@/types/models/Activity';
import type { AxiosError } from 'axios';

export const useActivities = (): {
  activities: Activity[] | undefined;
  error: AxiosError | undefined;
  isLoading: boolean;
} => {
  const { data, error, isLoading } = useSWR<GetResponseData, AxiosError>(
    '/api/activities',
    (url: string) => {
      return axios.get<GetResponseData>(url).then((response) => response.data);
    },
  );

  return {
    activities: data?.activities,
    error,
    isLoading,
  };
};