import { useQuery } from '@tanstack/react-query';
import {
  FolderKanban, Newspaper, Users, HeartHandshake,
  Mail, Image as ImageIcon, FileText,
} from 'lucide-react';

import { PageHeader } from '@/components/common/PageHeader';
import { StatCard } from '@/components/common/StatCard';
import { StatSection } from '@/components/dashboard/StatSection';
import { RecentPanel } from '@/components/dashboard/RecentPanel';
import { STATUS_MAP } from '@/components/common/StatusBadge';

import { useAuthStore } from '@/store/auth.store';
import { getDashboardStats } from '@/services/dashboard.service';

export default function DashboardPage() {
  const user = useAuthStore((s) => s.user);
  const { data, isLoading } = useQuery({
    queryKey: ['dashboard', 'stats'],
    queryFn: getDashboardStats,
  });

  const s = data?.content;
  const f = data?.forms;
  const v = (n?: number) => (isLoading ? '—' : n ?? 0);
  const h = (txt: string) => (isLoading ? '…' : txt);

  return (
    <div className="space-y-6">
      <PageHeader
        title={`Bonjour ${user?.firstName ?? ''} 👋`}
        description="Vue d'ensemble de votre association"
      />

      <StatSection title="Contenu">
        <StatCard
          label="Projets"
          value={v(s?.projects.total)}
          hint={h(`${s?.projects.published ?? 0} publié(s)`)}
          icon={FolderKanban}
          tone="terra"
        />
        <StatCard
          label="Articles"
          value={v(s?.posts.total)}
          hint={h(`${s?.posts.published ?? 0} publié(s)`)}
          icon={Newspaper}
          tone="bleu"
        />
        <StatCard
          label="Pages"
          value={v(s?.pages.total)}
          icon={FileText}
          tone="ocre"
        />
        <StatCard
          label="Médias"
          value={v(s?.media.total)}
          icon={ImageIcon}
          tone="olive"
        />
      </StatSection>

      <StatSection title="Formulaires">
        <StatCard
          label="Adhérents"
          value={v(f?.members.total)}
          hint={h(f?.members.pending ? `${f.members.pending} en attente` : 'Aucun en attente')}
          icon={Users}
          tone="olive"
        />
        <StatCard
          label="Bénévoles"
          value={v(f?.volunteers.total)}
          hint={h(f?.volunteers.pending ? `${f.volunteers.pending} en attente` : 'Aucun en attente')}
          icon={HeartHandshake}
          tone="terra"
        />
        <StatCard
          label="Messages"
          value={v(f?.contacts.total)}
          hint={h(f?.contacts.unread ? `${f.contacts.unread} non lu(s)` : 'Boîte vide')}
          icon={Mail}
          tone="bleu"
        />
        <StatCard
          label="Partenaires"
          value={v(s?.partners.total)}
          hint={h(`${s?.partners.published ?? 0} publié(s)`)}
          icon={HeartHandshake}
          tone="ocre"
        />
      </StatSection>

      <div className="grid gap-6 lg:grid-cols-3">
        <RecentPanel
          title="Derniers adhérents"
          href="/members"
          icon={Users}
          loading={isLoading}
          items={(data?.recent.members ?? []).map((m) => ({
            id: m.id,
            primary: `${m.firstName} ${m.lastName}`,
            secondary: m.email,
            date: m.createdAt,
            badge: STATUS_MAP[m.status],
          }))}
        />
        <RecentPanel
          title="Derniers bénévoles"
          href="/volunteers"
          icon={HeartHandshake}
          loading={isLoading}
          items={(data?.recent.volunteers ?? []).map((m) => ({
            id: m.id,
            primary: `${m.firstName} ${m.lastName}`,
            secondary: m.email,
            date: m.createdAt,
            badge: STATUS_MAP[m.status],
          }))}
        />
        <RecentPanel
          title="Derniers messages"
          href="/contacts"
          icon={Mail}
          loading={isLoading}
          items={(data?.recent.contacts ?? []).map((m) => ({
            id: m.id,
            primary: m.name,
            secondary: m.subject,
            date: m.createdAt,
            badge: m.isRead
              ? { label: 'Lu', tone: 'secondary' as const }
              : { label: 'Non lu', tone: 'destructive' as const },
          }))}
        />
      </div>
    </div>
  );
}