import apiClient from '@/lib/api';
import type { PaginatedResponse } from '@/types/api';

export const VOLUNTEER_STATUSES = ['pending', 'approved', 'rejected'] as const;
export type VolunteerStatus = (typeof VOLUNTEER_STATUSES)[number];

export interface Volunteer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
  city: string | null;
  country: string | null;
  skills: string | null;
  availability: string | null;
  message: string | null;
  status: VolunteerStatus;
  adminNotes: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ListVolunteersParams {
  page?: number;
  limit?: number;
  status?: string;
  search?: string;
}

export async function listVolunteers(
  params: ListVolunteersParams = {}
): Promise<PaginatedResponse<Volunteer>['data']> {
  const res = await apiClient.get<PaginatedResponse<Volunteer>>('/admin/volunteers', { params });
  return res.data.data;
}