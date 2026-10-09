import { z } from 'zod';

export const postSchema = z.object({
  title: z.string().min(3, 'Au moins 3 caractères').max(200, 'Trop long'),
  excerpt: z.string().max(500, 'Max 500 caractères').nullable().optional(),
  content: z.string().nullable().optional(),
  category: z.string().max(100).nullable().optional(),
  tags: z.array(z.string().min(1)).default([]),
  coverImageId: z.string().uuid().nullable().optional(),
  isPublished: z.boolean(),
});

export type PostFormValues = z.infer<typeof postSchema>;