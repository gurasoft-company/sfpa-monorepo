import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import {
  FORMATION_CATEGORIES, FORMATION_CATEGORY_LABELS,
} from '@/services/formations.service';

interface Props {
  search: string;
  category: string;
  total?: number;
  onSearchChange: (v: string) => void;
  onCategoryChange: (v: string) => void;
}

export function FormationsFilters({
  search, category, total, onSearchChange, onCategoryChange,
}: Props) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="relative min-w-[240px] flex-1">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Rechercher une formation…"
          className="pl-9"
        />
      </div>
      <Select
        value={category || 'all'}
        onValueChange={(v) => onCategoryChange(v === 'all' ? '' : v)}
      >
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Toutes catégories" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Toutes catégories</SelectItem>
          {FORMATION_CATEGORIES.map((c) => (
            <SelectItem key={c} value={c}>
              {FORMATION_CATEGORY_LABELS[c]}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {typeof total === 'number' && (
        <p className="text-sm text-muted-foreground">
          {total} formation{total > 1 ? 's' : ''}
        </p>
      )}
    </div>
  );
}