import {
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
} from '@prisma/client/runtime/library';

import type { Result } from '@/types/Result';

/**
 * A utility function for the CRUD operations provided by Prisma.
 * @param callback A function that executes a CRUD operation.
 * @returns Result type with generic
 */
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
