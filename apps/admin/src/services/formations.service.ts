import apiClient from '@/lib/api';
import type { PaginatedResponse } from '@/types/api';

export const FORMATION_CATEGORIES = [
  'agriculture', 'batiment', 'mecanique', 'artisanat', 'numerique', 'autre',
] as const;

export type FormationCategory = (typeof FORMATION_CATEGORIES)[number];

export const FORMATION_CATEGORY_LABELS: Record<FormationCategory, string> = {
  agriculture: 'Agriculture',
  batiment: 'Bâtiment',
  mecanique: 'Mécanique',
  artisanat: 'Artisanat',
  numerique: 'Numérique',
  autre: 'Autre',
};

export interface Formation {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  description: string | null;
  objectives: string[];
  duration: string | null;
  level: string | null;
  audience: string | null;
  category: FormationCategory;
  coverImageId: string | null;
  coverImage?: {
    id: string; url: string; thumbnailUrl: string; alt: string | null;
  } | null;
  displayOrder: number;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ListFormationsParams {
  page?: number;
  limit?: number;
  category?: string;
  search?: string;
}

export async function listFormations(
  params: ListFormationsParams = {}
): Promise<PaginatedResponse<Formation>['data']> {
  const res = await apiClient.get<PaginatedResponse<Formation>>('/admin/formations', { params });
  return res.data.data;
}