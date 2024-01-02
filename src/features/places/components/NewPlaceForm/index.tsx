import LoadingModal from '@/components/LoadingModal';
import BasePlaceForm from '@/features/places/components/BasePlaceForm';
import axios from 'axios';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import useSWRMutation from 'swr/mutation';

import type { PlaceFormType } from '@/features/places/validation';
import type { PostResponseData } from '@/pages/api/places';
import type { Prisma } from '@prisma/client';

const NewPlaceForm = () => {
  const router = useRouter();
  const defaultValues: PlaceFormType = {
    name: '',
    courtCount: 1,
    isDefault: false,
  };

  const { trigger, isMutating } = useSWRMutation<
    PostResponseData,
    Error,
    '/api/places',
    Prisma.PlaceCreateInput
  >('/api/places', (url: string, { arg }: { arg: Prisma.PlaceCreateInput }) => {
    return axios
      .post<PostResponseData>(url, arg)
      .then((response) => response.data);
  });

  const handleSubmit = (fieldValues: PlaceFormType) => {
    trigger(fieldValues)
      .then(() => {
        toast.success('場所を追加しました。');
        void router.push('/places');
      })
      .catch(() => toast.error('場所の追加に失敗しました。'));
  };

  if (isMutating) {
    return <LoadingModal />;
  }

  return (
    <BasePlaceForm
      defaultValues={defaultValues}
      submitButtonLabel="場所を保存"
      submitPlace={handleSubmit}
    />
  );
};

export default NewPlaceForm;
