import MemberProfileForm from './MemberProfileForm';
import Button from '@/components/Button';
import LoadingModal from '@/components/LoadingModal';
import axios from 'axios';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import useSWRMutation from 'swr/mutation';

import type { Member } from '@prisma/client';

type Props = {
  member: Member;
};

const MemberProfile = ({ member }: Props) => {
  const router = useRouter();
  const { trigger, isMutating } = useSWRMutation(
    `/api/members/${member.id}`,
    async (url: string) => {
      await axios.delete(url);
    },
  );
  const notifySuccess = () => toast.success('メンバーを削除しました。');
  const notifyError = () => toast.error('メンバーを削除できませんでした。');

  const handleDeleteButtonClick = () => {
    trigger()
      .then(async () => {
        notifySuccess();
        await router.push('/members');
      })
      .catch(() => notifyError());
  };

  if (isMutating) {
    return <LoadingModal />;
  }

  return (
    <div>
      <MemberProfileForm member={member} />
      <Button
        color="red"
        text="メンバーを削除"
        onClick={handleDeleteButtonClick}
      />
    </div>
  );
};

export default MemberProfile;
