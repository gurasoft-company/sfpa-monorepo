import { Eye, EyeOff, GraduationCap } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { DataTableRowActions } from '@/components/data-table/DataTableRowActions';
//import { StatusBadge } from '@/components/common/StatusBadge';
import type { Column } from '@/components/data-table/types';
import {
  FORMATION_CATEGORY_LABELS, type Formation,
} from '@/services/formations.service';

interface Handlers {
  onEdit: (f: Formation) => void;
  onDelete: (f: Formation) => void;
  canDelete: boolean;
}

export function buildFormationColumns({
  onEdit, onDelete, canDelete,
}: Handlers): Column<Formation>[] {
  return [
    { key: 'cover', header: '', className: 'w-[80px]', cell: coverCell },
    {
      key: 'title', header: 'Formation', sortValue: (f) => f.title,
      cell: (f) => (
        <div className="min-w-0">
          <p className="truncate font-medium">{f.title}</p>
          <p className="truncate text-xs text-muted-foreground">
            {f.duration ?? '—'} · {f.level ?? '—'}
          </p>
        </div>
      ),
    },
    {
      key: 'category', header: 'Catégorie', sortValue: (f) => f.category,
      cell: (f) => (
        <Badge variant="secondary" className="text-xs">
          {FORMATION_CATEGORY_LABELS[f.category]}
        </Badge>
      ),
    },
    {
      key: 'objectives', header: 'Objectifs', align: 'center',
      sortValue: (f) => f.objectives.length,
      cell: (f) => (
        <span className="text-sm text-muted-foreground">
          {f.objectives.length} objectif{f.objectives.length > 1 ? 's' : ''}
        </span>
      ),
    },
    {
      key: 'displayOrder', header: 'Ordre', sortValue: (f) => f.displayOrder,
      cell: (f) => (
        <span className="text-sm text-muted-foreground">{f.displayOrder}</span>
      ),
    },
    {
      key: 'published', header: 'Publication',
      sortValue: (f) => (f.isPublished ? 1 : 0),
      cell: publishCell,
    },
    {
      key: 'actions', header: '', className: 'w-[60px]', align: 'right',
      cell: (f) => (
        <DataTableRowActions
          onEdit={() => onEdit(f)}
          onDelete={() => onDelete(f)}
          canDelete={canDelete}
        />
      ),
    },
  ];
}

function coverCell(f: Formation) {
  return f.coverImage?.thumbnailUrl ? (
    <img
      src={f.coverImage.thumbnailUrl}
      alt={f.coverImage.alt ?? f.title}
      className="h-12 w-16 rounded-md object-cover"
    />
  ) : (
    <div className="flex h-12 w-16 items-center justify-center rounded-md bg-muted">
      <GraduationCap className="h-4 w-4 text-muted-foreground" />
    </div>
  );
}

function publishCell(f: Formation) {
  return (
    <div className="flex items-center gap-2 text-xs text-muted-foreground">
      {f.isPublished ? (
        <><Eye className="h-3.5 w-3.5 text-sfpa-olive" /> Publié</>
      ) : (
        <><EyeOff className="h-3.5 w-3.5" /> Brouillon</>
      )}
    </div>
  );
}