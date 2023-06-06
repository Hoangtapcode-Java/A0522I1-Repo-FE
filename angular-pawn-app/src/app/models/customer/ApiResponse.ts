export interface ApiResponse<T> {
  message: string;
  data: { customer: T };
}
