import MemberList from '@/features/members/components/MemberList';
import axios from 'axios';
import useSWR from 'swr';

import type { Member } from '@/features/members/types/Member';

const Members = () => {
  const { data, isLoading } = useSWR('/api/members', async (url: string) => {
    return axios
      .get<{ members: Member[] }>(url)
      .then((response) => response.data);
  });

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
