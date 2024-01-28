import axios from 'axios';
import { useMemo, useState } from 'react';
import useSWR from 'swr';

import type { MemberFilter } from '../validation';
import type { GetResponseData } from '@/pages/api/members';
import type { Member } from '@prisma/client';
import type { KeyedMutator } from 'swr';

export const useMembers = (): {
  members: Member[];
  isError: boolean;
  isLoading: boolean;
  mutate: KeyedMutator<GetResponseData>;
  filter: MemberFilter;
  onFilterChange: (filter: MemberFilter) => void;
  displayMembers: Member[];
} => {
  const [filter, setFilter] = useState<MemberFilter>({
    levels: [],
    sexes: [],
  });
  const { data, error, isLoading, mutate } = useSWR<GetResponseData, Error>(
    '/api/members',
    (url: string) => {
      return axios.get<GetResponseData>(url).then((response) => response.data);
    },
  );

  const handleFilterChange = (filter: MemberFilter) => setFilter(filter);

  const displayMembers = useMemo(() => {
    let _members = data?.members ?? [];
    _members =
      filter.levels.length === 0
        ? _members
        : _members.filter((member) => filter.levels.includes(member.level));
    _members =
      filter.sexes.length === 0
        ? _members
        : _members.filter((member) => filter.sexes.includes(member.sex));

    return _members;
  }, [data, filter]);

  return {
    members: data ? data.members : [],
    isError: !!error,
    isLoading,
    mutate,
    filter: filter,
    onFilterChange: handleFilterChange,
    displayMembers,
  };
};
