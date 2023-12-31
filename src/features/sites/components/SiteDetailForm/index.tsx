import SiteForm from '../SiteForm';
import LoadingModal from '@/components/LoadingModal';
import axios from 'axios';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import useSWRMutation from 'swr/mutation';

import type { SiteFormType } from '@/features/sites/validation';
import type { Site } from '@prisma/client';

type Props = {
  site: Site;
};

const SiteDetailForm = ({ site }: Props) => {
  const router = useRouter();
  const { trigger, isMutating } = useSWRMutation(
    `/api/sites/${site.id}}`,
    async (url: string, { arg }: { arg: SiteFormType }) => {
      await axios.put(url, arg);
    },
  );

  const submitSite = (fieldValues: SiteFormType) => {
    trigger(fieldValues)
      .then(() => {
        toast.success('場所を更新しました。');
        void router.push('/sites');
      })
      .catch(() => toast.error('場所を更新できませんでした。'));
  };

  if (isMutating) {
    return <LoadingModal />;
  }

  return (
    <SiteForm
      defaultValues={site}
      submitButtonLabel={'変更を保存する'}
      submitSite={submitSite}
    />
  );
};

export default SiteDetailForm;
