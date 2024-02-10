import type { Level, Rule, Sex } from '@prisma/client';

export const MINIMUM_PARTICIPANT_COUNT = 2;

export const SINGLES_PLAYER_COUNT = 2;

export const DOUBLES_PLAYER_COUNT = 4;

export const levelMap = new Map<Level, string>([
  ['BEGINNER', '入門'],
  ['ELEMENTARY', '初心者'],
  ['INTERMEDIATE', '中級者'],
  ['ADVANCED', '上級者'],
]);

export const sexMap = new Map<Sex, string>([
  ['NOT_KNOWN', '不明'],
  ['MALE', '男性'],
  ['FEMALE', '女性'],
]);

export const ruleMap = new Map<Rule, string>([
  ['SINGLES', 'シングルス'],
  ['DOUBLES', 'ダブルス'],
]);
