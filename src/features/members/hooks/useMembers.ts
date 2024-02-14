import { type Member } from '@prisma/client';
import axios from 'axios';
import useSWR from 'swr';

import type { GetResponseData } from '@/pages/api/members';
import type { AxiosError } from 'axios';
import type { KeyedMutator } from 'swr';

export const useMembers = (): {
  members: Member[];
  error: AxiosError | undefined;
  isLoading: boolean;
  mutate: KeyedMutator<GetResponseData>;
} => {
  const { data, error, isLoading, mutate } = useSWR<
    GetResponseData,
    AxiosError
  >('/api/members', (url: string) => {
    return axios.get<GetResponseData>(url).then((response) => response.data);
  });

  return {
    members: data?.members ?? [],
    error,
    isLoading,
    mutate,
  };
};
