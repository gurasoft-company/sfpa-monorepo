import { useApiMutation } from '@/hooks/useApiMutation';
import type { MemberFormValues } from '@/schemas/member.schema';

const INVALIDATE = [['members'], ['dashboard', 'stats']];

export function useMemberMutations(onSuccess?: () => void) {
  const update = useApiMutation<
    unknown,
    { id: string; values: Partial<MemberFormValues> }
  >(({ id }) => `/admin/members/${id}`, {
    method: 'put',
    successMessage: 'Adhérent mis à jour',
    invalidateKeys: INVALIDATE,
    onSuccess,
  });

  const remove = useApiMutation<void, string>((id) => `/admin/members/${id}`, {
    method: 'delete',
    successMessage: 'Adhérent supprimé',
    invalidateKeys: INVALIDATE,
  });

  return { update, remove };
}