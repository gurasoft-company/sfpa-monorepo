import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, Save } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import { FormField } from '@/components/forms/FormField';
import { FormSection } from '@/features/projects/sections/FormSection';
import { ProjectCoverField } from '@/features/projects/sections/ProjectCoverField';
import { ProjectPublishField } from '@/features/projects/sections/ProjectPublishField';
import { RichTextEditor } from '@/components/editor/RichTextEditor';
import { TagsField } from './TagsField';

import { postSchema, type PostFormValues } from '@/schemas/post.schema';
import { POST_CATEGORIES, type Post } from '@/services/posts.service';
import type { MediaPreview } from '@/components/media/ImagePickerButton';

interface Props {
  post?: Post | null;
  submitting?: boolean;
  onSubmit: (v: PostFormValues) => void | Promise<void>;
  onCancel: () => void;
}

const toForm = (p?: Post | null): PostFormValues => ({
  title: p?.title ?? '',
  excerpt: p?.excerpt ?? '',
  content: p?.content ?? '',
  category: p?.category ?? 'Actualité',
  tags: p?.tags ?? [],
  coverImageId: p?.coverImageId ?? null,
  isPublished: p?.isPublished ?? false,
});

const toCover = (p?: Post | null): MediaPreview | null =>
  p?.coverImage
    ? { id: p.coverImage.id, url: p.coverImage.url, thumbnailUrl: p.coverImage.thumbnailUrl, alt: p.coverImage.alt }
    : null;

export function PostForm({ post, submitting, onSubmit, onCancel }: Props) {
  const [cover, setCover] = useState<MediaPreview | null>(toCover(post));
  const { register, handleSubmit, setValue, watch, reset, formState: { errors } } =
    useForm<PostFormValues>({
      resolver: zodResolver(postSchema),
      defaultValues: toForm(post),
    });

  useEffect(() => {
    reset(toForm(post));
    setCover(toCover(post));
  }, [post, reset]);

  const submit = handleSubmit((v) =>
    onSubmit({
      ...v,
      excerpt: v.excerpt || null,
      content: v.content || null,
      category: v.category || null,
    })
  );

  return (
    <form onSubmit={submit} className="space-y-5">
      <FormSection>
        <FormField label="Titre" required error={errors.title?.message} htmlFor="title">
          <Input id="title" placeholder="Ex : Notre première formation démarre" {...register('title')} />
        </FormField>

        <FormField label="Résumé" error={errors.excerpt?.message} htmlFor="excerpt">
          <Textarea id="excerpt" rows={2} {...register('excerpt')} />
        </FormField>
      </FormSection>

      <Separator />

      <FormSection title="Contenu">
        <FormField label="Article" error={errors.content?.message}>
          <RichTextEditor
            value={watch('content') ?? ''}
            onChange={(html) => setValue('content', html, { shouldDirty: true })}
            placeholder="Écrivez votre article ici…"
          />
        </FormField>
      </FormSection>

      <Separator />

      <FormSection title="Classification">
        <div className="grid gap-4 sm:grid-cols-2">
          <FormField label="Catégorie" error={errors.category?.message}>
            <Select
              value={watch('category') ?? ''}
              onValueChange={(v) => setValue('category', v, { shouldDirty: true })}
            >
              <SelectTrigger><SelectValue placeholder="Choisir…" /></SelectTrigger>
              <SelectContent>
                {POST_CATEGORIES.map((c) => (
                  <SelectItem key={c} value={c}>{c}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormField>
        </div>

        <FormField label="Tags" hint="Appuyez sur Entrée pour ajouter">
          <TagsField
            value={watch('tags')}
            onChange={(next) => setValue('tags', next, { shouldDirty: true })}
          />
        </FormField>
      </FormSection>

      <Separator />

      <FormSection title="Média et publication">
        <ProjectCoverField
          value={cover}
          onChange={(m) => {
            setCover(m);
            setValue('coverImageId', m?.id ?? null, { shouldDirty: true });
          }}
        />
        <ProjectPublishField
          checked={watch('isPublished')}
          onChange={(v) => setValue('isPublished', v, { shouldDirty: true })}
        />
      </FormSection>

      <div className="flex justify-end gap-2 border-t pt-4">
        <Button type="button" variant="outline" onClick={onCancel} disabled={submitting}>
          Annuler
        </Button>
        <Button type="submit" disabled={submitting} className="bg-sfpa-terra hover:bg-sfpa-terra/90">
          {submitting ? (
            <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Enregistrement…</>
          ) : (
            <><Save className="mr-2 h-4 w-4" /> {post ? 'Mettre à jour' : 'Créer'}</>
          )}
        </Button>
      </div>
    </form>
  );
}