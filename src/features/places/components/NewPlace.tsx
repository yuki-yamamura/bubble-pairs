import Loading from '@/components/Loading';
import PlaceForm from '@/features/places/components/PlaceForm';
import { usePlaces } from '@/features/places/hooks/usePlaces';
import axios from 'axios';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import useSWRMutation from 'swr/mutation';

import type { PlaceCreateSchema } from '@/features/places/validation';
import type { PostResponseData } from '@/types/api/places';

const NewPlace = () => {
  const router = useRouter();
  const { places, isLoading } = usePlaces();
  const defaultValues: PlaceCreateSchema = {
    name: '',
    courtCount: 1,
    // set default place if that is a first one.
    isDefault: places.length === 0,
    isDeleted: false,
  };

  const { trigger, isMutating } = useSWRMutation(
    '/api/places',
    (url: string, { arg }: { arg: PlaceCreateSchema }) => {
      return axios
        .post<PostResponseData>(url, arg)
        .then((response) => response.data);
    },
  );

  const handleSubmit = async (fieldValues: PlaceCreateSchema) => {
    try {
      await trigger(fieldValues);
      toast.success('場所を登録しました。');
      await router.push('/settings');
    } catch {
      toast.error('場所を登録できませんでした。');
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <PlaceForm
      defaultValues={defaultValues}
      buttonLabel="場所を登録"
      buttonVariant="primary-green"
      isSubmitting={isMutating}
      onSubmit={handleSubmit}
    />
  );
};

export default NewPlace;
