import PlaceForm from '@/features/places/components/PlaceForm';
import axios from 'axios';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import useSWRMutation from 'swr/mutation';

import type { PlaceCreateSchema } from '@/features/places/validation';
import type { PostResponseData } from '@/types/api/places';

const NewPlace = () => {
  const router = useRouter();
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
      toast.success('活動場所を追加しました。');
      await router.push('/settings');
    } catch {
      toast.error('活動場所の追加に失敗しました。');
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
