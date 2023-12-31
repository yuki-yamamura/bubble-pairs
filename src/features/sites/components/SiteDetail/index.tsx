import Button from '@/components/Button';
import LoadingModal from '@/components/LoadingModal';
import SiteDetailForm from '@/features/sites/components/SiteDetailForm';
import axios from 'axios';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import useSWRMutation from 'swr/mutation';

import type { Site } from '@prisma/client';

type Props = {
  site: Site;
};

const SiteDetail = ({ site }: Props) => {
  const router = useRouter();
  const { trigger, isMutating } = useSWRMutation(
    `/api/sites/${site.id}`,
    async (url: string) => {
      await axios.delete(url);
    },
  );

  const handleDeleteButtonClick = () => {
    trigger()
      .then(() => {
        toast.success('場所を削除しました。');
        void router.push('/sites');
      })
      .catch(() => toast.error('場所を削除できませんでした。'));
  };

  if (isMutating) {
    return <LoadingModal />;
  }

  return (
    <div>
      <SiteDetailForm site={site} />
      <Button color="red" text="場所を削除" onClick={handleDeleteButtonClick} />
    </div>
  );
};

export default SiteDetail;
