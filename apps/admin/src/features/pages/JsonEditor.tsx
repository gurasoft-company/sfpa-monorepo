import { useMemo } from 'react';
import { AlertCircle, Check } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

interface Props {
  value: string;
  onChange: (v: string) => void;
  error?: string;
}

export function JsonEditor({ value, onChange, error }: Props) {
  const parseResult = useMemo(() => {
    if (!value.trim()) return { ok: true as const, data: null };
    try {
      return { ok: true as const, data: JSON.parse(value) };
    } catch (e) {
      return { ok: false as const, error: (e as Error).message };
    }
  }, [value]);

  const pretty = () => {
    if (!parseResult.ok) return;
    onChange(JSON.stringify(parseResult.data, null, 2));
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs">
          {value.trim() === '' ? (
            <span className="text-muted-foreground">Vide — laissez vide pour ignorer</span>
          ) : parseResult.ok ? (
            <span className="inline-flex items-center gap-1 text-emerald-600">
              <Check className="h-3.5 w-3.5" /> JSON valide
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 text-destructive">
              <AlertCircle className="h-3.5 w-3.5" /> JSON invalide
            </span>
          )}
        </div>
        <button
          type="button"
          onClick={pretty}
          disabled={!parseResult.ok || value.trim() === ''}
          className="text-xs text-sfpa-bleu hover:underline disabled:cursor-not-allowed disabled:opacity-50"
        >
          Reformater
        </button>
      </div>

      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={14}
        spellCheck={false}
        className={cn(
          'font-mono text-xs leading-relaxed',
          error && 'border-destructive focus-visible:ring-destructive'
        )}
        placeholder={`{\n  "hero": {\n    "title": "La Terre entre nos mains",\n    "subtitle": "…"\n  }\n}`}
      />

      {error && <p className="text-xs text-destructive">{error}</p>}

      {!parseResult.ok && (
        <p className="text-xs text-destructive">Erreur de parsing : {parseResult.error}</p>
      )}
    </div>
  );
}