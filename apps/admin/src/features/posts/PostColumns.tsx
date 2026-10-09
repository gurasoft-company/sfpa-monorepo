import { Newspaper, Eye, EyeOff } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Badge } from '@/components/ui/badge';
import { DataTableRowActions } from '@/components/data-table/DataTableRowActions';
import type { Column } from '@/components/data-table/types';
import type { Post } from '@/services/posts.service';

interface Handlers {
  onEdit: (p: Post) => void;
  onDelete: (p: Post) => void;
  canDelete: boolean;
}

export function buildPostColumns(h: Handlers): Column<Post>[] {
  return [
    { key: 'cover', header: '', className: 'w-[80px]', cell: coverCell },
    {
      key: 'title', header: 'Titre', sortValue: (p) => p.title,
      cell: (p) => (
        <div className="min-w-0">
          <p className="truncate font-medium">{p.title}</p>
          {p.excerpt && (
            <p className="truncate text-xs text-muted-foreground">{p.excerpt}</p>
          )}
        </div>
      ),
    },
    {
      key: 'category', header: 'Catégorie',
      sortValue: (p) => p.category ?? '',
      cell: (p) => p.category
        ? <Badge variant="secondary" className="text-xs">{p.category}</Badge>
        : <span className="text-xs text-muted-foreground">—</span>,
    },
    {
      key: 'tags', header: 'Tags',
      cell: (p) => p.tags.length === 0 ? (
        <span className="text-xs text-muted-foreground">—</span>
      ) : (
        <div className="flex flex-wrap gap-1">
          {p.tags.slice(0, 3).map((t) => (
            <span key={t} className="rounded-full bg-muted px-2 py-0.5 text-[10px] text-muted-foreground">
              #{t}
            </span>
          ))}
          {p.tags.length > 3 && (
            <span className="text-[10px] text-muted-foreground">+{p.tags.length - 3}</span>
          )}
        </div>
      ),
    },
    {
      key: 'published', header: 'Publication',
      sortValue: (p) => (p.isPublished ? 1 : 0),
      cell: publishCell,
    },
    {
      key: 'updatedAt', header: 'Modifié',
      sortValue: (p) => new Date(p.updatedAt).getTime(),
      cell: (p) => (
        <span className="text-xs text-muted-foreground">
          {format(new Date(p.updatedAt), 'dd MMM yyyy', { locale: fr })}
        </span>
      ),
    },
    {
      key: 'actions', header: '', className: 'w-[60px]', align: 'right',
      cell: (p) => (
        <DataTableRowActions
          onEdit={() => h.onEdit(p)}
          onDelete={() => h.onDelete(p)}
          canDelete={h.canDelete}
        />
      ),
    },
  ];
}

function coverCell(p: Post) {
  return p.coverImage?.thumbnailUrl ? (
    <img
      src={p.coverImage.thumbnailUrl}
      alt={p.coverImage.alt ?? p.title}
      className="h-12 w-16 rounded-md object-cover"
    />
  ) : (
    <div className="flex h-12 w-16 items-center justify-center rounded-md bg-muted">
      <Newspaper className="h-4 w-4 text-muted-foreground" />
    </div>
  );
}

function publishCell(p: Post) {
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