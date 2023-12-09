export type HttpResponse<T, K> = {
  data?: T;
  error?: K;
  status: number;
};
