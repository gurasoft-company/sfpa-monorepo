import { useState } from 'react';

export type SortState = { key: string; direction: 'asc' | 'desc' } | null;

export function useTableSort() {
  const [sort, setSort] = useState<SortState>(null);

  const toggle = (key: string) =>
    setSort((prev) => {
      if (!prev || prev.key !== key) return { key, direction: 'asc' };
      if (prev.direction === 'asc') return { key, direction: 'desc' };
      return null;
    });

  return { sort, toggle };
}

export function applySort<T>(
  rows: T[],
  sort: SortState,
  getValue: (row: T, key: string) => string | number | undefined
): T[] {
  if (!sort) return rows;
  return [...rows].sort((a, b) => {
    const va = getValue(a, sort.key);
    const vb = getValue(b, sort.key);
    if (va === undefined || vb === undefined) return 0;
    const cmp =
      typeof va === 'number' && typeof vb === 'number'
        ? va - vb
        : String(va).localeCompare(String(vb), 'fr');
    return sort.direction === 'asc' ? cmp : -cmp;
  });
}