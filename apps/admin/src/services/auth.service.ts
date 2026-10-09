import apiClient from '@/lib/api';
import type { SingleResponse } from '@/types/api';
import type { AuthUser } from '@/store/auth.store';

export interface UpdateProfilePayload {
  firstName: string;
  lastName: string;
  email: string;
}

export interface ChangePasswordPayload {
  currentPassword: string;
  newPassword: string;
}

export async function updateProfile(payload: UpdateProfilePayload): Promise<AuthUser> {
  const res = await apiClient.put<SingleResponse<{ user: AuthUser }>>(
    '/auth/profile',
    payload
  );
  return res.data.data.user;
}

export async function changePassword(payload: ChangePasswordPayload): Promise<void> {
  await apiClient.put('/auth/change-password', payload);
}