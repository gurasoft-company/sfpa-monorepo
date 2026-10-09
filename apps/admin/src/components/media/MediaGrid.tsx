import { ImageOff } from 'lucide-react';
import type { Media } from '@/services/media.service';
import { MediaCard } from './MediaCard';
import { EmptyState } from '@/components/common/EmptyState';
import { cn } from '@/lib/utils';

interface Props {
  items: Media[];
  selectedId?: string;
  selectable?: boolean;
  onSelect?: (media: Media) => void;
  onDelete?: (media: Media) => void;
  className?: string;
}

export function MediaGrid({
  items,
  selectedId,
  selectable,
  onSelect,
  onDelete,
  className,
}: Props) {
  if (items.length === 0) {
    return (
      <EmptyState
        icon={ImageOff}
        title="Aucun média"
        description="Uploadez vos premières images pour les utiliser dans vos projets et articles."
      />
    );
  }

  return (
    <div
      className={cn(
        'grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5',
        className
      )}
    >
      {items.map((media) => (
        <MediaCard
          key={media.id}
          media={media}
          selected={selectedId === media.id}
          selectable={selectable}
          onSelect={onSelect}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}