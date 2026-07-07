// Health Check API Response
export interface HealthResponse {
  status: 'ok' | 'error'
  timestamp: string
  uptime: number
  version: string
}

// API Error Response
export interface ApiErrorResponse {
  error: string
  message: string
  statusCode: number
}

// API Success Response
export interface ApiSuccessResponse<T = any> {
  success: boolean
  data: T
  message?: string
}

// Pagination
export interface PaginationParams {
  page: number
  limit: number
}

export interface PaginatedResponse<T = any> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}