import { useApiMutation } from '@/hooks/useApiMutation';
import type { FormationFormValues } from '@/schemas/formation.schema';

const INVALIDATE = [['formations'], ['dashboard', 'stats']];

export function useFormationMutations(onSuccess?: () => void) {
  const create = useApiMutation<unknown, FormationFormValues>('/admin/formations', {
    method: 'post',
    successMessage: 'Formation créée',
    invalidateKeys: INVALIDATE,
    onSuccess,
  });

  const update = useApiMutation<
    unknown,
    { id: string; values: FormationFormValues }
  >(({ id }) => `/admin/formations/${id}`, {
    method: 'put',
    successMessage: 'Formation mise à jour',
    invalidateKeys: INVALIDATE,
    onSuccess,
  });

  const remove = useApiMutation<void, string>(
    (id) => `/admin/formations/${id}`,
    {
      method: 'delete',
      successMessage: 'Formation supprimée',
      invalidateKeys: INVALIDATE,
    }
  );

  return { create, update, remove };
}