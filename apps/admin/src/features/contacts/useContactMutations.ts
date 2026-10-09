import { useApiMutation } from '@/hooks/useApiMutation';

const INVALIDATE = [['contacts'], ['dashboard', 'stats']];

export function useContactMutations(onSuccess?: () => void) {
  const update = useApiMutation<
    unknown,
    { id: string; values: { isRead?: boolean; adminNotes?: string | null } }
  >(({ id }) => `/admin/contacts/${id}`, {
    method: 'put',
    invalidateKeys: INVALIDATE,
    onSuccess,
  });

  const remove = useApiMutation<void, string>((id) => `/admin/contacts/${id}`, {
    method: 'delete',
    successMessage: 'Message supprimé',
    invalidateKeys: INVALIDATE,
  });

  return { update, remove };
}