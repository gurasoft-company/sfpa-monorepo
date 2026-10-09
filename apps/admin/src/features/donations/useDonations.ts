import { useQuery } from '@tanstack/react-query';
import {
  getDonationStats, listDonations,
  type ListDonationsParams,
} from '@/services/donations.service';

export function useDonations(params: ListDonationsParams) {
  return useQuery({
    queryKey: ['donations', params],
    queryFn: () => listDonations(params),
  });
}

export function useDonationStats() {
  return useQuery({
    queryKey: ['donations', 'stats'],
    queryFn: getDonationStats,
    staleTime: 60_000,
  });
}