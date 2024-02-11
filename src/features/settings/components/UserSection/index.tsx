import UserDeleteButton from './UserDeleteButton';
import { Avatar, AvatarImage } from '@/components/ui/avatar';

const UserSection = () => {
  return (
    <section id="user">
      <div className="mb-8 flex items-center gap-x-4">
        <Avatar>
          <AvatarImage src="/images/dolphin.png" alt="guest" />
        </Avatar>
        <div>ゲストユーザー</div>
      </div>
      <UserDeleteButton />
    </section>
  );
};

export default UserSection;
