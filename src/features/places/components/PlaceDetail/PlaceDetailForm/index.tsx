import BasePlaceForm from '../../BasePlaceForm';
import LoadingModal from '@/components/LoadingModal';
import axios from 'axios';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import useSWRMutation from 'swr/mutation';

import type { PlaceFormType } from '@/features/places/validation';
import type { Place } from '@prisma/client';

type Props = {
  place: Place;
};

const PlaceDetailForm = ({ place }: Props) => {
  const router = useRouter();
  const { trigger, isMutating } = useSWRMutation(
    `/api/places/${place.id}`,
    async (url: string, { arg }: { arg: PlaceFormType }) => {
      await axios.put(url, arg);
    },
  );

  const submitPlace = (fieldValues: PlaceFormType) => {
    trigger(fieldValues)
      .then(() => {
        toast.success('場所を更新しました。');
        void router.push('/places');
      })
      .catch(() => toast.error('場所を更新できませんでした。'));
  };

  if (isMutating) {
    return <LoadingModal />;
  }

  return (
    <BasePlaceForm
      defaultValues={place}
      submitButtonLabel={'変更を保存する'}
      submitPlace={submitPlace}
    />
  );
};

export default PlaceDetailForm;
