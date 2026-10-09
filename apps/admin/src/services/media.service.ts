import apiClient from '@/lib/api';
import type { PaginatedResponse, SingleResponse } from '@/types/api';

export interface Media {
  id: string;
  filename: string;
  originalName: string;
  url: string;
  thumbnailUrl: string;
  alt: string | null;
  caption: string | null;
  mimeType: string;
  size: number;
  width: number | null;
  height: number | null;
  folder: string;
  createdAt: string;
}

export const MEDIA_FOLDERS = [
  'projects', 'posts', 'pages', 'partners',
  'formations', 'testimonials', 'general',
] as const;

export type MediaFolder = (typeof MEDIA_FOLDERS)[number];

export const FOLDER_LABELS: Record<MediaFolder | 'all', string> = {
  all: 'Tous les dossiers',
  projects: 'Projets',
  posts: 'Articles',
  pages: 'Pages',
  partners: 'Partenaires',
  formations: 'Formations',
  testimonials: 'Témoignages',
  general: 'Général',
};

export interface ListMediaParams {
  page?: number;
  limit?: number;
  folder?: string;
}

export async function listMedia(
  params: ListMediaParams = {}
): Promise<PaginatedResponse<Media>['data']> {
  const res = await apiClient.get<PaginatedResponse<Media>>('/admin/media', { params });
  return res.data.data;
}

export interface UploadMediaPayload {
  file: File;
  folder?: MediaFolder;
  alt?: string;
  caption?: string;
}

export async function uploadMedia(payload: UploadMediaPayload): Promise<Media> {
  const form = new FormData();
  form.append('image', payload.file);
  form.append('folder', payload.folder ?? 'general');
  if (payload.alt) form.append('alt', payload.alt);
  if (payload.caption) form.append('caption', payload.caption);

  const res = await apiClient.post<SingleResponse<{ media: Media }>>(
    '/admin/media/upload',
    form
  );
  return res.data.data.media;
}

export async function deleteMedia(id: string): Promise<void> {
  await apiClient.delete(`/admin/media/${id}`);
}

export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} o`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} Ko`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} Mo`;
}