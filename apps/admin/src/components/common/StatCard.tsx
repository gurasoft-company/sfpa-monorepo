import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type Tone = 'default' | 'olive' | 'terra' | 'ocre' | 'bleu';

interface Props {
  label: string;
  value: string | number;
  hint?: string;
  icon?: LucideIcon;
  tone?: Tone;
  className?: string;
}

const TONES: Record<Tone, { bg: string; text: string }> = {
  default: { bg: 'bg-muted', text: 'text-foreground' },
  olive: { bg: 'bg-sfpa-olive/10', text: 'text-sfpa-olive' },
  terra: { bg: 'bg-sfpa-terra/10', text: 'text-sfpa-terra' },
  ocre: { bg: 'bg-sfpa-ocre/15', text: 'text-sfpa-ocre' },
  bleu: { bg: 'bg-sfpa-bleu/10', text: 'text-sfpa-bleu' },
};

export function StatCard({ label, value, hint, icon: Icon, tone = 'default', className }: Props) {
  const t = TONES[tone];
  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{label}</CardTitle>
        {Icon && (
          <div className={cn('flex h-8 w-8 items-center justify-center rounded-lg', t.bg)}>
            <Icon className={cn('h-4 w-4', t.text)} />
          </div>
        )}
      </CardHeader>
      <CardContent>
        <p className="font-heading text-3xl font-bold tracking-tight">{value}</p>
        {hint && <p className="mt-1 text-xs text-muted-foreground">{hint}</p>}
      </CardContent>
    </Card>
  );
}