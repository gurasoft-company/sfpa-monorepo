import { Construction } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Props {
  title: string;
  phase?: string;
}

export default function ComingSoon({ title, phase = 'Phase suivante' }: Props) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <h1 className="font-heading text-3xl font-bold text-sfpa-anthracite">
          {title}
        </h1>
        <Badge variant="warning" className="uppercase">
          {phase}
        </Badge>
      </div>

      <Card>
        <CardContent className="flex flex-col items-center justify-center gap-3 py-16 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-muted">
            <Construction className="h-6 w-6 text-muted-foreground" />
          </div>
          <div>
            <p className="font-medium">Module en construction</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Ce module sera implémenté dans : <strong>{phase}</strong>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}