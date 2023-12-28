import MemberProfileForm from '@/features/members/components/MemberProfile';

import type { Member } from '@prisma/client';

import styles from './index.module.scss';

type Props = {
  member: Member;
};

const MemberScreen = ({ member }: Props) => (
  <>
    <h1 className={styles.title}>メンバー プロフィール</h1>
    <MemberProfileForm member={member} />
  </>
);

export default MemberScreen;
