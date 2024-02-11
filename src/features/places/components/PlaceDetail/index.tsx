import Loading from '@/components/Loading';
import PlaceForm from '@/features/places/components/PlaceForm';
import axios from 'axios';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import useSWRMutation from 'swr/mutation';

import type { PlaceCreateSchema } from '../../validation';
import type { Place } from '@prisma/client';

type Props = {
  place: Place;
};

const PlaceDetail = ({ place }: Props) => {
  const router = useRouter();
  const { trigger, isMutating } = useSWRMutation(
    `/api/places/${place.id}`,
    async (url: string, { arg }: { arg: PlaceCreateSchema }) => {
      await axios.put(url, arg);
    },
  );

  const handleSubmit = async (fieldValues: PlaceCreateSchema) => {
    console.log({ fieldValues });
    try {
      await trigger(fieldValues);
      toast.success('場所を更新しました。');
      await router.push('/places');
    } catch {
      toast.error('場所を更新できませんでした。');
    }
  };

  if (isMutating) {
    return <Loading />;
  }

  return <PlaceForm defaultValues={place} onSubmit={handleSubmit} />;
};

export default PlaceDetail;
