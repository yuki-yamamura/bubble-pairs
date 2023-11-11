import axios from 'axios';
import useSWR from 'swr';

import type { MembersResponseData } from '@/pages/api/members';
import type { Member } from '@prisma/client';

export const useMembers = (): {
  members: Member[];
  isError: boolean;
  isLoading: boolean;
} => {
  const { data, error, isLoading } = useSWR<MembersResponseData, Error>(
    '/api/members',
    (url: string) => {
      return axios
        .get<MembersResponseData>(url)
        .then((response) => response.data);
    },
  );
  const members = data ? data.members : [];
  const isError = error !== undefined;

  return {
    members,
    isError,
    isLoading,
  };
};
