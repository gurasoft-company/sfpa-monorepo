import { z } from 'zod';

export const contactSchema = z.object({
  isRead: z.boolean(),
  adminNotes: z.string().nullable().optional(),
});

export type ContactFormValues = z.infer<typeof contactSchema>;