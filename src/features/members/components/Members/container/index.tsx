import Component from '../presentation';
import axios from 'axios';
import useSWR from 'swr';

import type { MembersResponseData } from '@/pages/api/members';

const Members = () => {
  const { data, isLoading } = useSWR('/api/members', async (url: string) => {
    return axios
      .get<MembersResponseData>(url)
      .then((response) => response.data);
  });
  if (!data) {
    return <div>Something went wrong.</div>;
  }

  return <Component isLoading={isLoading} members={data.members} />;
};

export default Members;
