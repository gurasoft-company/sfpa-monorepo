import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import { PARTNER_TYPES, PARTNER_TYPE_LABELS } from '@/services/partners.service';

interface Props {
  search: string;
  type: string;
  total?: number;
  onSearchChange: (v: string) => void;
  onTypeChange: (v: string) => void;
}

export function PartnersFilters({
  search, type, total, onSearchChange, onTypeChange,
}: Props) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="relative min-w-[240px] flex-1">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Rechercher un partenaire…"
          className="pl-9"
        />
      </div>
      <Select value={type || 'all'} onValueChange={(v) => onTypeChange(v === 'all' ? '' : v)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Tous les types" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Tous les types</SelectItem>
          {PARTNER_TYPES.map((t) => (
            <SelectItem key={t} value={t}>{PARTNER_TYPE_LABELS[t]}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      {typeof total === 'number' && (
        <p className="text-sm text-muted-foreground">
          {total} partenaire{total > 1 ? 's' : ''}
        </p>
      )}
    </div>
  );
}