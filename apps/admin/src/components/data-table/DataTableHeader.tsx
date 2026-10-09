import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react';
import { TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { cn } from '@/lib/utils';
import type { Column } from './types';
import type { SortState } from './useTableSort';

interface Props<T> {
  columns: Column<T>[];
  sort: SortState;
  onToggle: (key: string) => void;
}

export function DataTableHeader<T>({ columns, sort, onToggle }: Props<T>) {
  return (
    <TableHeader>
      <TableRow className="bg-muted/40 hover:bg-muted/40">
        {columns.map((col) => {
          const active = sort?.key === col.key;
          const sortable = Boolean(col.sortValue);
          return (
            <TableHead
              key={col.key}
              onClick={() => sortable && onToggle(col.key)}
              className={cn(
                'font-heading text-xs uppercase tracking-wide text-muted-foreground',
                col.align === 'right' && 'text-right',
                col.align === 'center' && 'text-center',
                sortable && 'cursor-pointer select-none hover:text-foreground',
                col.className
              )}
            >
              <span className="inline-flex items-center gap-1">
                {col.header}
                {sortable && (
                  <span className="text-muted-foreground/60">
                    {active && sort?.direction === 'asc' ? (
                      <ArrowUp className="h-3 w-3" />
                    ) : active && sort?.direction === 'desc' ? (
                      <ArrowDown className="h-3 w-3" />
                    ) : (
                      <ArrowUpDown className="h-3 w-3" />
                    )}
                  </span>
                )}
              </span>
            </TableHead>
          );
        })}
      </TableRow>
    </TableHeader>
  );
}