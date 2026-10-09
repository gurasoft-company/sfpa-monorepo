import { Eye, Trash2, Users } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { StatusBadge, STATUS_MAP } from '@/components/common/StatusBadge';
import { ValidationActions } from '@/components/common/ValidationActions';
import type { Column } from '@/components/data-table/types';
import {
  MEMBERSHIP_LABELS, type Member,
} from '@/services/members.service';
import { getInitials } from '@/lib/utils';

interface Handlers {
  onOpen: (m: Member) => void;
  onDelete: (m: Member) => void;
  onApprove: (m: Member) => void;
  onReject: (m: Member) => void;
  canDelete: boolean;
  loading?: boolean;
}

export function buildMemberColumns(h: Handlers): Column<Member>[] {
  return [
    { key: 'name', header: 'Adhérent', sortValue: (m) => `${m.lastName} ${m.firstName}`, cell: nameCell },
    { key: 'location', header: 'Localisation', cell: locationCell },
    {
      key: 'type', header: 'Type', sortValue: (m) => m.membershipType ?? '',
      cell: (m) => m.membershipType
        ? <Badge variant="secondary" className="text-xs">{MEMBERSHIP_LABELS[m.membershipType]}</Badge>
        : <span className="text-xs text-muted-foreground">—</span>,
    },
    {
      key: 'status', header: 'Statut', sortValue: (m) => m.status,
      cell: (m) => {
        const meta = STATUS_MAP[m.status];
        return <StatusBadge label={meta?.label ?? m.status} tone={meta?.tone} />;
      },
    },
    {
      key: 'createdAt', header: 'Inscrit le',
      sortValue: (m) => new Date(m.createdAt).getTime(),
      cell: (m) => (
        <span className="text-xs text-muted-foreground">
          {format(new Date(m.createdAt), 'dd MMM yyyy', { locale: fr })}
        </span>
      ),
    },
    {
      key: 'quick', header: '', className: 'w-[200px]',
      cell: (m) => (
        <ValidationActions
          status={m.status}
          onApprove={() => h.onApprove(m)}
          onReject={() => h.onReject(m)}
          loading={h.loading}
        />
      ),
    },
    {
      key: 'actions', header: '', className: 'w-[100px]', align: 'right',
      cell: (m) => (
        <div className="flex justify-end gap-1" onClick={(e) => e.stopPropagation()}>
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => h.onOpen(m)}>
            <Eye className="h-4 w-4" />
          </Button>
          {h.canDelete && (
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-destructive hover:bg-destructive/5"
              onClick={() => h.onDelete(m)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>
      ),
    },
  ];
}

function nameCell(m: Member) {
  return (
    <div className="flex items-center gap-2 min-w-0">
      <Avatar className="h-8 w-8 shrink-0">
        <AvatarFallback className="bg-sfpa-olive text-white text-[10px]">
          {getInitials(m.firstName, m.lastName)}
        </AvatarFallback>
      </Avatar>
      <div className="min-w-0">
        <p className="truncate text-sm font-medium">{m.firstName} {m.lastName}</p>
        <p className="truncate text-xs text-muted-foreground">{m.email}</p>
      </div>
    </div>
  );
}

function locationCell(m: Member) {
  const parts = [m.city, m.country].filter(Boolean);
  return (
    <span className="text-sm text-muted-foreground">
      {parts.length ? parts.join(', ') : '—'}
    </span>
  );
}