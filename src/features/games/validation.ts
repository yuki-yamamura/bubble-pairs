import { DOUBLES_PLAYER_COUNT, SINGLES_PLAYER_COUNT } from '@/constants';
import { activitySchema } from '@/features/activities/validation';
import { z } from 'zod';

export type GameCreateSchema = z.infer<typeof gameCreateSchema>;

export const gameCreateSchema = z
  .object({
    activity: activitySchema,
    memberIds: z.array(
      z.object({
        memberId: z.string(),
      }),
    ),
    singlesCount: z.coerce.number(),
    doublesCount: z.coerce.number(),
  })
  .refine(
    ({ activity, singlesCount, doublesCount }) => {
      const { courtCount } = activity.place;

      return singlesCount + doublesCount <= courtCount;
    },
    ({ singlesCount, doublesCount }) => ({
      message: '試合数の合計がコート数以下になる様に変更してください。',
      path: [singlesCount, doublesCount],
    }),
  )
  .refine(
    ({ memberIds, singlesCount, doublesCount }) => {
      const playerCount =
        singlesCount * SINGLES_PLAYER_COUNT +
        doublesCount * DOUBLES_PLAYER_COUNT;

      return playerCount <= memberIds.length;
    },
    {
      message: '参加者を追加してください。',
      path: ['memberIds'],
    },
  )
  .refine(
    ({ singlesCount, doublesCount }) => {
      return singlesCount + doublesCount !== 0;
    },
    {
      message: '試合数を入力してください。',
      path: ['singlesCount, doublesCount'],
    },
  );
