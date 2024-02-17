import MemberDetail from '@/features/members/components/MemberDetail';

import type { Member } from '@prisma/client';

type Props = {
  member: Member;
};
const MemberDetailScreen = ({ member }: Props) => (
  <MemberDetail member={member} />
);

export default MemberDetailScreen;
