import MemberList from '@/features/members/components/MemberList';
import { fakeMembers } from '@/mocks/fake-data/members';

const Members = () => {
  return (
    <>
      <h1>Members</h1>
      <MemberList members={fakeMembers} />
    </>
  );
};

export default Members;
