import { useApiMutation } from '@/hooks/useApiMutation';

const INVALIDATE = [['donations'], ['dashboard', 'stats']];

export function useDonationMutations(onSuccess?: () => void) {
  const update = useApiMutation<
    unknown,
    { id: string; values: Record<string, unknown> }
  >(({ id }) => `/admin/donations/${id}`, {
    method: 'put',
    successMessage: 'Don mis à jour',
    invalidateKeys: INVALIDATE,
    onSuccess,
  });

  const remove = useApiMutation<void, string>((id) => `/admin/donations/${id}`, {
    method: 'delete',
    successMessage: 'Don supprimé',
    invalidateKeys: INVALIDATE,
  });

  return { update, remove };
}