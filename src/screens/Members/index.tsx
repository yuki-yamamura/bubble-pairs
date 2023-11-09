import MemberList from '@/features/members/components/MemberList';

import type { Member } from '@/features/members/types/Member';

const Members = () => {
  const members = [
    {
      id: 1,
      name: 'foo',
    },
    {
      id: 2,
      name: 'bar',
    },
    {
      id: 3,
      name: 'hoge',
    },
  ] as Member[];

  return (
    <>
      <h1>Members</h1>
      <MemberList members={members} />
    </>
  );
};

export default Members;
