import { useMutation, useQueryClient, type QueryKey } from '@tanstack/react-query';
import { toast } from 'sonner';
import apiClient, { getApiErrorMessage } from '@/lib/api';

interface Options<TData, TVars> {
  method?: 'post' | 'put' | 'patch' | 'delete';
  successMessage?: string;
  invalidateKeys?: QueryKey[];
  onSuccess?: (data: TData, vars: TVars) => void;
}

/**
 * Wrapper `useMutation` : toast auto (succès + erreur) + invalidation auto.
 */
export function useApiMutation<TData = unknown, TVars = unknown>(
  urlOrFn: string | ((vars: TVars) => string),
  options: Options<TData, TVars> = {}
) {
  const qc = useQueryClient();
  const { method = 'post', successMessage, invalidateKeys, onSuccess } = options;

  return useMutation<TData, unknown, TVars>({
    mutationFn: async (vars) => {
      const url = typeof urlOrFn === 'function' ? urlOrFn(vars) : urlOrFn;
      const res = await apiClient.request<TData>({
        url,
        method,
        data: method === 'delete' ? undefined : vars,
      });
      return res.data;
    },
    onSuccess: (data, vars) => {
      if (successMessage) toast.success(successMessage);
      invalidateKeys?.forEach((key) => qc.invalidateQueries({ queryKey: key }));
      onSuccess?.(data, vars);
    },
    onError: (err) => {
      toast.error(getApiErrorMessage(err));
    },
  });
}