import { z } from 'zod';
import { FORMATION_CATEGORIES } from '@/services/formations.service';

export const formationSchema = z.object({
  title: z.string().min(3, 'Au moins 3 caractères').max(200, 'Trop long'),
  excerpt: z.string().max(500, 'Max 500 caractères').nullable().optional(),
  description: z.string().nullable().optional(),
  objectives: z.array(z.string().min(1)).default([]),
  duration: z.string().max(100, 'Trop long').nullable().optional(),
  level: z.string().max(100, 'Trop long').nullable().optional(),
  audience: z.string().max(200, 'Trop long').nullable().optional(),
  category: z.enum(FORMATION_CATEGORIES, {
    errorMap: () => ({ message: 'Catégorie invalide' }),
  }),
  coverImageId: z.string().uuid().nullable().optional(),
  displayOrder: z.coerce.number().int().min(0, 'Valeur ≥ 0').default(0),
  isPublished: z.boolean(),
});

export type FormationFormValues = z.infer<typeof formationSchema>;