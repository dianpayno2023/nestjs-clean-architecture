export interface MetaResponse {
  page: number;
  limit: number;
  total_items: number;
  total_pages: number;
}

export interface ResponsePayload<T> {
  message: string;
  data: T;
  meta?: MetaResponse | null;
}

export interface ApiResponse<T> {
  code: number;
  status: 'success' | 'error';
  message: string;
  data: T;
  metadata: MetaResponse | null;
}
