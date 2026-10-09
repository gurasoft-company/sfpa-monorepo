import { useQuery, type QueryKey, type UseQueryOptions } from '@tanstack/react-query';
import apiClient from '@/lib/api';

/**
 * Wrapper `useQuery` : récupère `res.data` (payload backend) directement.
 */
export function useApiQuery<TData>(
  key: QueryKey,
  url: string,
  options?: Omit<UseQueryOptions<TData>, 'queryKey' | 'queryFn'>
) {
  return useQuery<TData>({
    queryKey: key,
    queryFn: async () => {
      const res = await apiClient.get<TData>(url);
      return res.data;
    },
    ...options,
  });
}