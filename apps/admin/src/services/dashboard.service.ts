import apiClient from '@/lib/api';
import type { SingleResponse } from '@/types/api';

export interface DashboardStats {
  content: {
    projects: { total: number; published: number };
    posts: { total: number; published: number };
    pages: { total: number };
    partners: { total: number; published: number };
    formations: { total: number };
    media: { total: number };
  };
  forms: {
    members: { total: number; pending: number };
    volunteers: { total: number; pending: number };
    contacts: { total: number; unread: number };
  };
  recent: {
    members: RecentPerson[];
    volunteers: RecentPerson[];
    contacts: RecentContact[];
  };
}

interface RecentPerson {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: string;
  status: string;
}

interface RecentContact {
  id: string;
  name: string;
  email: string;
  subject: string;
  createdAt: string;
  isRead: boolean;
}

export async function getDashboardStats(): Promise<DashboardStats> {
  const res = await apiClient.get<SingleResponse<DashboardStats>>(
    '/admin/dashboard/stats'
  );
  return res.data.data;
}