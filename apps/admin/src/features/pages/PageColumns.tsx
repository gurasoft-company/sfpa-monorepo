import { Eye, EyeOff, FileText } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { DataTableRowActions } from '@/components/data-table/DataTableRowActions';
import type { Column } from '@/components/data-table/types';
import type { Page } from '@/services/pages.service';

interface Handlers {
  onEdit: (p: Page) => void;
  onDelete: (p: Page) => void;
  canDelete: boolean;
}

export function buildPageColumns(h: Handlers): Column<Page>[] {
  return [
    {
      key: 'title', header: 'Page',
      sortValue: (p) => p.title,
      cell: (p) => (
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-muted">
            <FileText className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="min-w-0">
            <p className="truncate font-medium">{p.title}</p>
            <p className="truncate font-mono text-xs text-muted-foreground">/{p.slug}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'sections', header: 'Sections',
      cell: (p) => {
        const keys = p.content ? Object.keys(p.content) : [];
        return keys.length > 0 ? (
          <span className="text-xs text-muted-foreground">
            {keys.length} clé{keys.length > 1 ? 's' : ''}
          </span>
        ) : (
          <span className="text-xs text-muted-foreground">—</span>
        );
      },
    },
    {
      key: 'seo', header: 'SEO',
      cell: (p) => p.metaTitle ? (
        <span className="truncate text-xs text-muted-foreground" title={p.metaTitle}>
          {p.metaTitle.slice(0, 40)}{p.metaTitle.length > 40 ? '…' : ''}
        </span>
      ) : (
        <span className="text-xs text-muted-foreground">—</span>
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

function publishCell(p: Page) {
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