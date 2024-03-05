import EmptyState from '@/components/EmptyState';
import Link from '@/components/Link';
import Loading from '@/components/Loading';
import { MINIMUM_PARTICIPANT_COUNT } from '@/constants';
import ActivityForm from '@/features/activities/components/ActivityForm';
import { useMembers } from '@/features/members/hooks/useMembers';
import { usePlaces } from '@/features/places/hooks/usePlaces';
import axios from 'axios';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import useSWRMutation from 'swr/mutation';

import type { ActivityCreateSchema } from '@/features/activities/validation';
import type { PostResponseData } from '@/types/api/activities';
import type { MutationFetcher } from 'swr/mutation';

const NewActivity = () => {
  const router = useRouter();
  const { members, isLoading: isLoadingMembers } = useMembers();
  const { places, isLoading: isLoadingPlaces } = usePlaces();
  const fetcher: MutationFetcher<
    PostResponseData,
    '/api/activities',
    ActivityCreateSchema
  > = async (key, { arg }) => {
    return axios
      .post<PostResponseData>(key, arg)
      .then((response) => response.data);
  };
  const { trigger, isMutating } = useSWRMutation('/api/activities', fetcher);

  const handleSubmit = async (fieldValues: ActivityCreateSchema) => {
    try {
      const data = await trigger(fieldValues);
      await router.push(`/activities/${data.activity.id}`);
      toast.success('アクティビティを開始しました。');
    } catch {
      toast.error('アクティビティを開始できませんでした。');
    }
  };

  if (isLoadingMembers || isLoadingPlaces) {
    return <Loading />;
  }

  if (members.length < MINIMUM_PARTICIPANT_COUNT) {
    return (
      <EmptyState src="/images/looking-for-friends.png" alt="exploring">
        <div className="flex flex-col items-center leading-7">
          <p>アクティビティを開始するには 2 名以上のメンバーが必要です。</p>
          <p>
            <Link href="/members/new">メンバーを登録</Link>しましょう。
          </p>
        </div>
      </EmptyState>
    );
  }

  if (places.length === 0) {
    return (
      <EmptyState src="/images/exploring-the-globe.png" alt="exploring">
        <div className="text-center leading-7">
          <p>
            アクティビティを開始するには
            <Link href="/settings/places/new">場所の登録</Link>
            が必要です。
          </p>
        </div>
      </EmptyState>
    );
  }

  return (
    <ActivityForm
      members={members}
      places={places}
      isSubmitting={isMutating}
      onSubmit={handleSubmit}
    />
  );
};

export default NewActivity;
