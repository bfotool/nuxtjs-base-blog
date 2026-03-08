// ============================================
// Blog Post
// ============================================
export interface Author {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  social?: {
    twitter?: string;
    github?: string;
    linkedin?: string;
  };
}

export interface Post {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  category: Category;
  tags: string[];
  author: Author;
  publishedAt: string;
  updatedAt?: string;
  readingTime: number;
  featured: boolean;
}

// ============================================
// Category
// ============================================
export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  postCount: number;
}

// ============================================
// API Response Wrappers
// ============================================
export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
}

// ============================================
// Contact Form
// ============================================
export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactResponse {
  success: boolean;
  message: string;
}

// ============================================
// Search
// ============================================
export interface SearchParams {
  query?: string;
  category?: string;
  tag?: string;
  page?: number;
  pageSize?: number;
  sortBy?: "date" | "title" | "readingTime";
  sortOrder?: "asc" | "desc";
}

// ============================================
// Toast / Notification
// ============================================
export type ToastType = "success" | "error" | "info" | "warning";

export interface Toast {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  duration?: number;
}
