import { Eye, HeartHandshake, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { StatusBadge, STATUS_MAP } from '@/components/common/StatusBadge';
import { ValidationActions } from '@/components/common/ValidationActions';
import type { Column } from '@/components/data-table/types';
import type { Volunteer } from '@/services/volunteers.service';
import { getInitials } from '@/lib/utils';

interface Handlers {
  onOpen: (v: Volunteer) => void;
  onDelete: (v: Volunteer) => void;
  onApprove: (v: Volunteer) => void;
  onReject: (v: Volunteer) => void;
  canDelete: boolean;
  loading?: boolean;
}

export function buildVolunteerColumns(h: Handlers): Column<Volunteer>[] {
  return [
    { key: 'name', header: 'Bénévole', sortValue: (v) => `${v.lastName} ${v.firstName}`, cell: nameCell },
    { key: 'location', header: 'Localisation', cell: locationCell },
    {
      key: 'skills', header: 'Compétences',
      cell: (v) => (
        <p className="line-clamp-2 max-w-md text-sm text-muted-foreground">
          {v.skills ?? '—'}
        </p>
      ),
    },
    {
      key: 'status', header: 'Statut', sortValue: (v) => v.status,
      cell: (v) => {
        const meta = STATUS_MAP[v.status];
        return <StatusBadge label={meta?.label ?? v.status} tone={meta?.tone} />;
      },
    },
    {
      key: 'createdAt', header: 'Candidature',
      sortValue: (v) => new Date(v.createdAt).getTime(),
      cell: (v) => (
        <span className="text-xs text-muted-foreground">
          {format(new Date(v.createdAt), 'dd MMM yyyy', { locale: fr })}
        </span>
      ),
    },
    {
      key: 'quick', header: '', className: 'w-[200px]',
      cell: (v) => (
        <ValidationActions
          status={v.status}
          onApprove={() => h.onApprove(v)}
          onReject={() => h.onReject(v)}
          loading={h.loading}
        />
      ),
    },
    {
      key: 'actions', header: '', className: 'w-[100px]', align: 'right',
      cell: (v) => (
        <div className="flex justify-end gap-1" onClick={(e) => e.stopPropagation()}>
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => h.onOpen(v)}>
            <Eye className="h-4 w-4" />
          </Button>
          {h.canDelete && (
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-destructive hover:bg-destructive/5"
              onClick={() => h.onDelete(v)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>
      ),
    },
  ];
}

function nameCell(v: Volunteer) {
  return (
    <div className="flex items-center gap-2 min-w-0">
      <Avatar className="h-8 w-8 shrink-0">
        <AvatarFallback className="bg-sfpa-terra text-white text-[10px]">
          {getInitials(v.firstName, v.lastName)}
        </AvatarFallback>
      </Avatar>
      <div className="min-w-0">
        <p className="truncate text-sm font-medium">{v.firstName} {v.lastName}</p>
        <p className="truncate text-xs text-muted-foreground">{v.email}</p>
      </div>
    </div>
  );
}

function locationCell(v: Volunteer) {
  const parts = [v.city, v.country].filter(Boolean);
  return (
    <span className="text-sm text-muted-foreground">
      {parts.length ? parts.join(', ') : '—'}
    </span>
  );
}