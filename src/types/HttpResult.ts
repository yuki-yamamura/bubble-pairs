import type { Result } from '@/types/Result';

export type HttpResult<T = unknown> = Result<T> & {
  status: number | undefined;
};
