import { TableCell, TableRow } from '@/components/ui/table';
import { cn } from '@/lib/utils';
import type { Column } from './types';

interface Props<T> {
  row: T;
  columns: Column<T>[];
  onClick?: () => void;
  className?: string;
}

export function DataTableRow<T>({ row, columns, onClick, className }: Props<T>) {
  return (
    <TableRow onClick={onClick} className={cn(onClick && 'cursor-pointer', className)}>
      {columns.map((col) => (
        <TableCell
          key={col.key}
          className={cn(
            col.align === 'right' && 'text-right',
            col.align === 'center' && 'text-center',
            col.className
          )}
        >
          {col.cell(row)}
        </TableCell>
      ))}
    </TableRow>
  );
}