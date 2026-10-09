import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { StatusBadge } from '@/components/common/StatusBadge';

export interface RecentItem {
  id: string;
  primary: string;
  secondary?: string;
  date: string;
  badge?: {
    label: string;
    tone?: 'default' | 'success' | 'warning' | 'destructive' | 'info' | 'secondary';
  };
}

interface Props {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  loading?: boolean;
  items: RecentItem[];
  limit?: number;
}

export function RecentPanel({
  title,
  href,
  icon: Icon,
  loading,
  items,
  limit = 5,
}: Props) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <Icon className="h-4 w-4 text-muted-foreground" />
          {title}
        </CardTitle>
        <Button asChild variant="ghost" size="sm" className="text-xs">
          <Link to={href}>
            Voir tout <ArrowRight className="h-3 w-3" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent className="space-y-3">
        {loading &&
          Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="space-y-1.5">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
            </div>
          ))}

        {!loading && !items.length && (
          <p className="py-6 text-center text-sm text-muted-foreground">
            Aucun élément pour l'instant
          </p>
        )}

        {!loading &&
          items.slice(0, limit).map((item) => (
            <div
              key={item.id}
              className="flex items-start justify-between gap-3 border-b border-border/60 pb-3 last:border-0 last:pb-0"
            >
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{item.primary}</p>
                {item.secondary && (
                  <p className="truncate text-xs text-muted-foreground">
                    {item.secondary}
                  </p>
                )}
              </div>
              <div className="flex flex-col items-end gap-1">
                {item.badge && (
                  <StatusBadge label={item.badge.label} tone={item.badge.tone} />
                )}
                <span className="text-[10px] text-muted-foreground">
                  {format(new Date(item.date), 'dd MMM', { locale: fr })}
                </span>
              </div>
            </div>
          ))}
      </CardContent>
    </Card>
  );
}