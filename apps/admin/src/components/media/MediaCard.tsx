import { Check, Copy, ImageOff, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import type { Media } from '@/services/media.service';
import { FOLDER_LABELS, formatBytes, type MediaFolder } from '@/services/media.service';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface Props {
  media: Media;
  selected?: boolean;
  selectable?: boolean;
  onSelect?: (media: Media) => void;
  onDelete?: (media: Media) => void;
}

export function MediaCard({ media, selected, selectable, onSelect, onDelete }: Props) {
  const handleClick = () => {
    if (selectable && onSelect) onSelect(media);
  };

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(media.url);
      toast.success('URL copiée dans le presse-papiers');
    } catch {
      toast.error('Impossible de copier');
    }
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete?.(media);
  };

  return (
    <div
      onClick={handleClick}
      className={cn(
        'group relative overflow-hidden rounded-lg border bg-card transition-all',
        selectable && 'cursor-pointer hover:border-primary hover:shadow-md',
        selected && 'ring-2 ring-primary ring-offset-2'
      )}
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-muted">
        {media.thumbnailUrl || media.url ? (
          <img
            src={media.thumbnailUrl || media.url}
            alt={media.alt || media.originalName}
            loading="lazy"
            className="h-full w-full object-cover transition-transform group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <ImageOff className="h-8 w-8 text-muted-foreground" />
          </div>
        )}

        {/* Badge sélection */}
        {selected && (
          <div className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground shadow">
            <Check className="h-3.5 w-3.5" />
          </div>
        )}

        {/* Actions au survol */}
        {!selectable && (
          <div className="absolute inset-x-0 top-0 flex justify-end gap-1 bg-gradient-to-b from-black/60 to-transparent p-2 opacity-0 transition-opacity group-hover:opacity-100">
            <Button
              size="icon"
              variant="secondary"
              className="h-7 w-7"
              onClick={handleCopy}
              title="Copier l'URL"
            >
              <Copy className="h-3.5 w-3.5" />
            </Button>
            {onDelete && (
              <Button
                size="icon"
                variant="destructive"
                className="h-7 w-7"
                onClick={handleDelete}
                title="Supprimer"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            )}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="space-y-1 p-2">
        <p className="truncate text-xs font-medium" title={media.originalName}>
          {media.originalName}
        </p>
        <div className="flex items-center justify-between gap-2">
          <Badge variant="secondary" className="text-[10px]">
            {FOLDER_LABELS[media.folder as MediaFolder] ?? media.folder}
          </Badge>
          <span className="text-[10px] text-muted-foreground">{formatBytes(media.size)}</span>
        </div>
      </div>
    </div>
  );
}