import { Level, type Member, Sex } from '@prisma/client';
import axios from 'axios';
import { useCallback, useMemo, useState } from 'react';
import useSWR from 'swr';

import type { MemberFilter, MemberSort } from '@/features/members/validation';
import type { GetResponseData } from '@/pages/api/members';
import type { KeyedMutator } from 'swr';

export const useMembers = (): {
  members: Member[];
  isError: boolean;
  isLoading: boolean;
  mutate: KeyedMutator<GetResponseData>;
  filter: MemberFilter;
  sort: MemberSort;
  onFilterChange: (filter: MemberFilter) => void;
  onSortChange: (sort: MemberSort) => void;
} => {
  const [filter, setFilter] = useState<MemberFilter>({
    levels: [],
    sexes: [],
  });
  const [sort, setSort] = useState<MemberSort>({
    sortKey: 'createdAt',
  });
  const { data, error, isLoading, mutate } = useSWR<GetResponseData, Error>(
    '/api/members',
    (url: string) => {
      return axios.get<GetResponseData>(url).then((response) => response.data);
    },
  );

  const handleFilterChange = (filter: MemberFilter) => setFilter(filter);
  const handleSortChange = (sort: MemberSort) => setSort(sort);

  const getCompareFn = useCallback(() => {
    switch (sort.sortKey) {
      case 'createdAt': {
        return (a: Member, b: Member) => (a.createdAt > b.createdAt ? 1 : -1);
      }
      case 'level': {
        const levelOrderList = Object.values(Level);

        return (a: Member, b: Member) =>
          levelOrderList.indexOf(a.level) - levelOrderList.indexOf(b.level);
      }
      case 'sex': {
        const sexOrderList = [Sex.MALE, Sex.FEMALE, Sex.NOT_KNOWN];

        return (a: Member, b: Member) =>
          sexOrderList.indexOf(a.sex) - sexOrderList.indexOf(b.sex);
      }
      default: {
        const _check: never = sort.sortKey;
      }
    }
  }, [sort]);

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

    _members = _members.sort(getCompareFn());

    return _members;
  }, [data, filter, getCompareFn]);

  return {
    members: displayMembers,
    isError: !!error,
    isLoading,
    mutate,
    filter,
    sort,
    onFilterChange: handleFilterChange,
    onSortChange: handleSortChange,
  };
};
