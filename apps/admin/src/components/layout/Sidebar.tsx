import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  FolderKanban,
  Newspaper,
  FileText,
  Image as ImageIcon,
  Users,
  HeartHandshake,
  Mail,
  MessageSquareQuote,
  DollarSign,
  Settings,
  Sprout,
  type LucideIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { useBadgeCounts } from '@/hooks/useBadgeCounts';

type BadgeKey = 'unread' | 'members' | 'volunteers';

interface NavItem {
  to: string;
  label: string;
  icon: LucideIcon;
  /** Clé d'un badge dynamique (alimenté par useBadgeCounts) */
  badgeKey?: BadgeKey;
}

const NAV_ITEMS: NavItem[] = [
  { to: '/dashboard', label: 'Tableau de bord', icon: LayoutDashboard },
  { to: '/projects', label: 'Projets', icon: FolderKanban },
  { to: '/posts', label: 'Articles', icon: Newspaper },
  { to: '/pages', label: 'Pages', icon: FileText },
  { to: '/media', label: 'Médias', icon: ImageIcon },
  { to: '/formations', label: 'Formations', icon: Sprout },
  { to: '/partners', label: 'Partenaires', icon: HeartHandshake },
  // ——— Formulaires ———
  { to: '/members', label: 'Adhérents', icon: Users, badgeKey: 'members' },
  { to: '/volunteers', label: 'Bénévoles', icon: HeartHandshake, badgeKey: 'volunteers' },
  { to: '/contacts', label: 'Messages', icon: Mail, badgeKey: 'unread' },
  { to: '/testimonials', label: 'Témoignages', icon: MessageSquareQuote },
  // ——— Finance ———
  { to: '/donations', label: 'Dons', icon: DollarSign },
  // ——— Système ———
  { to: '/settings', label: 'Paramètres', icon: Settings },
];

export function Sidebar() {
  return (
    <aside className="hidden w-64 shrink-0 flex-col border-r bg-sfpa-anthracite text-slate-200 lg:flex">
      {/* Brand */}
      <div className="flex h-16 items-center gap-2.5 border-b border-white/10 px-6">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sfpa-terra text-white">
          <Sprout className="h-5 w-5" />
        </div>
        <div className="leading-tight">
          <p className="font-heading text-sm font-bold text-white">SFPA</p>
          <p className="text-[11px] uppercase tracking-wider text-slate-400">Admin</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-0.5 overflow-y-auto px-3 py-4">
        {NAV_ITEMS.map((item) => (
          <SidebarLink key={item.to} item={item} />
        ))}
      </nav>

      {/* Footer version */}
      <div className="border-t border-white/10 px-6 py-3 text-[11px] text-slate-500">
        v0.1.0 — Phase 5
      </div>
    </aside>
  );
}

function SidebarLink({ item }: { item: NavItem }) {
  const counts = useBadgeCounts();
  const Icon = item.icon;

  const badge = item.badgeKey
    ? {
        count: counts[item.badgeKey],
        variant: item.badgeKey === 'unread' ? ('destructive' as const) : ('warning' as const),
      }
    : null;

  return (
    <NavLink
      to={item.to}
      className={({ isActive }) =>
        cn(
          'group flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
          isActive
            ? 'bg-sfpa-terra text-white shadow-sm'
            : 'text-slate-300 hover:bg-white/5 hover:text-white'
        )
      }
    >
      <Icon className="h-4 w-4 shrink-0" />
      <span className="flex-1 truncate">{item.label}</span>
      {badge && badge.count > 0 && (
        <Badge
          variant={badge.variant}
          className="h-5 min-w-[20px] justify-center rounded-full px-1.5 text-[10px]"
        >
          {badge.count > 99 ? '99+' : badge.count}
        </Badge>
      )}
    </NavLink>
  );
}