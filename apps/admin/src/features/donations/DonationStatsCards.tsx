import { DollarSign, TrendingUp, Calendar, RefreshCw } from 'lucide-react';
import { StatCard } from '@/components/common/StatCard';
import { formatCents } from '@/lib/utils';
import { useDonationStats } from './useDonations';

export function DonationStatsCards() {
  const { data, isLoading } = useDonationStats();

  const v = (amount: number) => (isLoading ? '—' : formatCents(amount));
  const n = (count: number) => (isLoading ? '…' : `${count} don${count > 1 ? 's' : ''}`);

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard
        label="Total global"
        value={v(data?.global.totalAmount ?? 0)}
        hint={n(data?.global.count ?? 0)}
        icon={DollarSign}
        tone="terra"
      />
      <StatCard
        label="Ce mois"
        value={v(data?.currentMonth.totalAmount ?? 0)}
        hint={n(data?.currentMonth.count ?? 0)}
        icon={Calendar}
        tone="bleu"
      />
      <StatCard
        label="Cette année"
        value={v(data?.currentYear.totalAmount ?? 0)}
        hint={n(data?.currentYear.count ?? 0)}
        icon={TrendingUp}
        tone="olive"
      />
      <StatCard
        label="Abonnements actifs"
        value={isLoading ? '—' : data?.monthlyActive ?? 0}
        hint="Dons mensuels"
        icon={RefreshCw}
        tone="ocre"
      />
    </div>
  );
}