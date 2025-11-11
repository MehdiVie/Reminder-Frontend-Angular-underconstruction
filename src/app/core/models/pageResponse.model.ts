export interface PageResponse<T> {
  content: T[];
  totalItems: number;
  totalPages: number;
  currentPage: number;      // current page
  size: number;
}