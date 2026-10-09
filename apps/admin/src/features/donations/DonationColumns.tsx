import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { RefreshCw, Receipt } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { DataTableRowActions } from '@/components/data-table/DataTableRowActions';
import { StatusBadge, STATUS_MAP } from '@/components/common/StatusBadge';
import type { Column } from '@/components/data-table/types';
import {
  DONATION_FREQUENCY_LABELS, type Donation,
} from '@/services/donations.service';
import { formatCents } from '@/lib/utils';

interface Handlers {
  onEdit: (d: Donation) => void;
  onDelete: (d: Donation) => void;
  canDelete: boolean;
}

export function buildDonationColumns(h: Handlers): Column<Donation>[] {
  return [
    {
      key: 'amount', header: 'Montant',
      sortValue: (d) => d.amount,
      cell: (d) => (
        <div>
          <p className="font-heading text-base font-bold text-sfpa-terra">
            {formatCents(d.amount, d.currency)}
          </p>
          <p className="text-xs text-muted-foreground">{d.currency}</p>
        </div>
      ),
    },
    {
      key: 'donor', header: 'Donateur',
      sortValue: (d) => d.donorName ?? d.donorEmail ?? '',
      cell: (d) => (
        <div className="min-w-0">
          <p className="truncate text-sm font-medium">{d.donorName ?? 'Anonyme'}</p>
          <p className="truncate text-xs text-muted-foreground">{d.donorEmail ?? '—'}</p>
        </div>
      ),
    },
    {
      key: 'frequency', header: 'Fréquence',
      sortValue: (d) => d.frequency,
      cell: (d) => (
        <Badge variant="secondary" className="gap-1 text-xs">
          {d.frequency === 'monthly' && <RefreshCw className="h-3 w-3" />}
          {DONATION_FREQUENCY_LABELS[d.frequency]}
        </Badge>
      ),
    },
    {
      key: 'status', header: 'Statut',
      sortValue: (d) => d.status,
      cell: (d) => {
        const m = STATUS_MAP[d.status];
        return <StatusBadge label={m?.label ?? d.status} tone={m?.tone} />;
      },
    },
    {
      key: 'taxReceipt', header: 'Reçu fiscal',
      align: 'center',
      sortValue: (d) => (d.taxReceiptSent ? 1 : 0),
      cell: (d) => d.taxReceiptSent ? (
        <span className="inline-flex items-center gap-1 text-xs text-sfpa-olive">
          <Receipt className="h-3.5 w-3.5" /> Envoyé
        </span>
      ) : (
        <span className="text-xs text-muted-foreground">—</span>
      ),
    },
    {
      key: 'date', header: 'Date',
      sortValue: (d) => new Date(d.paidAt ?? d.createdAt).getTime(),
      cell: (d) => (
        <span className="text-xs text-muted-foreground">
          {format(new Date(d.paidAt ?? d.createdAt), 'dd MMM yyyy', { locale: fr })}
        </span>
      ),
    },
    {
      key: 'actions', header: '', className: 'w-[60px]', align: 'right',
      cell: (d) => (
        <DataTableRowActions
          onEdit={() => h.onEdit(d)}
          onDelete={() => h.onDelete(d)}
          canDelete={h.canDelete}
        />
      ),
    },
  ];
}