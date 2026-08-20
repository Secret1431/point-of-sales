export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
}

export interface QueryParam {
    page?: number;
    limit?: number;
    search?: string;
}

export interface PaginationMeta {
    page: number;
    limit: number;
    search: string;
    total: number;
    totalPages: number;
    
}