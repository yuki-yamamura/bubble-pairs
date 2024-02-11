import Loading from '@/components/Loading';
import PlaceForm from '@/features/places/components/PlaceForm';
import axios from 'axios';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import useSWRMutation from 'swr/mutation';

import type { PlaceCreateSchema } from '@/features/places/validation';
import type { PostResponseData } from '@/pages/api/places';

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

  const handleSubmit = (fieldValues: PlaceCreateSchema) => {
    trigger(fieldValues)
      .then(() => {
        toast.success('場所を追加しました。');
        void router.push('/places');
      })
      .catch(() => toast.error('場所の追加に失敗しました。'));
  };

  if (isMutating) {
    return <Loading />;
  }

  return <PlaceForm defaultValues={defaultValues} onSubmit={handleSubmit} />;
};

export default NewPlace;
