import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Plus} from 'lucide-react';

import { PageHeader } from '@/components/common/PageHeader';
import { LoadingSkeleton } from '@/components/common/LoadingSkeleton';
import { ConfirmDialog } from '@/components/common/ConfirmDialog';
import { MediaGrid } from '@/components/media/MediaGrid';
import { Pagination } from '@/components/common/Pagination';
import { MediaUploader } from '@/components/media/MediaUploader';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useApiMutation } from '@/hooks/useApiMutation';
import {
  FOLDER_LABELS,
  MEDIA_FOLDERS,
  listMedia,
  type Media,
} from '@/services/media.service';

export default function MediaPage() {
  const [page, setPage] = useState(1);
  const [folder, setFolder] = useState<string>('');
  const [uploadOpen, setUploadOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Media | null>(null);

  const queryKey = ['media', { page, folder }];
  const { data, isLoading } = useQuery({
    queryKey,
    queryFn: () => listMedia({ page, limit: 20, folder: folder || undefined }),
  });

  const deleteMutation = useApiMutation<void, string>(
    (id) => `/admin/media/${id}`,
    {
      method: 'delete',
      successMessage: 'Média supprimé',
      invalidateKeys: [['media']],
    }
  );

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await deleteMutation.mutateAsync(deleteTarget.id);
      setDeleteTarget(null);
    } catch {
      // toast déjà géré par le hook
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Bibliothèque de médias"
        description="Uploadez et gérez toutes vos images"
        action={
          <Button
            onClick={() => setUploadOpen(true)}
            className="bg-sfpa-terra hover:bg-sfpa-terra/90"
          >
            <Plus className="h-4 w-4" />
            Uploader
          </Button>
        }
      />

      {/* Filtres */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2">
          <Label htmlFor="folder-filter" className="text-sm text-muted-foreground">
            Dossier :
          </Label>
          <select
            id="folder-filter"
            value={folder}
            onChange={(e) => {
              setFolder(e.target.value);
              setPage(1);
            }}
            className="h-10 rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <option value="">{FOLDER_LABELS.all}</option>
            {MEDIA_FOLDERS.map((f) => (
              <option key={f} value={f}>
                {FOLDER_LABELS[f]}
              </option>
            ))}
          </select>
        </div>

        {data && (
          <p className="text-sm text-muted-foreground">
            {data.pagination.total} média{data.pagination.total > 1 ? 's' : ''}
          </p>
        )}
      </div>

      {/* Contenu */}
      {isLoading ? (
        <LoadingSkeleton variant="grid" count={15} />
      ) : (
        <>
          <MediaGrid
            items={data?.items ?? []}
            onDelete={setDeleteTarget}
          />

          {data?.pagination && (
            <Pagination pagination={data.pagination} onPageChange={setPage} />
          )}
        </>
      )}

      {/* Modale Upload */}
      <Dialog open={uploadOpen} onOpenChange={setUploadOpen}>
        <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Uploader des images</DialogTitle>
            <DialogDescription>
              Converties automatiquement en WebP + miniature générée.
            </DialogDescription>
          </DialogHeader>
          <MediaUploader
            defaultFolder={(folder as never) || 'general'}
            lockFolder={Boolean(folder)}
            onUploaded={() => setUploadOpen(false)}
          />
        </DialogContent>
      </Dialog>

      {/* Confirmation suppression */}
      <ConfirmDialog
        open={Boolean(deleteTarget)}
        onOpenChange={(o) => !o && setDeleteTarget(null)}
        title="Supprimer ce média ?"
        description={
          deleteTarget && (
            <span>
              Le fichier <strong>{deleteTarget.originalName}</strong> sera supprimé
              définitivement. Les contenus qui l'utilisent afficheront une image cassée.
            </span>
          )
        }
        confirmLabel="Supprimer"
        destructive
        loading={deleteMutation.isPending}
        onConfirm={handleDelete}
      />
    </div>
  );
}