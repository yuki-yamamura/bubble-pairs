import { findActivityById } from '@/features/activities/logic/repository';
import PublishedActivityDetailScreen from '@/screens/activities/[activityId]/published';

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

  if (result.type === 'error') {
    console.error(result.error);
    throw result.error;
  }
  // as well as an activity not found, a closed activity does not show any page.
  //   closed activities
  const { data: activity } = result;
  if (!activity?.isOpen) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      activity,
    },
  };
};

const Page = ({ activity }: Props) => (
  <PublishedActivityDetailScreen activity={activity} />
);

export default Page;
