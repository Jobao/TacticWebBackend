export interface CustomResponseType<T> {
  status: string;
  reason: string;
  data: T;
}
