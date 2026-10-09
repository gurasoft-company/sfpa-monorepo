import { useApiMutation } from '@/hooks/useApiMutation';
import type { PartnerFormValues } from '@/schemas/partner.schema';

const INVALIDATE = [['partners'], ['dashboard', 'stats']];

export function usePartnerMutations(onSuccess?: () => void) {
  const create = useApiMutation<unknown, PartnerFormValues>('/admin/partners', {
    method: 'post',
    successMessage: 'Partenaire créé',
    invalidateKeys: INVALIDATE,
    onSuccess,
  });

  const update = useApiMutation<unknown, { id: string; values: PartnerFormValues }>(
    ({ id }) => `/admin/partners/${id}`,
    { method: 'put', successMessage: 'Partenaire mis à jour', invalidateKeys: INVALIDATE, onSuccess }
  );

  const remove = useApiMutation<void, string>((id) => `/admin/partners/${id}`, {
    method: 'delete',
    successMessage: 'Partenaire supprimé',
    invalidateKeys: INVALIDATE,
  });

  return { create, update, remove };
}