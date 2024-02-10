import { DOUBLES_PLAYER_COUNT, SINGLES_PLAYER_COUNT } from '@/constants';

export const calculateSinglesPlayerCount = (singlesCount: number): number => {
  return singlesCount * SINGLES_PLAYER_COUNT;
};

export const calculateDoublesPlayerCount = (doublesCount: number): number => {
  return doublesCount * DOUBLES_PLAYER_COUNT;
};

export const calculateTotalPlayers = (
  singlesCount: number,
  doublesCount: number,
): number => {
  return (
    calculateSinglesPlayerCount(singlesCount) +
    calculateDoublesPlayerCount(doublesCount)
  );
};
