import EditNameSection from './EditNameSection';
import { useUser } from '@/context/useUser';
import DeleteUserButton from '@/features/users/components/DeleteUserButton';
import EditEmailSection from '@/features/users/components/EditEmailSection';

const Profile = () => {
  const { user } = useUser();

  return (
    <div className="flex flex-col gap-y-12">
      <EditEmailSection title="現在のメールアドレス" user={user} />
      <EditNameSection title="表示名" user={user} />
      <div className="mt-20 self-center">
        <DeleteUserButton user={user} />
      </div>
    </div>
  );
};

export default Profile;
