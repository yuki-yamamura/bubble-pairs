export type SuccessResult<T> = {
  type: 'success';
  data: T;
};

export type ErrorResult<E> = {
  type: 'error';
  error: E;
};

export type Result<T = unknown, E extends Error = Error> =
  | SuccessResult<T>
  | ErrorResult<E>;
