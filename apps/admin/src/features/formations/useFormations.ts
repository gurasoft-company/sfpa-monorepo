import { useQuery } from '@tanstack/react-query';
import { listFormations, type ListFormationsParams } from '@/services/formations.service';

export function useFormations(params: ListFormationsParams) {
  return useQuery({
    queryKey: ['formations', params],
    queryFn: () => listFormations(params),
  });
}