export type APIResponse<TData> = {
  status: number;
  message?: string;
  data?: TData;
};
