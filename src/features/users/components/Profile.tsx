import UserSection from './UserSection';
import Loading from '@/components/Loading';
import { useSession } from 'next-auth/react';

const Profile = () => {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <Loading />;
  }
  if (status === 'unauthenticated' || !session?.user) {
    throw new Error();
  }

  const { user } = session;

  return (
    <div className="flex flex-col gap-y-12">
      <UserSection id="email" title="現在のメールアドレス" user={user} />
      <UserSection id="name" title="表示名" user={user} />
    </div>
  );
};

export default Profile;
