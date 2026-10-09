import { useQuery } from '@tanstack/react-query';
import { listPartners, type ListPartnersParams } from '@/services/partners.service';

export function usePartners(params: ListPartnersParams) {
  return useQuery({
    queryKey: ['partners', params],
    queryFn: () => listPartners(params),
  });
}