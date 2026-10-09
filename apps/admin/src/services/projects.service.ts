import apiClient from '@/lib/api';
import type { PaginatedResponse} from '@/types/api';

export const PROJECT_CATEGORIES = [
  'formation', 'agriculture', 'eau', 'energie', 'reforestation', 'autre',
] as const;

export const PROJECT_STATUSES = ['en_cours', 'termine', 'a_venir'] as const;

export type ProjectCategory = (typeof PROJECT_CATEGORIES)[number];
export type ProjectStatus = (typeof PROJECT_STATUSES)[number];

export const CATEGORY_LABELS: Record<ProjectCategory, string> = {
  formation: 'Formation', agriculture: 'Agriculture', eau: 'Eau',
  energie: 'Énergie', reforestation: 'Reforestation', autre: 'Autre',
};

export const STATUS_LABELS: Record<ProjectStatus, string> = {
  en_cours: 'En cours', termine: 'Terminé', a_venir: 'À venir',
};

export interface Project {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  description: string | null;
  category: ProjectCategory;
  country: string | null;
  status: ProjectStatus;
  coverImageId: string | null;
  coverImage?: {
    id: string; url: string; thumbnailUrl: string; alt: string | null;
  } | null;
  startDate: string | null;
  endDate: string | null;
  isPublished: boolean;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ListProjectsParams {
  page?: number;
  limit?: number;
  category?: string;
  status?: string;
  search?: string;
}

export async function listProjects(
  params: ListProjectsParams = {}
): Promise<PaginatedResponse<Project>['data']> {
  const res = await apiClient.get<PaginatedResponse<Project>>('/admin/projects', { params });
  return res.data.data;
}

export interface ProjectInput {
  title: string;
  excerpt?: string | null;
  description?: string | null;
  category: ProjectCategory;
  country?: string | null;
  status: ProjectStatus;
  coverImageId?: string | null;
  startDate?: string | null;
  endDate?: string | null;
  isPublished: boolean;
}