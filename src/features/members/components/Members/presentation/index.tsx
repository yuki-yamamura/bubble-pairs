import MemberList from '@/features/members/components/MemberList';

import type { Member } from '@prisma/client';

type Props = {
  isLoading: boolean;
  members: Member[];
};
const Component = ({ isLoading, members }: Props) => {
  if (isLoading) {
    return <div>Loading members...</div>;
  }

  return (
    <>
      <h1>Members</h1>
      <MemberList members={members} />
    </>
  );
};

export default Component;
