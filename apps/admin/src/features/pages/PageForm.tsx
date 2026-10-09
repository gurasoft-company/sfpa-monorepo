import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, Save } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { FormField } from '@/components/forms/FormField';
import { FormSection } from '@/features/projects/sections/FormSection';
import { ProjectPublishField } from '@/features/projects/sections/ProjectPublishField';
import { JsonEditor } from './JsonEditor';

import { pageSchema, type PageFormValues } from '@/schemas/page.schema';
import { SUGGESTED_SLUGS, type Page } from '@/services/pages.service';

interface Props {
  page?: Page | null;
  submitting?: boolean;
  onSubmit: (v: PageFormValues) => void | Promise<void>;
  onCancel: () => void;
}

const toForm = (p?: Page | null): PageFormValues => ({
  slug: p?.slug ?? '',
  title: p?.title ?? '',
  content: p?.content ? JSON.stringify(p.content, null, 2) : '',
  metaTitle: p?.metaTitle ?? '',
  metaDescription: p?.metaDescription ?? '',
  isPublished: p?.isPublished ?? false,
});

export function PageForm({ page, submitting, onSubmit, onCancel }: Props) {
  const { register, handleSubmit, setValue, watch, reset, formState: { errors } } =
    useForm<PageFormValues>({
      resolver: zodResolver(pageSchema),
      defaultValues: toForm(page),
    });

  useEffect(() => { reset(toForm(page)); }, [page, reset]);

  const submit = handleSubmit((v) =>
    onSubmit({
      ...v,
      metaTitle: v.metaTitle || null,
      metaDescription: v.metaDescription || null,
    })
  );

  return (
    <form onSubmit={submit} className="space-y-5">
      <FormSection>
        <div className="grid gap-4 sm:grid-cols-2">
          <FormField
            label="Slug"
            required
            error={errors.slug?.message}
            hint="URL : /pages/mon-slug"
            htmlFor="slug"
          >
            <Input
              id="slug"
              placeholder="accueil"
              className="font-mono text-sm"
              {...register('slug')}
            />
          </FormField>

          <FormField label="Titre" required error={errors.title?.message} htmlFor="title">
            <Input id="title" placeholder="Accueil" {...register('title')} />
          </FormField>
        </div>

        {!page && (
          <div className="flex flex-wrap gap-1.5">
            <span className="text-xs text-muted-foreground">Suggestions :</span>
            {SUGGESTED_SLUGS.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setValue('slug', s, { shouldDirty: true })}
                className="rounded-full border px-2.5 py-0.5 text-[11px] font-mono text-muted-foreground hover:border-primary hover:text-foreground"
              >
                {s}
              </button>
            ))}
          </div>
        )}
      </FormSection>

      <Separator />

      <FormSection title="Contenu JSON">
        <FormField
          label="Structure de la page"
          hint="Objet JSON : hero, sections, etc. Laissez vide pour une page simple."
          error={errors.content?.message}
        >
          <JsonEditor
            value={watch('content')}
            onChange={(v) => setValue('content', v, { shouldDirty: true })}
            error={errors.content?.message}
          />
        </FormField>
      </FormSection>

      <Separator />

      <FormSection title="SEO">
        <FormField
          label="Meta title"
          error={errors.metaTitle?.message}
          hint="Titre affiché dans les résultats Google"
          htmlFor="metaTitle"
        >
          <Input id="metaTitle" placeholder="SFPA — La Terre entre nos mains" {...register('metaTitle')} />
        </FormField>
        <FormField
          label="Meta description"
          error={errors.metaDescription?.message}
          hint="Résumé affiché dans les résultats Google (160 caractères recommandés)"
          htmlFor="metaDescription"
        >
          <Textarea id="metaDescription" rows={2} {...register('metaDescription')} />
        </FormField>
      </FormSection>

      <Separator />

      <ProjectPublishField
        checked={watch('isPublished')}
        onChange={(v) => setValue('isPublished', v, { shouldDirty: true })}
      />

      <div className="flex justify-end gap-2 border-t pt-4">
        <Button type="button" variant="outline" onClick={onCancel} disabled={submitting}>
          Annuler
        </Button>
        <Button type="submit" disabled={submitting} className="bg-sfpa-terra hover:bg-sfpa-terra/90">
          {submitting ? (
            <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Enregistrement…</>
          ) : (
            <><Save className="mr-2 h-4 w-4" /> {page ? 'Mettre à jour' : 'Créer'}</>
          )}
        </Button>
      </div>
    </form>
  );
}