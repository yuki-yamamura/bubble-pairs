import axios, { isAxiosError } from 'axios';

import type { HttpResult } from '@/types/HttpResult';
import type { AxiosRequestConfig } from 'axios';

export const request = <T>(
  axiosRequestConfig: AxiosRequestConfig,
): Promise<HttpResult<T>> => {
  return axios<T>(axiosRequestConfig)
    .then((response) => {
      const { data, status } = response;
      const result: HttpResult<T> = {
        type: 'success',
        data,
        status,
      };

      return result;
    })
    .catch((error) => {
      if (isAxiosError(error)) {
        const result: HttpResult<T> = {
          type: 'error',
          error,
          status: error.status,
        };

        return result;
      }

      throw error;
    });
};
