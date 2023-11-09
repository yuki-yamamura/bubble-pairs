import MemberList from '@/features/members/components/MemberList';
import axios from 'axios';
import useSWR from 'swr';

import type { MembersResponseData } from '@/pages/api/members';

const Members = () => {
  const { data, isLoading } = useSWR<MembersResponseData>(
    '/api/members',
    async (url: string) => {
      return axios
        .get<MembersResponseData>(url)
        .then((response) => response.data);
    },
  );

  if (isLoading) {
    return <div>Loading members...</div>;
  }

  return (
    <>
      <h1>Members</h1>
      {data && <MemberList members={data.members} />}
    </>
  );
};

export default Members;
