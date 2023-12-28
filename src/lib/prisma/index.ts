import {
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
} from '@prisma/client/runtime/library';

import type { Result } from '@/types/Result';

export const withResult = <T>(
  callback: () => Promise<T>,
): (() => Promise<Result<T>>) => {
  return async () => {
    try {
      const result = await callback();

      return {
        type: 'success',
        data: result,
      };
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError ||
        error instanceof PrismaClientValidationError
      ) {
        return {
          type: 'error',
          error,
        };
      }

      throw error;
    }
  };
};
