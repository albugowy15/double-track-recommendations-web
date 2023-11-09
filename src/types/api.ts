export interface APIResponse<TData> {
  status: number;
  message?: string;
  data?: TData;
}
