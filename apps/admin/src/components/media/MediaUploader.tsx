import { useCallback, useRef, useState } from 'react';
import { UploadCloud, X, Loader2, FileImage } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  MEDIA_FOLDERS,
  FOLDER_LABELS,
  uploadMedia,
  type Media,
  type MediaFolder,
} from '@/services/media.service';
import { cn } from '@/lib/utils';

interface Props {
  defaultFolder?: MediaFolder;
  lockFolder?: boolean;
  multiple?: boolean;
  onUploaded?: (medias: Media[]) => void;
}

export function MediaUploader({
  defaultFolder = 'general',
  lockFolder = false,
  multiple = true,
  onUploaded,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [folder, setFolder] = useState<MediaFolder>(defaultFolder);
  const [alt, setAlt] = useState('');
  const [uploading, setUploading] = useState(false);

  const addFiles = useCallback(
    (incoming: FileList | File[]) => {
      const arr = Array.from(incoming).filter((f) => f.type.startsWith('image/'));
      if (arr.length === 0) {
        toast.error('Aucune image valide détectée');
        return;
      }
      setFiles((prev) => (multiple ? [...prev, ...arr] : [arr[0]]));
    },
    [multiple]
  );

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files.length) addFiles(e.dataTransfer.files);
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleUpload = async () => {
    if (files.length === 0) return;
    setUploading(true);
    const uploaded: Media[] = [];

    try {
      for (const file of files) {
        const media = await uploadMedia({
          file,
          folder,
          alt: alt || undefined,
        });
        uploaded.push(media);
      }
      toast.success(
        uploaded.length > 1
          ? `${uploaded.length} images uploadées`
          : 'Image uploadée avec succès'
      );
      setFiles([]);
      setAlt('');
      onUploaded?.(uploaded);
    } catch (err) {
      // les erreurs détaillées sont déjà toastées côté service si 401,
      // on ajoute un message local au cas où
      const msg = err instanceof Error ? err.message : 'Erreur upload';
      toast.error(msg);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Dropzone */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragActive(true);
        }}
        onDragLeave={() => setDragActive(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={cn(
          'flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed bg-muted/20 px-6 py-10 text-center transition-colors',
          dragActive
            ? 'border-primary bg-primary/5'
            : 'border-muted-foreground/25 hover:border-primary/50'
        )}
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
          <UploadCloud className="h-6 w-6 text-muted-foreground" />
        </div>
        <p className="font-medium">
          {dragActive ? 'Relâchez pour ajouter' : 'Glissez-déposez vos images ici'}
        </p>
        <p className="text-xs text-muted-foreground">
          ou cliquez pour parcourir — JPEG, PNG, WebP, GIF · max 10 Mo
        </p>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple={multiple}
          className="hidden"
          onChange={(e) => e.target.files && addFiles(e.target.files)}
        />
      </div>

      {/* Fichiers sélectionnés */}
      {files.length > 0 && (
        <div className="space-y-2">
          <Label>Fichiers sélectionnés ({files.length})</Label>
          <ul className="space-y-1.5">
            {files.map((file, i) => (
              <li
                key={`${file.name}-${i}`}
                className="flex items-center gap-2 rounded-md border bg-background px-3 py-2 text-sm"
              >
                <FileImage className="h-4 w-4 shrink-0 text-muted-foreground" />
                <span className="min-w-0 flex-1 truncate">{file.name}</span>
                <span className="shrink-0 text-xs text-muted-foreground">
                  {(file.size / 1024).toFixed(0)} Ko
                </span>
                <Button
                  type="button"
                  size="icon"
                  variant="ghost"
                  className="h-6 w-6 shrink-0"
                  onClick={() => removeFile(i)}
                  disabled={uploading}
                >
                  <X className="h-3.5 w-3.5" />
                </Button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Métadonnées */}
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="upload-folder">Dossier</Label>
          <select
            id="upload-folder"
            value={folder}
            onChange={(e) => setFolder(e.target.value as MediaFolder)}
            disabled={lockFolder || uploading}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {MEDIA_FOLDERS.map((f) => (
              <option key={f} value={f}>
                {FOLDER_LABELS[f]}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="upload-alt">Texte alternatif (SEO)</Label>
          <Input
            id="upload-alt"
            value={alt}
            onChange={(e) => setAlt(e.target.value)}
            placeholder="Ex : Enfants plantant un arbre"
            disabled={uploading}
          />
        </div>
      </div>

      {/* Action */}
      <div className="flex justify-end">
        <Button onClick={handleUpload} disabled={files.length === 0 || uploading}>
          {uploading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {uploading
            ? 'Upload en cours…'
            : `Uploader ${files.length > 1 ? `${files.length} images` : ''}`}
        </Button>
      </div>
    </div>
  );
}