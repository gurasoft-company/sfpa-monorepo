import { useQuery } from '@tanstack/react-query';
import { listPages, type ListPagesParams } from '@/services/pages.service';

export function usePages(params: ListPagesParams) {
  return useQuery({
    queryKey: ['pages', params],
    queryFn: () => listPages(params),
  });
}