/**
 * API utility functions for making requests to the backend
 */

// Base URL for API requests (default to relative path if not set)
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

/**
 * Generic API request function with typing
 */
export async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  // Default headers
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...options.headers as Record<string, string>,
  };
  
  // Add auth token from localStorage if available (in client-side code)
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('auth_token');
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }
  
  const response = await fetch(url, {
    ...options,
    headers,
  });
  
  // Handle HTTP errors
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || `API request failed with status ${response.status}`);
  }
  
  // Parse JSON response
  return await response.json();
}

/**
 * Convenience functions for common HTTP methods
 */
export const api = {
  get: <T>(endpoint: string, options?: RequestInit) => 
    apiRequest<T>(endpoint, { method: 'GET', ...options }),
    
  post: <T>(endpoint: string, data: any, options?: RequestInit) =>
    apiRequest<T>(endpoint, { 
      method: 'POST', 
      body: JSON.stringify(data),
      ...options 
    }),
    
  put: <T>(endpoint: string, data: any, options?: RequestInit) =>
    apiRequest<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
      ...options
    }),
    
  delete: <T>(endpoint: string, options?: RequestInit) =>
    apiRequest<T>(endpoint, { method: 'DELETE', ...options }),
}; 