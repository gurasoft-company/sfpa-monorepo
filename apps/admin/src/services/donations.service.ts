import apiClient from '@/lib/api';
import type { PaginatedResponse, SingleResponse } from '@/types/api';

export const DONATION_STATUSES = [
  'pending', 'paid', 'failed', 'refunded', 'cancelled',
] as const;
export const DONATION_FREQUENCIES = ['once', 'monthly'] as const;

export type DonationStatus = (typeof DONATION_STATUSES)[number];
export type DonationFrequency = (typeof DONATION_FREQUENCIES)[number];

export const DONATION_STATUS_LABELS: Record<DonationStatus, string> = {
  pending: 'En attente',
  paid: 'Payé',
  failed: 'Échoué',
  refunded: 'Remboursé',
  cancelled: 'Annulé',
};

export const DONATION_FREQUENCY_LABELS: Record<DonationFrequency, string> = {
  once: 'Ponctuel',
  monthly: 'Mensuel',
};

export interface Donation {
  id: string;
  stripePaymentId: string | null;
  stripeCustomerId: string | null;
  amount: number;          // en centimes
  currency: string;
  frequency: DonationFrequency;
  status: DonationStatus;
  donorName: string | null;
  donorEmail: string | null;
  donorAddress: string | null;
  donorCity: string | null;
  donorPostalCode: string | null;
  donorCountry: string | null;
  adminNotes: string | null;
  taxReceiptSent: boolean;
  paidAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ListDonationsParams {
  page?: number;
  limit?: number;
  status?: string;
  frequency?: string;
  search?: string;
  from?: string;
  to?: string;
}

export async function listDonations(
  params: ListDonationsParams = {}
): Promise<PaginatedResponse<Donation>['data']> {
  const res = await apiClient.get<PaginatedResponse<Donation>>('/admin/donations', { params });
  return res.data.data;
}

export interface DonationStats {
  global: { count: number; totalAmount: number; averageAmount: number };
  monthlyActive: number;
  currentMonth: { count: number; totalAmount: number };
  currentYear: { count: number; totalAmount: number };
}

export async function getDonationStats(): Promise<DonationStats> {
  const res = await apiClient.get<SingleResponse<DonationStats>>('/admin/donations/stats');
  return res.data.data;
}