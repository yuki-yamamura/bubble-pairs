import { findGameById } from '@/features/games/logic/repository';
import GameDetailScreen from '@/screens/activities/[activityId]/games/[gameId]';

import type { Game } from '@/types/models/Game';
import type { GetServerSideProps } from 'next';
import type { ParsedUrlQuery } from 'querystring';

type Params = ParsedUrlQuery & {
  gameId: string;
};

type Props = {
  game: Game;
};

export const getServerSideProps: GetServerSideProps<Props, Params> = async ({
  params,
}) => {
  const { gameId } = params as Params;
  const result = await findGameById(gameId);

  if (result.type === 'success') {
    if (!result.data) {
      throw new Error('Game not found.');
    }

    return {
      props: {
        game: result.data,
      },
      notFound: false,
    };
  } else {
    throw result.error;
  }
};

const Page = ({ game }: Props) => <GameDetailScreen game={game} />;

export default Page;
