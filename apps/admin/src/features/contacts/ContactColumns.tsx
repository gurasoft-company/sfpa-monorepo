import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Mail, MailOpen, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Column } from '@/components/data-table/types';
import type { Contact } from '@/services/contacts.service';
import { cn } from '@/lib/utils';

interface Handlers {
  onOpen: (c: Contact) => void;
  onDelete: (c: Contact) => void;
  canDelete: boolean;
}

export function buildContactColumns(h: Handlers): Column<Contact>[] {
  return [
    {
      key: 'read', header: '', className: 'w-[40px]',
      cell: (c) => c.isRead
        ? <MailOpen className="h-4 w-4 text-muted-foreground" />
        : <Mail className="h-4 w-4 text-sfpa-terra" />,
    },
    {
      key: 'name', header: 'Expéditeur', sortValue: (c) => c.name,
      cell: (c) => (
        <div className={cn('min-w-0', !c.isRead && 'font-semibold')}>
          <p className="truncate text-sm">{c.name}</p>
          <p className="truncate text-xs text-muted-foreground">{c.email}</p>
        </div>
      ),
    },
    {
      key: 'subject', header: 'Sujet', sortValue: (c) => c.subject,
      cell: (c) => (
        <div className="min-w-0">
          <p className={cn('truncate text-sm', !c.isRead && 'font-semibold')}>
            {c.subject}
          </p>
          <p className="truncate text-xs text-muted-foreground">{c.message.slice(0, 80)}…</p>
        </div>
      ),
    },
    {
      key: 'createdAt', header: 'Reçu le',
      sortValue: (c) => new Date(c.createdAt).getTime(),
      cell: (c) => (
        <span className="text-xs text-muted-foreground">
          {format(new Date(c.createdAt), 'dd MMM yyyy', { locale: fr })}
        </span>
      ),
    },
    {
      key: 'actions', header: '', className: 'w-[60px]', align: 'right',
      cell: (c) => h.canDelete ? (
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-destructive hover:bg-destructive/5"
          onClick={(e) => { e.stopPropagation(); h.onDelete(c); }}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      ) : null,
    },
  ];
}