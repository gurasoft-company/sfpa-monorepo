import { Eye, EyeOff, FolderKanban } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Badge } from '@/components/ui/badge';
import { DataTableRowActions } from '@/components/data-table/DataTableRowActions';
import { StatusBadge, STATUS_MAP } from '@/components/common/StatusBadge';
import type { Column } from '@/components/data-table/types';
import { CATEGORY_LABELS, type Project } from '@/services/projects.service';

interface Handlers {
  onEdit: (p: Project) => void;
  onDelete: (p: Project) => void;
  canDelete: boolean;
}

export function buildProjectColumns({ onEdit, onDelete, canDelete }: Handlers): Column<Project>[] {
  return [
    { key: 'cover', header: '', className: 'w-[80px]', cell: coverCell },
    {
      key: 'title', header: 'Titre', sortValue: (p) => p.title,
      cell: (p) => (
        <div className="min-w-0">
          <p className="truncate font-medium">{p.title}</p>
          <p className="truncate text-xs text-muted-foreground">{p.country ?? '—'}</p>
        </div>
      ),
    },
    {
      key: 'category', header: 'Catégorie', sortValue: (p) => p.category,
      cell: (p) => <Badge variant="secondary" className="text-xs">{CATEGORY_LABELS[p.category]}</Badge>,
    },
    {
      key: 'status', header: 'Statut', sortValue: (p) => p.status,
      cell: (p) => {
        const m = STATUS_MAP[p.status];
        return <StatusBadge label={m?.label ?? p.status} tone={m?.tone} />;
      },
    },
    { key: 'published', header: 'Publication', sortValue: (p) => (p.isPublished ? 1 : 0), cell: publishCell },
    {
      key: 'updatedAt', header: 'Modifié', sortValue: (p) => new Date(p.updatedAt).getTime(),
      cell: (p) => (
        <span className="text-xs text-muted-foreground">
          {format(new Date(p.updatedAt), 'dd MMM yyyy', { locale: fr })}
        </span>
      ),
    },
    {
      key: 'actions', header: '', className: 'w-[60px]', align: 'right',
      cell: (p) => <DataTableRowActions onEdit={() => onEdit(p)} onDelete={() => onDelete(p)} canDelete={canDelete} />,
    },
  ];
}

function coverCell(p: Project) {
  return p.coverImage?.thumbnailUrl ? (
    <img src={p.coverImage.thumbnailUrl} alt={p.coverImage.alt ?? p.title} className="h-12 w-16 rounded-md object-cover" />
  ) : (
    <div className="flex h-12 w-16 items-center justify-center rounded-md bg-muted">
      <FolderKanban className="h-4 w-4 text-muted-foreground" />
    </div>
  );
}

function publishCell(p: Project) {
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