export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  errors?: any;
  pagination?: Pagination;
}

export interface Pagination {
  page: number;
  pageSize: number;
  totalResults?: number;
  totalPages?: number;
}
