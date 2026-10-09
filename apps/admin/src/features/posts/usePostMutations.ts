import { useApiMutation } from '@/hooks/useApiMutation';
import type { PostFormValues } from '@/schemas/post.schema';

const INVALIDATE = [['posts'], ['dashboard', 'stats']];

export function usePostMutations(onSuccess?: () => void) {
  const create = useApiMutation<unknown, PostFormValues>('/admin/posts', {
    method: 'post',
    successMessage: 'Article créé',
    invalidateKeys: INVALIDATE,
    onSuccess,
  });

  const update = useApiMutation<unknown, { id: string; values: PostFormValues }>(
    ({ id }) => `/admin/posts/${id}`,
    { method: 'put', successMessage: 'Article mis à jour', invalidateKeys: INVALIDATE, onSuccess }
  );

  const remove = useApiMutation<void, string>((id) => `/admin/posts/${id}`, {
    method: 'delete',
    successMessage: 'Article supprimé',
    invalidateKeys: INVALIDATE,
  });

  return { create, update, remove };
}