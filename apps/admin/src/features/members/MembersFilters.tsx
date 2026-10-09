import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';

interface Props {
  search: string;
  status: string;
  total?: number;
  onSearchChange: (v: string) => void;
  onStatusChange: (v: string) => void;
}

export function MembersFilters({
  search, status, total, onSearchChange, onStatusChange,
}: Props) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="relative min-w-[240px] flex-1">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Rechercher un adhérent…"
          className="pl-9"
        />
      </div>
      <Select value={status || 'all'} onValueChange={(v) => onStatusChange(v === 'all' ? '' : v)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Tous les statuts" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Tous les statuts</SelectItem>
          <SelectItem value="pending">En attente</SelectItem>
          <SelectItem value="approved">Approuvés</SelectItem>
          <SelectItem value="rejected">Rejetés</SelectItem>
        </SelectContent>
      </Select>
      {typeof total === 'number' && (
        <p className="text-sm text-muted-foreground">
          {total} adhérent{total > 1 ? 's' : ''}
        </p>
      )}
    </div>
  );
}