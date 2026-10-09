import apiClient from '@/lib/api';
import type { PaginatedResponse } from '@/types/api';

export interface Page {
  id: string;
  slug: string;
  title: string;
  content: Record<string, unknown> | null;
  metaTitle: string | null;
  metaDescription: string | null;
  isPublished: boolean;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ListPagesParams {
  page?: number;
  limit?: number;
  search?: string;
  isPublished?: boolean;
}

export async function listPages(
  params: ListPagesParams = {}
): Promise<PaginatedResponse<Page>['data']> {
  const res = await apiClient.get<PaginatedResponse<Page>>('/admin/pages', { params });
  return res.data.data;
}

export const SUGGESTED_SLUGS = [
  'accueil',
  'a-propos',
  'mentions-legales',
  'politique-confidentialite',
] as const;