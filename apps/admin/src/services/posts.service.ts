import apiClient from '@/lib/api';
import type { PaginatedResponse } from '@/types/api';

export const POST_CATEGORIES = [
  'Actualité', 'Événement', 'Rapport', 'Témoignage', 'Presse', 'Autre',
] as const;

export type PostCategory = (typeof POST_CATEGORIES)[number];

export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string | null;
  coverImageId: string | null;
  coverImage?: {
    id: string; url: string; thumbnailUrl: string; alt: string | null;
  } | null;
  category: string | null;
  tags: string[];
  isPublished: boolean;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ListPostsParams {
  page?: number;
  limit?: number;
  category?: string;
  search?: string;
}

export async function listPosts(
  params: ListPostsParams = {}
): Promise<PaginatedResponse<Post>['data']> {
  const res = await apiClient.get<PaginatedResponse<Post>>('/admin/posts', { params });
  return res.data.data;
}