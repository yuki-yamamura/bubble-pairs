import type { Game } from '@prisma/client';

export type GetResponseData = {
  games: Game[];
};

export type PostResponseData = {
  game: Game;
};
