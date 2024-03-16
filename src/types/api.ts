export interface APIResponse<TData> {
  message?: string;
  error?: string;
  data?: TData;
}
