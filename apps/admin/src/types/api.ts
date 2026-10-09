/** Format standard des réponses paginées du backend SFPA */
export interface PaginatedResponse<T> {
  success: true;
  data: {
    items: T[];
    pagination: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
      hasNext: boolean;
      hasPrev: boolean;
    };
  };
}

export interface SingleResponse<T> {
  success: true;
  data: T;
}

export interface ApiError {
  success: false;
  message: string;
}