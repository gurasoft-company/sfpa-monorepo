import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, Save } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { FormSection } from '@/features/projects/sections/FormSection';
import { ProjectCoverField } from '@/features/projects/sections/ProjectCoverField';
import { ProjectPublishField } from '@/features/projects/sections/ProjectPublishField';

import { FormationBasicFields } from './sections/FormationBasicFields';
import { FormationMetaFields } from './sections/FormationMetaFields';
import { FormationObjectivesField } from './sections/FormationObjectivesField';

import { formationSchema, type FormationFormValues } from '@/schemas/formation.schema';
import type { Formation } from '@/services/formations.service';
import type { MediaPreview } from '@/components/media/ImagePickerButton';
import { FormField } from '@/components/forms/FormField';

interface Props {
  formation?: Formation | null;
  submitting?: boolean;
  onSubmit: (v: FormationFormValues) => void | Promise<void>;
  onCancel: () => void;
}

const toForm = (f?: Formation | null): FormationFormValues => ({
  title: f?.title ?? '',
  excerpt: f?.excerpt ?? '',
  description: f?.description ?? '',
  objectives: f?.objectives ?? [],
  duration: f?.duration ?? '',
  level: f?.level ?? '',
  audience: f?.audience ?? '',
  category: f?.category ?? 'agriculture',
  coverImageId: f?.coverImageId ?? null,
  displayOrder: f?.displayOrder ?? 0,
  isPublished: f?.isPublished ?? false,
});

const toCover = (f?: Formation | null): MediaPreview | null =>
  f?.coverImage
    ? { id: f.coverImage.id, url: f.coverImage.url, thumbnailUrl: f.coverImage.thumbnailUrl, alt: f.coverImage.alt }
    : null;

export function FormationForm({ formation, submitting, onSubmit, onCancel }: Props) {
  const [cover, setCover] = useState<MediaPreview | null>(toCover(formation));
  const {
    register, handleSubmit, setValue, watch, reset,
    formState: { errors },
  } = useForm<FormationFormValues>({
    resolver: zodResolver(formationSchema),
    defaultValues: toForm(formation),
  });

  useEffect(() => {
    reset(toForm(formation));
    setCover(toCover(formation));
  }, [formation, reset]);

  const submit = handleSubmit((v) =>
    onSubmit({
      ...v,
      excerpt: v.excerpt || null,
      description: v.description || null,
      duration: v.duration || null,
      level: v.level || null,
      audience: v.audience || null,
    })
  );

  return (
    <form onSubmit={submit} className="space-y-5">
      <FormSection>
        <FormationBasicFields register={register} errors={errors} />
      </FormSection>

      <Separator />

      <FormSection title="Classification">
        <FormationMetaFields
          register={register}
          setValue={setValue}
          errors={errors}
          category={watch('category')}
        />
      </FormSection>

      <Separator />

      <FormSection title="Objectifs pédagogiques">
        <FormField label="Objectifs" hint="Appuyez sur Entrée pour ajouter">
          <FormationObjectivesField
            value={watch('objectives')}
            onChange={(next) => setValue('objectives', next, { shouldDirty: true })}
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
            <><Save className="mr-2 h-4 w-4" /> {formation ? 'Mettre à jour' : 'Créer'}</>
          )}
        </Button>
      </div>
    </form>
  );
}