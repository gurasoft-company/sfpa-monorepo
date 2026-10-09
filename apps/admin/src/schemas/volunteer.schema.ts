import { z } from 'zod';
import { VOLUNTEER_STATUSES } from '@/services/volunteers.service';

export const volunteerSchema = z.object({
  status: z.enum(VOLUNTEER_STATUSES),
  adminNotes: z.string().nullable().optional(),
});

export type VolunteerFormValues = z.infer<typeof volunteerSchema>;