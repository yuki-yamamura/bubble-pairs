import LoadingModal from '@/components/LoadingModal';
import SiteForm from '@/features/sites/components/BaseSiteForm';
import axios from 'axios';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import useSWRMutation from 'swr/mutation';

import type { SiteFormType } from '@/features/sites/validation';
import type { PostResponseData } from '@/pages/api/sites';
import type { Prisma } from '@prisma/client';

const NewSiteForm = () => {
  const router = useRouter();
  const defaultValues: SiteFormType = {
    name: '',
    courtCount: 1,
    isDefault: false,
  };

  const { trigger, isMutating } = useSWRMutation<
    PostResponseData,
    Error,
    '/api/sites',
    Prisma.SiteCreateInput
  >('/api/sites', (url: string, { arg }: { arg: Prisma.SiteCreateInput }) => {
    return axios
      .post<PostResponseData>(url, arg)
      .then((response) => response.data);
  });

  const handleSubmit = (fieldValues: SiteFormType) => {
    trigger(fieldValues)
      .then(() => {
        toast.success('場所を追加しました。');
        void router.push('/sites');
      })
      .catch(() => toast.error('場所の追加に失敗しました。'));
  };

  if (isMutating) {
    return <LoadingModal />;
  }

  return (
    <SiteForm
      defaultValues={defaultValues}
      submitButtonLabel="場所を保存"
      submitSite={handleSubmit}
    />
  );
};

export default NewSiteForm;
