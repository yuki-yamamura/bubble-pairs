import { DOUBLES_PLAYER_COUNT, SINGLES_PLAYER_COUNT } from '@/constants';
import { z } from 'zod';

export type GameCreateSchema = z.infer<typeof gameCreateSchema>;

export const gameCreateSchema = z
  .object({
    activityId: z.string(),
    memberIds: z.array(
      z.object({
        memberId: z.string(),
      }),
    ),
    gameCount: z.coerce.number(),
    singlesCount: z.coerce.number(),
    doublesCount: z.coerce.number(),
  })
  .refine(
    ({ singlesCount, doublesCount }) => {
      return singlesCount + doublesCount !== 0;
    },
    {
      path: ['singlesCount'],
    },
  )
  .refine(
    ({ singlesCount, doublesCount }) => {
      return singlesCount + doublesCount !== 0;
    },
    {
      path: ['doublesCount'],
      message: '1 試合ごとの内訳を入力してください。',
    },
  )
  // todo: enable commented out code below and write test for it after solving the error
  // Error: Async refinement encountered during synchronous parse operation. Use .parseAsync instead.

  // .refine(
  //   async ({ activityId, singlesCount, doublesCount }) => {
  //     const response = await axios.get<GetResponseData>(
  //       `/api/activities/${activityId}`,
  //     );
  //     const { activity } = response.data;
  //     const { courtCount } = activity.place;

  //     return singlesCount + doublesCount <= courtCount;
  //   },
  //   ({ singlesCount, doublesCount }) => ({
  //     message: '試合数の合計をコート数以下に変更してください。',
  //     path: [singlesCount < doublesCount ? 'doublesCount' : 'singlesCount'],
  //   }),
  // )
  .refine(
    ({ memberIds, singlesCount, doublesCount }) => {
      const playerCount =
        singlesCount * SINGLES_PLAYER_COUNT +
        doublesCount * DOUBLES_PLAYER_COUNT;

      return playerCount <= memberIds.length;
    },
    {
      message: '参加者が足りません。',
      path: ['memberIds'],
    },
  );
