import MemberDetail from '@/features/members/components/MemberDetail';

import type { Member } from '@prisma/client';

type Props = {
  member: Member;
};
const MemberDetailScreen = ({ member }: Props) => (
  <div className="mx-auto w-full max-w-screen-md sm:px-10">
    <MemberDetail member={member} />
  </div>
);

export default MemberDetailScreen;
