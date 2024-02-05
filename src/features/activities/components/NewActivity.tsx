import Loading from '@/components/Loading';
import { MINIMUM_PARTICIPANT_COUNT } from '@/constants';
import ActivityForm from '@/features/activities/components/ActivityForm';
import { useMembers } from '@/features/members/hooks/useMembers';
import { usePlaces } from '@/features/places/hooks/usePlaces';
import axios from 'axios';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import useSWRMutation from 'swr/mutation';

import type { ActivityCreateSchemaType } from '@/features/activities/validation';
import type { PostResponseData } from '@/pages/api/activities';

const NewActivity = () => {
  const router = useRouter();
  const { members, isLoading: loadingMembers } = useMembers();
  const { places, isLoading: loadingPlaces } = usePlaces();
  const { trigger, isMutating } = useSWRMutation(
    '/api/activities',
    (url: string, { arg }: { arg: ActivityCreateSchemaType }) => {
      return axios
        .post<PostResponseData>(url, arg)
        .then((response) => response.data);
    },
  );

  const handleSubmit = async (fieldValues: ActivityCreateSchemaType) => {
    try {
      const { activity } = await trigger(fieldValues);
      toast.success('アクティビティを追加しました');
      await router.push(`/activities/${activity.id}`);
    } catch {
      toast.error('アクティビティの追加に失敗しました');
    }
  };

  if (isMutating || loadingMembers || loadingPlaces) {
    return <Loading />;
  }

  if (!members || !places) {
    throw new Error();
  }

  if (members.length <= MINIMUM_PARTICIPANT_COUNT) {
    // navigate new member form.
  }
  if (places.length === 0) {
    // navigate new  place form
  }

  return (
    <ActivityForm members={members} places={places} onSubmit={handleSubmit} />
  );
};

export default NewActivity;
