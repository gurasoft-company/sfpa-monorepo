import type { ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';
import { Table, TableBody } from '@/components/ui/table';
import { LoadingSkeleton } from '@/components/common/LoadingSkeleton';
import { EmptyState } from '@/components/common/EmptyState';
import { DataTableHeader } from './DataTableHeader';
import { DataTableRow } from './DataTableRow';
import { applySort, useTableSort } from './useTableSort';
import type { Column } from './types';

export type { Column } from './types';

interface Props<T> {
  columns: Column<T>[];
  data: T[];
  rowKey: (row: T) => string;
  loading?: boolean;
  onRowClick?: (row: T) => void;
  rowClassName?: (row: T) => string | undefined;
  emptyState?: {
    icon?: LucideIcon;
    title: string;
    description?: string;
    action?: ReactNode;
  };
}

export function DataTable<T>({
  columns, data, rowKey, loading, onRowClick, rowClassName, emptyState,
}: Props<T>) {
  const { sort, toggle } = useTableSort();
  const getValue = (row: T, key: string) =>
    columns.find((c) => c.key === key)?.sortValue?.(row);

  const rows = applySort(data, sort, getValue);

  if (loading) return <LoadingSkeleton variant="table" count={6} />;

  if (!data.length && emptyState) {
    return (
      <EmptyState
        icon={emptyState.icon}
        title={emptyState.title}
        description={emptyState.description}
        action={emptyState.action}
      />
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border bg-card">
      <Table>
        <DataTableHeader columns={columns} sort={sort} onToggle={toggle} />
        <TableBody>
          {rows.map((row) => (
            <DataTableRow
              key={rowKey(row)}
              row={row}
              columns={columns}
              onClick={onRowClick ? () => onRowClick(row) : undefined}
              className={rowClassName?.(row)}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}