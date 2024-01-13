import type { SuccessResult } from '@/types/Result';

export type ReturnTypeOf<T extends (...args: never) => Promise<unknown>> =
  T extends (...args: never) => Promise<infer U>
    ? U extends SuccessResult<infer D>
      ? D
      : never
    : never;
