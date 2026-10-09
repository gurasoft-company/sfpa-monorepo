import { z } from 'zod';

export const pageSchema = z.object({
  slug: z
    .string()
    .min(2, 'Au moins 2 caractères')
    .max(100)
    .regex(/^[a-z0-9-]+$/, 'Uniquement minuscules, chiffres et tirets'),
  title: z.string().min(2, 'Au moins 2 caractères').max(200),
  content: z
    .string()
    .refine(
      (v) => {
        if (!v || v.trim() === '') return true;
        try {
          JSON.parse(v);
          return true;
        } catch {
          return false;
        }
      },
      { message: 'JSON invalide' }
    ),
  metaTitle: z.string().max(200).nullable().optional(),
  metaDescription: z.string().max(300).nullable().optional(),
  isPublished: z.boolean(),
});

export type PageFormValues = z.infer<typeof pageSchema>;