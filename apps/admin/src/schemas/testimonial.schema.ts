import { z } from 'zod';
import { TESTIMONIAL_STATUSES } from '@/services/testimonials.service';

export const testimonialSchema = z.object({
  authorName: z.string().min(2, 'Au moins 2 caractères').max(100, 'Trop long'),
  authorEmail: z.string().email('Email invalide').nullable().optional().or(z.literal('')),
  authorRole: z.string().max(150, 'Trop long').nullable().optional(),
  authorLocation: z.string().max(100, 'Trop long').nullable().optional(),
  authorImageId: z.string().uuid().nullable().optional(),
  quote: z.string().min(10, 'Au moins 10 caractères').max(1000, 'Max 1000 caractères'),
  rating: z.coerce.number().int().min(1).max(5).nullable().optional(),
  status: z.enum(TESTIMONIAL_STATUSES),
  isFeatured: z.boolean(),
  displayOrder: z.coerce.number().int().min(0).default(0),
  adminNotes: z.string().nullable().optional(),
});

export type TestimonialFormValues = z.infer<typeof testimonialSchema>;