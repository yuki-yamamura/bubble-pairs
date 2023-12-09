type SuccessResult<T> = {
  type: 'success';
  data: T;
};

type ErrorResult = {
  type: 'error';
  error: Error;
};

export type Result<T = unknown> = SuccessResult<T> | ErrorResult;
