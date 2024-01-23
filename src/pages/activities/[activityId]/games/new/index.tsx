import Loading from '@/components/Loading';
import NewGamesScreen from '@/screens/NewGamesScreen';
import axios from 'axios';
import { useRouter } from 'next/router';
import useSWR from 'swr';

import type { GetResponseData } from '@/pages/api/activities/[activityId]';

const Page = () => {
  // todo: these code is a temporary solution, so revise them after finishing to create a modal.
  const router = useRouter();
  const { activityId } = router.query;

  const { data, isLoading } = useSWR<GetResponseData>(
    `/api/activities/${activityId as string}`,
    (url: string) => {
      return axios.get<GetResponseData>(url).then((response) => response.data);
    },
  );

  if (isLoading) {
    return <Loading />;
  }

  return data && <NewGamesScreen activity={data.activity} />;
};

export default Page;
