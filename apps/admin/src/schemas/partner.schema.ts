import { z } from 'zod';
import { PARTNER_TYPES } from '@/services/partners.service';

export const partnerSchema = z.object({
  name: z.string().min(2, 'Au moins 2 caractères').max(200, 'Trop long'),
  type: z.enum(PARTNER_TYPES, {
    errorMap: () => ({ message: 'Type invalide' }),
  }),
  description: z.string().nullable().optional(),
  logoId: z.string().uuid().nullable().optional(),
  website: z.string().url('URL invalide').nullable().optional().or(z.literal('')),
  country: z.string().max(100, 'Trop long').nullable().optional(),
  displayOrder: z.coerce.number().int().min(0, 'Valeur ≥ 0').default(0),
  isPublished: z.boolean(),
});

export type PartnerFormValues = z.infer<typeof partnerSchema>;