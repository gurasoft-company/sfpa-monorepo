import apiClient from '@/lib/api';
import type { PaginatedResponse } from '@/types/api';

export const MEMBER_STATUSES = ['pending', 'approved', 'rejected'] as const;
export const MEMBERSHIP_TYPES = ['actif', 'bienfaiteur', 'honneur'] as const;

export type MemberStatus = (typeof MEMBER_STATUSES)[number];
export type MembershipType = (typeof MEMBERSHIP_TYPES)[number];

export const MEMBERSHIP_LABELS: Record<MembershipType, string> = {
  actif: 'Actif',
  bienfaiteur: 'Bienfaiteur',
  honneur: 'Honneur',
};

export interface Member {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
  address: string | null;
  city: string | null;
  country: string | null;
  motivation: string | null;
  status: MemberStatus;
  membershipType: MembershipType | null;
  adminNotes: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ListMembersParams {
  page?: number;
  limit?: number;
  status?: string;
  search?: string;
}

export async function listMembers(
  params: ListMembersParams = {}
): Promise<PaginatedResponse<Member>['data']> {
  const res = await apiClient.get<PaginatedResponse<Member>>('/admin/members', { params });
  return res.data.data;
}