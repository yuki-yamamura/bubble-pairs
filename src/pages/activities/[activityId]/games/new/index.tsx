import { findActivityById } from '@/features/activities/logic/repository';
import NewGameScreen from '@/screens/activities/[activityId]/games/new';

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

const Page = ({ activity }: Props) => <NewGameScreen activity={activity} />;

export default Page;
