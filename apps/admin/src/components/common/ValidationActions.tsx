import { Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Props {
  status: string;
  onApprove: () => void;
  onReject: () => void;
  loading?: boolean;
}

export function ValidationActions({ status, onApprove, onReject, loading }: Props) {
  if (status !== 'pending') return null;

  return (
    <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
      <Button
        size="sm"
        variant="ghost"
        disabled={loading}
        onClick={onApprove}
        className="h-8 gap-1 text-emerald-600 hover:bg-emerald-50 hover:text-emerald-700"
      >
        <Check className="h-3.5 w-3.5" /> Approuver
      </Button>
      <Button
        size="sm"
        variant="ghost"
        disabled={loading}
        onClick={onReject}
        className="h-8 gap-1 text-destructive hover:bg-destructive/5"
      >
        <X className="h-3.5 w-3.5" /> Rejeter
      </Button>
    </div>
  );
}