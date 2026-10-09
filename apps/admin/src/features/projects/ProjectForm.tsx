import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, Save } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { FormSection } from './sections/FormSection';
import { ProjectBasicFields } from './sections/ProjectBasicFields';
import { ProjectMetaFields } from './sections/ProjectMetaFields';
import { ProjectCoverField } from './sections/ProjectCoverField';
import { ProjectPublishField } from './sections/ProjectPublishField';
import { projectSchema, type ProjectFormValues } from '@/schemas/project.schema';
import type { Project } from '@/services/projects.service';
import type { MediaPreview } from '@/components/media/ImagePickerButton';

interface Props {
  project?: Project | null;
  submitting?: boolean;
  onSubmit: (v: ProjectFormValues) => void | Promise<void>;
  onCancel: () => void;
}

const toForm = (p?: Project | null): ProjectFormValues => ({
  title: p?.title ?? '',
  excerpt: p?.excerpt ?? '',
  description: p?.description ?? '',
  category: p?.category ?? 'formation',
  country: p?.country ?? '',
  status: p?.status ?? 'a_venir',
  coverImageId: p?.coverImageId ?? null,
  startDate: p?.startDate?.slice(0, 10) ?? '',
  endDate: p?.endDate?.slice(0, 10) ?? '',
  isPublished: p?.isPublished ?? false,
});

const toCover = (p?: Project | null): MediaPreview | null =>
  p?.coverImage
    ? {
        id: p.coverImage.id,
        url: p.coverImage.url,
        thumbnailUrl: p.coverImage.thumbnailUrl,
        alt: p.coverImage.alt,
      }
    : null;

export function ProjectForm({ project, submitting, onSubmit, onCancel }: Props) {
  const [cover, setCover] = useState<MediaPreview | null>(toCover(project));

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: toForm(project),
  });

  useEffect(() => {
    reset(toForm(project));
    setCover(toCover(project));
  }, [project, reset]);

  const submit = handleSubmit((v) =>
    onSubmit({
      ...v,
      excerpt: v.excerpt || null,
      description: v.description || null,
      country: v.country || null,
      startDate: v.startDate || null,
      endDate: v.endDate || null,
    })
  );

  const handleCover = (m: MediaPreview | null) => {
    setCover(m);
    setValue('coverImageId', m?.id ?? null, { shouldDirty: true });
  };

  return (
    <form onSubmit={submit} className="space-y-5">
      <FormSection>
        <ProjectBasicFields register={register} errors={errors} />
      </FormSection>

      <Separator />

      <FormSection title="Classification et dates">
        <ProjectMetaFields
          register={register}
          setValue={setValue}
          errors={errors}
          category={watch('category')}
          status={watch('status')}
        />
      </FormSection>

      <Separator />

      <FormSection title="Média et publication">
        <ProjectCoverField value={cover} onChange={handleCover} />
        <ProjectPublishField
          checked={watch('isPublished')}
          onChange={(v) => setValue('isPublished', v, { shouldDirty: true })}
        />
      </FormSection>

      <div className="flex justify-end gap-2 border-t pt-4">
        <Button type="button" variant="outline" onClick={onCancel} disabled={submitting}>
          Annuler
        </Button>
        <Button
          type="submit"
          disabled={submitting}
          className="bg-sfpa-terra hover:bg-sfpa-terra/90"
        >
          {submitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Enregistrement…
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              {project ? 'Mettre à jour' : 'Créer'}
            </>
          )}
        </Button>
      </div>
    </form>
  );
}