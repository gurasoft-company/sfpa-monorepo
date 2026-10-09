import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { PaginatedResponse } from '@/types/api';

type Meta = PaginatedResponse<unknown>['data']['pagination'];

interface Props {
  pagination: Meta;
  onPageChange: (page: number) => void;
}

export function Pagination({ pagination, onPageChange }: Props) {
  const { page, totalPages, total, limit } = pagination;
  if (totalPages <= 1) return null;
  const from = (page - 1) * limit + 1;
  const to = Math.min(page * limit, total);

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 pt-4">
      <p className="text-sm text-muted-foreground">
        <span className="font-medium">{from}</span>–<span className="font-medium">{to}</span> sur{' '}
        <span className="font-medium">{total}</span>
      </p>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" disabled={!pagination.hasPrev} onClick={() => onPageChange(page - 1)}>
          <ChevronLeft className="h-4 w-4" /> Précédent
        </Button>
        <span className="px-2 text-sm">Page <span className="font-medium">{page}</span> / {totalPages}</span>
        <Button variant="outline" size="sm" disabled={!pagination.hasNext} onClick={() => onPageChange(page + 1)}>
          Suivant <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}