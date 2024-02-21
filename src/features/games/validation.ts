import { DOUBLES_PLAYER_COUNT, SINGLES_PLAYER_COUNT } from '@/constants';
import axios from 'axios';
import { z } from 'zod';

import type { GetResponseData } from '@/types/api/activities/[activityId]';

export type GameCreateSchema = z.infer<typeof gameCreateSchema>;

export const gameCreateSchema = z
  .object({
    activityId: z.string(),
    memberIds: z.array(
      z.object({
        memberId: z.string(),
      }),
    ),
    singlesCount: z.coerce.number(),
    doublesCount: z.coerce.number(),
  })
  .refine(
    ({ singlesCount, doublesCount }) => {
      return singlesCount + doublesCount !== 0;
    },
    {
      message: '試合数を選択してください。',
      path: ['doublesCount'],
    },
  )
  .refine(
    async ({ activityId, singlesCount, doublesCount }) => {
      const response = await axios.get<GetResponseData>(
        `/api/activities/${activityId}`,
      );
      const { activity } = response.data;
      const { courtCount } = activity.place;

      return singlesCount + doublesCount <= courtCount;
    },
    ({ singlesCount, doublesCount }) => ({
      message: '試合数の合計をコート数以下に変更してください。',
      path: [singlesCount < doublesCount ? 'doublesCount' : 'singlesCount'],
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
      message: '参加者を追加するか、試合数を変更してください。',
      path: ['memberIds'],
    },
  );
