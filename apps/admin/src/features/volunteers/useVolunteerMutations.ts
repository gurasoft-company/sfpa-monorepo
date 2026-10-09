import { useApiMutation } from '@/hooks/useApiMutation';
import type { VolunteerFormValues } from '@/schemas/volunteer.schema';

const INVALIDATE = [['volunteers'], ['dashboard', 'stats']];

export function useVolunteerMutations(onSuccess?: () => void) {
  const update = useApiMutation<
    unknown,
    { id: string; values: Partial<VolunteerFormValues> }
  >(({ id }) => `/admin/volunteers/${id}`, {
    method: 'put',
    successMessage: 'Bénévole mis à jour',
    invalidateKeys: INVALIDATE,
    onSuccess,
  });

  const remove = useApiMutation<void, string>((id) => `/admin/volunteers/${id}`, {
    method: 'delete',
    successMessage: 'Bénévole supprimé',
    invalidateKeys: INVALIDATE,
  });

  return { update, remove };
}