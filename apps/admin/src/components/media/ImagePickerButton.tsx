import { useState } from 'react';
import { Image as ImageIcon, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ImagePicker } from './ImagePicker';
import type { Media, MediaFolder } from '@/services/media.service';

export interface MediaPreview {
  id: string;
  url: string;
  thumbnailUrl: string;
  alt: string | null;
}

interface Props {
  value?: MediaPreview | null;
  onChange: (m: MediaPreview | null) => void;
  folder?: MediaFolder;
  label?: string;
}

export function ImagePickerButton({ value, onChange, folder, label = 'Choisir une image' }: Props) {
  const [open, setOpen] = useState(false);
  const select = (m: Media) => onChange({ id: m.id, url: m.url, thumbnailUrl: m.thumbnailUrl, alt: m.alt });

  return (
    <>
      {value ? (
        <div className="space-y-2">
          <div className="relative overflow-hidden rounded-lg border bg-muted">
            <img src={value.thumbnailUrl || value.url} alt={value.alt ?? ''} className="aspect-video w-full object-cover" />
            <Button type="button" size="icon" variant="destructive" className="absolute right-2 top-2 h-7 w-7" onClick={() => onChange(null)}>
              <X className="h-3.5 w-3.5" />
            </Button>
          </div>
          <Button type="button" variant="outline" size="sm" className="w-full" onClick={() => setOpen(true)}>
            Changer l'image
          </Button>
        </div>
      ) : (
        <button type="button" onClick={() => setOpen(true)} className="flex aspect-video w-full flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-muted-foreground/25 bg-muted/20 text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground">
          <ImageIcon className="h-6 w-6" />
          <span className="text-sm font-medium">{label}</span>
        </button>
      )}
      <ImagePicker open={open} onOpenChange={setOpen} onSelect={select} defaultFolder={folder} />
    </>
  );
}