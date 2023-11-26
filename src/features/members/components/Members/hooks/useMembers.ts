import axios from 'axios';
import useSWR from 'swr';

import type { MembersResponseData } from '@/pages/api/members';
import type { Member } from '@prisma/client';
import type { KeyedMutator } from 'swr';

export const useMembers = (): {
  members: Member[];
  isError: boolean;
  isLoading: boolean;
  mutate: KeyedMutator<MembersResponseData>;
} => {
  const { data, error, isLoading, mutate } = useSWR<MembersResponseData, Error>(
    '/api/members',
    (url: string) => {
      return axios
        .get<MembersResponseData>(url)
        .then((response) => response.data);
    },
  );

  return {
    members: data ? data.members : [],
    isError: !!error,
    isLoading,
    mutate,
  };
};
