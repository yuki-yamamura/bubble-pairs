import dayjs from 'dayjs';

import type { Result } from '@/types/Result';

/**
 * Parses the passed JSON
 * @param json
 * @returns result of parsing the JSON
 */
export const parseJson = (json: string): Result => {
  try {
    const obj: unknown = JSON.parse(json, (_key: string, value: string) => {
      if (typeof value === 'string' && dayjs(value).isValid()) {
        return dayjs(value).toDate();
      } else {
        return value;
      }
    });

    return { type: 'success', data: obj };
  } catch (error) {
    return { type: 'error', error: new Error(`Could not parse JSON: ${json}`) };
  }
};
