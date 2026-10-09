import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import {
  DONATION_FREQUENCIES, DONATION_FREQUENCY_LABELS,
  DONATION_STATUSES, DONATION_STATUS_LABELS,
} from '@/services/donations.service';

interface Props {
  search: string;
  status: string;
  frequency: string;
  from: string;
  to: string;
  total?: number;
  onSearchChange: (v: string) => void;
  onStatusChange: (v: string) => void;
  onFrequencyChange: (v: string) => void;
  onFromChange: (v: string) => void;
  onToChange: (v: string) => void;
}

export function DonationFilters(p: Props) {
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative min-w-[240px] flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={p.search}
            onChange={(e) => p.onSearchChange(e.target.value)}
            placeholder="Rechercher par nom, email, ID Stripe…"
            className="pl-9"
          />
        </div>

        <Select
          value={p.status || 'all'}
          onValueChange={(v) => p.onStatusChange(v === 'all' ? '' : v)}
        >
          <SelectTrigger className="w-[160px]"><SelectValue placeholder="Statut" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous statuts</SelectItem>
            {DONATION_STATUSES.map((s) => (
              <SelectItem key={s} value={s}>{DONATION_STATUS_LABELS[s]}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={p.frequency || 'all'}
          onValueChange={(v) => p.onFrequencyChange(v === 'all' ? '' : v)}
        >
          <SelectTrigger className="w-[160px]"><SelectValue placeholder="Fréquence" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Toutes</SelectItem>
            {DONATION_FREQUENCIES.map((f) => (
              <SelectItem key={f} value={f}>{DONATION_FREQUENCY_LABELS[f]}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <label className="text-xs text-muted-foreground">Du</label>
        <Input
          type="date"
          value={p.from}
          onChange={(e) => p.onFromChange(e.target.value)}
          className="w-[160px]"
        />
        <label className="text-xs text-muted-foreground">au</label>
        <Input
          type="date"
          value={p.to}
          onChange={(e) => p.onToChange(e.target.value)}
          className="w-[160px]"
        />
        {typeof p.total === 'number' && (
          <p className="ml-auto text-sm text-muted-foreground">
            {p.total} don{p.total > 1 ? 's' : ''}
          </p>
        )}
      </div>
    </div>
  );
}