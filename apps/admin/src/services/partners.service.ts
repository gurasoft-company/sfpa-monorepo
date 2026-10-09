import apiClient from '@/lib/api';
import type { PaginatedResponse } from '@/types/api';

export const PARTNER_TYPES = [
  'ecole', 'entreprise', 'collectivite', 'association', 'autre',
] as const;

export type PartnerType = (typeof PARTNER_TYPES)[number];

export const PARTNER_TYPE_LABELS: Record<PartnerType, string> = {
  ecole: 'École',
  entreprise: 'Entreprise',
  collectivite: 'Collectivité',
  association: 'Association',
  autre: 'Autre',
};

export interface Partner {
  id: string;
  name: string;
  type: PartnerType;
  description: string | null;
  logoId: string | null;
  logo?: {
    id: string; url: string; thumbnailUrl: string; alt: string | null;
  } | null;
  website: string | null;
  country: string | null;
  displayOrder: number;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ListPartnersParams {
  page?: number;
  limit?: number;
  type?: string;
  search?: string;
}

export async function listPartners(
  params: ListPartnersParams = {}
): Promise<PaginatedResponse<Partner>['data']> {
  const res = await apiClient.get<PaginatedResponse<Partner>>('/admin/partners', { params });
  return res.data.data;
}