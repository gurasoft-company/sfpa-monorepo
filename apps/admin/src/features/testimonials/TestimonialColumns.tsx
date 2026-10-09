import { Star, User } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { DataTableRowActions } from '@/components/data-table/DataTableRowActions';
import { StatusBadge, STATUS_MAP } from '@/components/common/StatusBadge';
import { TestimonialQuickActions } from './TestimonialQuickActions';
import type { Column } from '@/components/data-table/types';
import type { Testimonial } from '@/services/testimonials.service';
import { getInitials } from '@/lib/utils';

interface Handlers {
  onEdit: (t: Testimonial) => void;
  onDelete: (t: Testimonial) => void;
  onApprove: (t: Testimonial) => void;
  onReject: (t: Testimonial) => void;
  canDelete: boolean;
  loading?: boolean;
}

export function buildTestimonialColumns(h: Handlers): Column<Testimonial>[] {
  return [
    { key: 'author', header: 'Auteur', sortValue: (t) => t.authorName, cell: authorCell },
    { key: 'quote', header: 'Témoignage', cell: quoteCell },
    { key: 'rating', header: 'Note', align: 'center', sortValue: (t) => t.rating ?? 0, cell: ratingCell },
    {
      key: 'status', header: 'Statut', sortValue: (t) => t.status,
      cell: (t) => {
        const m = STATUS_MAP[t.status];
        return <StatusBadge label={m?.label ?? t.status} tone={m?.tone} />;
      },
    },
    {
      key: 'featured', header: 'À la une', align: 'center',
      sortValue: (t) => (t.isFeatured ? 1 : 0),
      cell: (t) => t.isFeatured
        ? <Badge variant="default" className="text-[10px]">★ Oui</Badge>
        : <span className="text-xs text-muted-foreground">—</span>,
    },
    {
      key: 'quick', header: '', className: 'w-[200px]',
      cell: (t) => (
        <TestimonialQuickActions
          testimonial={t}
          onApprove={h.onApprove}
          onReject={h.onReject}
          loading={h.loading}
        />
      ),
    },
    {
      key: 'actions', header: '', className: 'w-[60px]', align: 'right',
      cell: (t) => (
        <DataTableRowActions
          onEdit={() => h.onEdit(t)}
          onDelete={() => h.onDelete(t)}
          canDelete={h.canDelete}
        />
      ),
    },
  ];
}

function authorCell(t: Testimonial) {
  return (
    <div className="flex items-center gap-2 min-w-0">
      <Avatar className="h-8 w-8 shrink-0">
        {t.authorImage?.thumbnailUrl && <AvatarImage src={t.authorImage.thumbnailUrl} />}
        <AvatarFallback className="bg-sfpa-olive text-white text-[10px]">
          {getInitials(t.authorName.split(' ')[0], t.authorName.split(' ')[1])}
        </AvatarFallback>
      </Avatar>
      <div className="min-w-0">
        <p className="truncate text-sm font-medium">{t.authorName}</p>
        <p className="truncate text-xs text-muted-foreground">
          {t.authorLocation ?? t.authorRole ?? '—'}
        </p>
      </div>
    </div>
  );
}

function quoteCell(t: Testimonial) {
  return (
    <p className="line-clamp-2 max-w-md text-sm text-muted-foreground">
      « {t.quote} »
    </p>
  );
}

function ratingCell(t: Testimonial) {
  if (!t.rating) return <span className="text-xs text-muted-foreground">—</span>;
  return (
    <span className="inline-flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={
            i < (t.rating ?? 0)
              ? 'h-3.5 w-3.5 fill-sfpa-ocre text-sfpa-ocre'
              : 'h-3.5 w-3.5 text-muted-foreground/40'
          }
        />
      ))}
    </span>
  );
}