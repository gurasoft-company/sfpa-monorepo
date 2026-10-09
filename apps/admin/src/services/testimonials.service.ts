import apiClient from '@/lib/api';
import type { PaginatedResponse } from '@/types/api';

export const TESTIMONIAL_STATUSES = ['pending', 'approved', 'rejected'] as const;
export type TestimonialStatus = (typeof TESTIMONIAL_STATUSES)[number];

export const TESTIMONIAL_STATUS_LABELS: Record<TestimonialStatus, string> = {
  pending: 'En attente',
  approved: 'Approuvé',
  rejected: 'Rejeté',
};

export interface Testimonial {
  id: string;
  authorName: string;
  authorEmail: string | null;
  authorRole: string | null;
  authorLocation: string | null;
  authorImageId: string | null;
  authorImage?: {
    id: string; url: string; thumbnailUrl: string; alt: string | null;
  } | null;
  quote: string;
  rating: number | null;
  status: TestimonialStatus;
  isFeatured: boolean;
  displayOrder: number;
  adminNotes: string | null;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ListTestimonialsParams {
  page?: number;
  limit?: number;
  status?: string;
  search?: string;
}

export async function listTestimonials(
  params: ListTestimonialsParams = {}
): Promise<PaginatedResponse<Testimonial>['data']> {
  const res = await apiClient.get<PaginatedResponse<Testimonial>>(
    '/admin/testimonials',
    { params }
  );
  return res.data.data;
}