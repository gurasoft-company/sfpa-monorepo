import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ImageIcon } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { LoadingSkeleton } from '@/components/common/LoadingSkeleton';
import { MediaGrid } from './MediaGrid';
import { MediaUploader } from './MediaUploader';
import { Pagination } from '@/components/common/Pagination';
import {
  FOLDER_LABELS,
  MEDIA_FOLDERS,
  listMedia,
  type Media,
  type MediaFolder,
} from '@/services/media.service';
import { cn } from '@/lib/utils';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelect: (media: Media) => void;
  /** Dossier par défaut (pré-filtre la bibliothèque + l'upload) */
  defaultFolder?: MediaFolder;
}

export function ImagePicker({ open, onOpenChange, onSelect, defaultFolder }: Props) {
  const [tab, setTab] = useState<'library' | 'upload'>('library');
  const [page, setPage] = useState(1);
  const [folder, setFolder] = useState<string>('');
  const [selected, setSelected] = useState<Media | null>(null);

  // Reset quand on ouvre
  useEffect(() => {
    if (open) {
      setTab('library');
      setPage(1);
      setFolder(defaultFolder ?? '');
      setSelected(null);
    }
  }, [open, defaultFolder]);

  const { data, isLoading } = useQuery({
    queryKey: ['media', { page, folder, context: 'picker' }],
    queryFn: () =>
      listMedia({ page, limit: 24, folder: folder || undefined }),
    enabled: open && tab === 'library',
  });

  const handleConfirm = () => {
    if (selected) {
      onSelect(selected);
      onOpenChange(false);
    }
  };

  const handleUploaded = (medias: Media[]) => {
    if (medias[0]) {
      onSelect(medias[0]);
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ImageIcon className="h-5 w-5 text-sfpa-terra" />
            Choisir une image
          </DialogTitle>
          <DialogDescription>
            Sélectionnez une image existante ou uploadez-en une nouvelle.
          </DialogDescription>
        </DialogHeader>

        <Tabs
          value={tab}
          onValueChange={(v) => setTab(v as 'library' | 'upload')}
          className="flex-1 flex flex-col overflow-hidden"
        >
          <TabsList className="grid w-full max-w-xs grid-cols-2">
            <TabsTrigger value="library">Bibliothèque</TabsTrigger>
            <TabsTrigger value="upload">Upload</TabsTrigger>
          </TabsList>

          {/* Onglet Bibliothèque */}
          <TabsContent value="library" className="flex-1 overflow-hidden mt-4">
            <div className="flex h-full flex-col">
              {/* Filtre dossier */}
              <div className="mb-3 flex items-center gap-2">
                <Label className="text-xs text-muted-foreground">Dossier :</Label>
                <select
                  value={folder}
                  onChange={(e) => {
                    setFolder(e.target.value);
                    setPage(1);
                  }}
                  className="h-9 rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <option value="">{FOLDER_LABELS.all}</option>
                  {MEDIA_FOLDERS.map((f) => (
                    <option key={f} value={f}>
                      {FOLDER_LABELS[f]}
                    </option>
                  ))}
                </select>
              </div>

              {/* Grille */}
              <div className="flex-1 overflow-y-auto pr-1">
                {isLoading ? (
                  <LoadingSkeleton variant="grid" count={12} />
                ) : (
                  <MediaGrid
                    items={data?.items ?? []}
                    selectedId={selected?.id}
                    selectable
                    onSelect={setSelected}
                  />
                )}
              </div>

              {/* Pagination */}
              {data?.pagination && (
                <Pagination pagination={data.pagination} onPageChange={setPage} />
              )}
            </div>
          </TabsContent>

          {/* Onglet Upload */}
          <TabsContent value="upload" className="flex-1 overflow-y-auto mt-4">
            <MediaUploader
              defaultFolder={defaultFolder}
              lockFolder={Boolean(defaultFolder)}
              multiple={false}
              onUploaded={handleUploaded}
            />
          </TabsContent>
        </Tabs>

        {/* Footer sticky (uniquement pour l'onglet bibliothèque) */}
        {tab === 'library' && (
          <div className="flex items-center justify-between gap-3 border-t pt-4">
            <p className="text-xs text-muted-foreground">
              {selected
                ? `Sélection : ${selected.originalName}`
                : 'Aucune image sélectionnée'}
            </p>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Annuler
              </Button>
              <Button
                onClick={handleConfirm}
                disabled={!selected}
                className={cn('bg-sfpa-terra hover:bg-sfpa-terra/90')}
              >
                Utiliser cette image
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}