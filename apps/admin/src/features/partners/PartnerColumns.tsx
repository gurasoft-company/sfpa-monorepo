import { Building2, Eye, EyeOff } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { DataTableRowActions } from '@/components/data-table/DataTableRowActions';
import type { Column } from '@/components/data-table/types';
import { PARTNER_TYPE_LABELS, type Partner } from '@/services/partners.service';

interface Handlers {
  onEdit: (p: Partner) => void;
  onDelete: (p: Partner) => void;
  canDelete: boolean;
}

export function buildPartnerColumns({
  onEdit, onDelete, canDelete,
}: Handlers): Column<Partner>[] {
  return [
    { key: 'logo', header: '', className: 'w-[80px]', cell: logoCell },
    {
      key: 'name', header: 'Partenaire', sortValue: (p) => p.name,
      cell: (p) => (
        <div className="min-w-0">
          <p className="truncate font-medium">{p.name}</p>
          <p className="truncate text-xs text-muted-foreground">{p.country ?? '—'}</p>
        </div>
      ),
    },
    {
      key: 'type', header: 'Type', sortValue: (p) => p.type,
      cell: (p) => (
        <Badge variant="secondary" className="text-xs">
          {PARTNER_TYPE_LABELS[p.type]}
        </Badge>
      ),
    },
    {
      key: 'website', header: 'Site web',
      cell: (p) => p.website ? (
        <a
          href={p.website}
          target="_blank"
          rel="noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="text-xs text-sfpa-bleu hover:underline"
        >
          {p.website.replace(/^https?:\/\//, '')}
        </a>
      ) : (
        <span className="text-xs text-muted-foreground">—</span>
      ),
    },
    {
      key: 'displayOrder', header: 'Ordre', align: 'center',
      sortValue: (p) => p.displayOrder,
      cell: (p) => <span className="text-sm text-muted-foreground">{p.displayOrder}</span>,
    },
    {
      key: 'published', header: 'Publication',
      sortValue: (p) => (p.isPublished ? 1 : 0),
      cell: publishCell,
    },
    {
      key: 'actions', header: '', className: 'w-[60px]', align: 'right',
      cell: (p) => (
        <DataTableRowActions
          onEdit={() => onEdit(p)}
          onDelete={() => onDelete(p)}
          canDelete={canDelete}
        />
      ),
    },
  ];
}

function logoCell(p: Partner) {
  return p.logo?.thumbnailUrl ? (
    <img
      src={p.logo.thumbnailUrl}
      alt={p.logo.alt ?? p.name}
      className="h-12 w-12 rounded-md border bg-white object-contain p-1"
    />
  ) : (
    <div className="flex h-12 w-12 items-center justify-center rounded-md bg-muted">
      <Building2 className="h-4 w-4 text-muted-foreground" />
    </div>
  );
}

function publishCell(p: Partner) {
  return (
    <div className="flex items-center gap-2 text-xs text-muted-foreground">
      {p.isPublished ? (
        <><Eye className="h-3.5 w-3.5 text-sfpa-olive" /> Publié</>
      ) : (
        <><EyeOff className="h-3.5 w-3.5" /> Brouillon</>
      )}
    </div>
  );
}