import { useQuery } from '@tanstack/react-query';
import { listVolunteers, type ListVolunteersParams } from '@/services/volunteers.service';

export function useVolunteers(params: ListVolunteersParams) {
  return useQuery({
    queryKey: ['volunteers', params],
    queryFn: () => listVolunteers(params),
  });
}