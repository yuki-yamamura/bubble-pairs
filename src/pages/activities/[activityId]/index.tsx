import { findActivityById } from '@/features/activities/logic/repository';
import ActivityDetailScreen from '@/screens/activities/[activityId]';

import type { Activity } from '@/types/models/Activity';
import type { GetServerSideProps } from 'next';
import type { ParsedUrlQuery } from 'querystring';

type Params = ParsedUrlQuery & {
  activityId: string;
};

type Props = {
  activity: Activity;
};

export const getServerSideProps: GetServerSideProps<Props, Params> = async ({
  params,
}) => {
  const { activityId } = params as Params;
  const result = await findActivityById(activityId);

  if (result.type === 'success') {
    if (!result.data) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        activity: result.data,
      },
    };
  } else {
    console.error(result.error);
    throw result.error;
  }
};

const Page = ({ activity }: Props) => (
  <ActivityDetailScreen activity={activity} />
);

export default Page;
