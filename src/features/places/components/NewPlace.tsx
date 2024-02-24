import PlaceForm from '@/features/places/components/PlaceForm';
import axios from 'axios';
import toast from 'react-hot-toast';
import useSWRMutation from 'swr/mutation';

import type { PlaceCreateSchema } from '@/features/places/validation';
import type { PostResponseData } from '@/types/api/places';

const NewPlace = () => {
  const defaultValues: PlaceCreateSchema = {
    name: '',
    courtCount: 1,
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
      toast.success('場所を追加しました。');
    } catch {
      toast.error('場所の追加に失敗しました。');
    }
  };

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
