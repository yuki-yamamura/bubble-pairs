import axios from 'axios';
import useSWR from 'swr';

import type { GetResponseData } from '@/pages/api/members';
import type { Member } from '@prisma/client';
import type { KeyedMutator } from 'swr';

export const useMembers = (): {
  members: Member[];
  isError: boolean;
  isLoading: boolean;
  mutate: KeyedMutator<GetResponseData>;
} => {
  const { data, error, isLoading, mutate } = useSWR<GetResponseData, Error>(
    '/api/members',
    (url: string) => {
      return axios.get<GetResponseData>(url).then((response) => response.data);
    },
  );

  return {
    members: data ? data.members : [],
    isError: !!error,
    isLoading,
    mutate,
  };
};
