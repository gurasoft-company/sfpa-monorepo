import { useQuery } from '@tanstack/react-query';
import {
  listTestimonials, type ListTestimonialsParams,
} from '@/services/testimonials.service';

export function useTestimonials(params: ListTestimonialsParams) {
  return useQuery({
    queryKey: ['testimonials', params],
    queryFn: () => listTestimonials(params),
  });
}