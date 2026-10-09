import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';

interface Props {
  search: string;
  isRead: string;      // '' | 'true' | 'false'
  total?: number;
  onSearchChange: (v: string) => void;
  onReadChange: (v: string) => void;
}

export function ContactsFilters({
  search, isRead, total, onSearchChange, onReadChange,
}: Props) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="relative min-w-[240px] flex-1">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Rechercher par nom, email, sujet…"
          className="pl-9"
        />
      </div>
      <Select
        value={isRead || 'all'}
        onValueChange={(v) => onReadChange(v === 'all' ? '' : v)}
      >
        <SelectTrigger className="w-[160px]">
          <SelectValue placeholder="Tous" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Tous</SelectItem>
          <SelectItem value="false">Non lus</SelectItem>
          <SelectItem value="true">Lus</SelectItem>
        </SelectContent>
      </Select>
      {typeof total === 'number' && (
        <p className="text-sm text-muted-foreground">
          {total} message{total > 1 ? 's' : ''}
        </p>
      )}
    </div>
  );
}