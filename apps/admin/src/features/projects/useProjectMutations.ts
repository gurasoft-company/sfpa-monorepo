import { useApiMutation } from '@/hooks/useApiMutation';
import type { ProjectFormValues } from '@/schemas/project.schema';

const INVALIDATE = [['projects'], ['dashboard', 'stats']];

export function useProjectMutations(onSuccess?: () => void) {
  const create = useApiMutation<unknown, ProjectFormValues>('/admin/projects', {
    method: 'post',
    successMessage: 'Projet créé',
    invalidateKeys: INVALIDATE,
    onSuccess,
  });

  const update = useApiMutation<unknown, { id: string; values: ProjectFormValues }>(
    ({ id }) => `/admin/projects/${id}`,
    { method: 'put', successMessage: 'Projet mis à jour', invalidateKeys: INVALIDATE, onSuccess }
  );

  const remove = useApiMutation<void, string>((id) => `/admin/projects/${id}`, {
    method: 'delete',
    successMessage: 'Projet supprimé',
    invalidateKeys: INVALIDATE,
  });

  return { create, update, remove };
}