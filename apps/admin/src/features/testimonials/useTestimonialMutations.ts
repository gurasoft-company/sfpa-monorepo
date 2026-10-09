import { useApiMutation } from '@/hooks/useApiMutation';
import type { TestimonialFormValues } from '@/schemas/testimonial.schema';

const INVALIDATE = [['testimonials'], ['dashboard', 'stats']];

export function useTestimonialMutations(onSuccess?: () => void) {
  const create = useApiMutation<unknown, TestimonialFormValues>(
    '/admin/testimonials',
    { method: 'post', successMessage: 'Témoignage créé', invalidateKeys: INVALIDATE, onSuccess }
  );

  const update = useApiMutation<
    unknown,
    { id: string; values: Partial<TestimonialFormValues> }
  >(({ id }) => `/admin/testimonials/${id}`, {
    method: 'put',
    invalidateKeys: INVALIDATE,
    onSuccess,
  });

  const remove = useApiMutation<void, string>((id) => `/admin/testimonials/${id}`, {
    method: 'delete',
    successMessage: 'Témoignage supprimé',
    invalidateKeys: INVALIDATE,
  });

  // Actions rapides : approve / reject en 1 clic
  const approve = useApiMutation<unknown, string>((id) => `/admin/testimonials/${id}`, {
    method: 'put',
    successMessage: 'Témoignage approuvé',
    invalidateKeys: INVALIDATE,
  });

  const reject = useApiMutation<unknown, string>((id) => `/admin/testimonials/${id}`, {
    method: 'put',
    successMessage: 'Témoignage rejeté',
    invalidateKeys: INVALIDATE,
  });

  return { create, update, remove, approve, reject };
}