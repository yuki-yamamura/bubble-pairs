import PageContainer from '@/components/PageContainer';
import MemberDetail from '@/features/members/components/MemberDetail';

import type { Member } from '@prisma/client';

type Props = {
  member: Member;
};
const MemberDetailScreen = ({ member }: Props) => (
  <PageContainer title="Members">
    <MemberDetail member={member} />
  </PageContainer>
);

export default MemberDetailScreen;
