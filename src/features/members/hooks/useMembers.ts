import { type Member } from '@prisma/client';
import axios from 'axios';
import useSWR from 'swr';

import type { GetResponseData } from '@/pages/api/members';
import type { AxiosError } from 'axios';

export const useMembers = (): {
  members: Member[] | undefined;
  error: AxiosError | undefined;
  isLoading: boolean;
} => {
  const { data, error, isLoading } = useSWR<GetResponseData, AxiosError>(
    '/api/members',
    (url: string) => {
      return axios.get<GetResponseData>(url).then((response) => response.data);
    },
  );

  return {
    members: data?.members,
    error,
    isLoading,
  };
};
