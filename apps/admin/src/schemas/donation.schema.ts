import { z } from 'zod';
import { DONATION_STATUSES } from '@/services/donations.service';

export const donationSchema = z.object({
  status: z.enum(DONATION_STATUSES),
  adminNotes: z.string().nullable().optional(),
  taxReceiptSent: z.boolean(),
  donorName: z.string().nullable().optional(),
  donorEmail: z.string().email('Email invalide').nullable().optional().or(z.literal('')),
  donorAddress: z.string().nullable().optional(),
  donorCity: z.string().nullable().optional(),
  donorPostalCode: z.string().nullable().optional(),
  donorCountry: z.string().nullable().optional(),
});

export type DonationFormValues = z.infer<typeof donationSchema>;