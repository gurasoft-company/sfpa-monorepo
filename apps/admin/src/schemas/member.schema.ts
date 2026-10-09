import { z } from 'zod';
import { MEMBER_STATUSES, MEMBERSHIP_TYPES } from '@/services/members.service';

export const memberSchema = z.object({
  status: z.enum(MEMBER_STATUSES),
  membershipType: z.enum(MEMBERSHIP_TYPES).nullable().optional(),
  adminNotes: z.string().nullable().optional(),
});

export type MemberFormValues = z.infer<typeof memberSchema>;