import { z } from 'zod';
import { PROJECT_CATEGORIES, PROJECT_STATUSES } from '@/services/projects.service';

export const projectSchema = z
  .object({
    title: z.string().min(3, 'Au moins 3 caractères').max(200, 'Trop long'),
    excerpt: z.string().max(500, 'Max 500 caractères').nullable().optional(),
    description: z.string().nullable().optional(),
    category: z.enum(PROJECT_CATEGORIES, {
      errorMap: () => ({ message: 'Catégorie invalide' }),
    }),
    country: z.string().max(100, 'Trop long').nullable().optional(),
    status: z.enum(PROJECT_STATUSES, {
      errorMap: () => ({ message: 'Statut invalide' }),
    }),
    coverImageId: z.string().uuid().nullable().optional(),
    startDate: z.string().nullable().optional(),
    endDate: z.string().nullable().optional(),
    isPublished: z.boolean(),
  })
  .refine(
    (d) => !d.startDate || !d.endDate || new Date(d.endDate) >= new Date(d.startDate),
    { message: 'La fin doit être postérieure au début', path: ['endDate'] }
  );

export type ProjectFormValues = z.infer<typeof projectSchema>;