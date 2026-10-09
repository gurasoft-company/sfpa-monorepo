import apiClient from '@/lib/api';
import type { PaginatedResponse } from '@/types/api';

export interface Contact {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  phone: string | null;
  isRead: boolean;
  adminNotes: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ListContactsParams {
  page?: number;
  limit?: number;
  isRead?: boolean;
  search?: string;
}

export async function listContacts(
  params: ListContactsParams = {}
): Promise<PaginatedResponse<Contact>['data']> {
  const res = await apiClient.get<PaginatedResponse<Contact>>('/admin/contacts', { params });
  return res.data.data;
}