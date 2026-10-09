import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';

interface Props {
  search: string;
  isPublished: string;
  total?: number;
  onSearchChange: (v: string) => void;
  onPublishedChange: (v: string) => void;
}

export function PagesFilters({
  search, isPublished, total, onSearchChange, onPublishedChange,
}: Props) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="relative min-w-[240px] flex-1">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Rechercher une page…"
          className="pl-9"
        />
      </div>
      <Select
        value={isPublished || 'all'}
        onValueChange={(v) => onPublishedChange(v === 'all' ? '' : v)}
      >
        <SelectTrigger className="w-[160px]">
          <SelectValue placeholder="Toutes" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Toutes</SelectItem>
          <SelectItem value="true">Publiées</SelectItem>
          <SelectItem value="false">Brouillons</SelectItem>
        </SelectContent>
      </Select>
      {typeof total === 'number' && (
        <p className="text-sm text-muted-foreground">
          {total} page{total > 1 ? 's' : ''}
        </p>
      )}
    </div>
  );
}