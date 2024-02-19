import PlaceForm from '@/features/places/components/PlaceForm';
import axios from 'axios';
import toast from 'react-hot-toast';
import useSWRMutation from 'swr/mutation';

import type { PlaceCreateSchema } from '../../validation';
import type { Place } from '@prisma/client';

type Props = {
  place: Place;
};

const PlaceDetail = ({ place }: Props) => {
  const { trigger, isMutating } = useSWRMutation(
    `/api/places/${place.id}`,
    async (url: string, { arg }: { arg: PlaceCreateSchema }) => {
      await axios.put(url, arg);
    },
  );

  const handleSubmit = async (fieldValues: PlaceCreateSchema) => {
    try {
      await trigger(fieldValues);
      toast.success('場所を更新しました。');
    } catch {
      toast.error('場所を更新できませんでした。');
    }
  };

  return (
    <PlaceForm
      defaultValues={place}
      buttonLabel="変更を保存"
      isSubmitting={isMutating}
      onSubmit={handleSubmit}
    />
  );
};

export default PlaceDetail;
