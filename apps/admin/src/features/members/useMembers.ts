import { useQuery } from '@tanstack/react-query';
import { listMembers, type ListMembersParams } from '@/services/members.service';

export function useMembers(params: ListMembersParams) {
  return useQuery({
    queryKey: ['members', params],
    queryFn: () => listMembers(params),
  });
}