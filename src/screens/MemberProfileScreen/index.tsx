import MemberProfileForm from '@/features/members/components/MemberProfile';

import type { Member } from '@prisma/client';

type Props = {
  member: Member;
};

const MemberScreen = ({ member }: Props) => (
  <MemberProfileForm member={member} />
);

export default MemberScreen;
