import { useApiMutation } from '@/hooks/useApiMutation';
import type { PageFormValues } from '@/schemas/page.schema';

const INVALIDATE = [['pages']];

interface Payload extends Omit<PageFormValues, 'content'> {
  content: Record<string, unknown> | null;
}

export function usePageMutations(onSuccess?: () => void) {
  const create = useApiMutation<unknown, Payload>('/admin/pages', {
    method: 'post',
    successMessage: 'Page créée',
    invalidateKeys: INVALIDATE,
    onSuccess,
  });

  const update = useApiMutation<unknown, { id: string; values: Payload }>(
    ({ id }) => `/admin/pages/${id}`,
    { method: 'put', successMessage: 'Page mise à jour', invalidateKeys: INVALIDATE, onSuccess }
  );

  const remove = useApiMutation<void, string>((id) => `/admin/pages/${id}`, {
    method: 'delete',
    successMessage: 'Page supprimée',
    invalidateKeys: INVALIDATE,
  });

  return { create, update, remove };
}