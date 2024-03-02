import { findActivityById } from '@/features/activities/logic/repository';
import { findGameById } from '@/features/games/logic/repository';
import GameDetailScreen from '@/screens/activities/[activityId]/games/[gameId]';

import type { Activity } from '@/types/models/Activity';
import type { Game } from '@/types/models/Game';
import type { GetServerSideProps } from 'next';
import type { ParsedUrlQuery } from 'querystring';

type Params = ParsedUrlQuery & {
  activityId: string;
  gameId: string;
};

type Props = {
  activity: Activity;
  game: Game;
};

export const getServerSideProps: GetServerSideProps<Props, Params> = async ({
  params,
}) => {
  const { activityId, gameId } = params as Params;
  const activityResult = await findActivityById(activityId);
  const gameResult = await findGameById(gameId);

  if (activityResult.type === 'error') {
    console.error(activityResult.error);
    throw activityResult.error;
  }
  if (gameResult.type === 'error') {
    console.error(gameResult.error);
    throw gameResult.error;
  }
  const { data: activity } = activityResult;
  const { data: game } = gameResult;

  if (!activity || !game) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      activity,
      game,
    },
  };
};

const Page = ({ activity, game }: Props) => (
  <GameDetailScreen activity={activity} game={game} />
);

export default Page;
