import Loading from '@/components/Loading';
import ActivityForm from '@/features/activities/components/ActivityForm';
import axios from 'axios';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import useSWRMutation from 'swr/mutation';

import type { ActivityCreateSchemaType } from '@/features/activities/validation';
import type { PostResponseData } from '@/pages/api/activities';

const NewActivity = () => {
  const router = useRouter();
  const { trigger, isMutating } = useSWRMutation(
    '/api/activities',
    (url: string, { arg }: { arg: ActivityCreateSchemaType }) => {
      return axios
        .post<PostResponseData>(url, arg)
        .then((response) => response.data);
    },
  );

  const handleSubmit = (fieldValues: ActivityCreateSchemaType) => {
    trigger(fieldValues)
      .then(() => {
        toast.success('アクティビティを追加しました');
        void router.push('/activities');
      })
      .catch(() => toast.error('アクティビティの追加に失敗しました'));
  };

  if (isMutating) {
    return <Loading />;
  }

  return <ActivityForm onSubmit={handleSubmit} />;
};

export default NewActivity;
