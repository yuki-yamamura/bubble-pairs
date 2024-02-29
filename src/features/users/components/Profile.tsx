import UserSection from './UserSection';
import { useUser } from '@/context/useUser';

const Profile = () => {
  const { user } = useUser();

  return (
    <div className="flex flex-col gap-y-12">
      <UserSection id="email" title="現在のメールアドレス" user={user} />
      <UserSection id="name" title="表示名" user={user} />
    </div>
  );
};

export default Profile;
