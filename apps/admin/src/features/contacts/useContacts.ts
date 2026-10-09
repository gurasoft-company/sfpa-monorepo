import { useQuery } from '@tanstack/react-query';
import { listContacts, type ListContactsParams } from '@/services/contacts.service';

export function useContacts(params: ListContactsParams) {
  return useQuery({
    queryKey: ['contacts', params],
    queryFn: () => listContacts(params),
  });
}