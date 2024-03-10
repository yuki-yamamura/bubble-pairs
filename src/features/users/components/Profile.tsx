import DeleteUserButton from './DeleteUserButton';
import EditNameSection from './EditNameSection';
import { useUser } from '@/context/useUser';
import EditEmailSection from '@/features/users/components/EditEmailSection';

const Profile = () => {
  const { user } = useUser();

  return (
    <div>
      <h2 id="account" className="mb-4">
        アカウント
      </h2>
      <div className="flex flex-col gap-y-12">
        <EditEmailSection title="現在のメールアドレス" user={user} />
        <EditNameSection title="表示名" user={user} />
        <div className="mt-20 self-center">
          <DeleteUserButton user={user} />
        </div>
      </div>
    </div>
  );
};

export default Profile;
