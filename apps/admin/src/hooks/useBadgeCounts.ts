import { useQuery } from '@tanstack/react-query';
import { getDashboardStats } from '@/services/dashboard.service';

export interface BadgeCounts {
  unread: number;
  members: number;
  volunteers: number;
}

/**
 * Compteurs pour les badges de la sidebar.
 * Réutilise le cache de ['dashboard','stats'] → 1 seul fetch partagé
 * avec la page Dashboard.
 */
export function useBadgeCounts(): BadgeCounts {
  const { data } = useQuery({
    queryKey: ['dashboard', 'stats'],
    queryFn: getDashboardStats,
    staleTime: 60_000,
  });

  return {
    unread: data?.forms.contacts.unread ?? 0,
    members: data?.forms.members.pending ?? 0,
    volunteers: data?.forms.volunteers.pending ?? 0,
  };
}