import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, Save } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import { FormField } from '@/components/forms/FormField';
import { FormSection } from '@/features/projects/sections/FormSection';
import { ProjectCoverField } from '@/features/projects/sections/ProjectCoverField';

import { testimonialSchema, type TestimonialFormValues } from '@/schemas/testimonial.schema';
import {
  TESTIMONIAL_STATUSES, TESTIMONIAL_STATUS_LABELS, type Testimonial,
} from '@/services/testimonials.service';
import type { MediaPreview } from '@/components/media/ImagePickerButton';

interface Props {
  testimonial?: Testimonial | null;
  submitting?: boolean;
  onSubmit: (v: TestimonialFormValues) => void | Promise<void>;
  onCancel: () => void;
}

const toForm = (t?: Testimonial | null): TestimonialFormValues => ({
  authorName: t?.authorName ?? '',
  authorEmail: t?.authorEmail ?? '',
  authorRole: t?.authorRole ?? '',
  authorLocation: t?.authorLocation ?? '',
  authorImageId: t?.authorImageId ?? null,
  quote: t?.quote ?? '',
  rating: t?.rating ?? 5,
  status: t?.status ?? 'pending',
  isFeatured: t?.isFeatured ?? false,
  displayOrder: t?.displayOrder ?? 0,
  adminNotes: t?.adminNotes ?? '',
});

const toAvatar = (t?: Testimonial | null): MediaPreview | null =>
  t?.authorImage
    ? { id: t.authorImage.id, url: t.authorImage.url, thumbnailUrl: t.authorImage.thumbnailUrl, alt: t.authorImage.alt }
    : null;

export function TestimonialForm({ testimonial, submitting, onSubmit, onCancel }: Props) {
  const [avatar, setAvatar] = useState<MediaPreview | null>(toAvatar(testimonial));
  const { register, handleSubmit, setValue, watch, reset, formState: { errors } } = useForm<TestimonialFormValues>({
    resolver: zodResolver(testimonialSchema),
    defaultValues: toForm(testimonial),
  });

  useEffect(() => {
    reset(toForm(testimonial));
    setAvatar(toAvatar(testimonial));
  }, [testimonial, reset]);

  const submit = handleSubmit((v) =>
    onSubmit({
      ...v,
      authorEmail: v.authorEmail || null,
      authorRole: v.authorRole || null,
      authorLocation: v.authorLocation || null,
      adminNotes: v.adminNotes || null,
    })
  );

  return (
    <form onSubmit={submit} className="space-y-5">
      <FormSection title="Auteur">
        <div className="grid gap-4 sm:grid-cols-2">
          <FormField label="Nom" required error={errors.authorName?.message} htmlFor="authorName">
            <Input id="authorName" {...register('authorName')} />
          </FormField>
          <FormField label="Email" error={errors.authorEmail?.message} htmlFor="authorEmail">
            <Input id="authorEmail" type="email" {...register('authorEmail')} />
          </FormField>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <FormField label="Rôle" error={errors.authorRole?.message} htmlFor="authorRole">
            <Input id="authorRole" placeholder="Ex : Ancienne formée" {...register('authorRole')} />
          </FormField>
          <FormField label="Localisation" error={errors.authorLocation?.message} htmlFor="authorLocation">
            <Input id="authorLocation" placeholder="Ex : Togo" {...register('authorLocation')} />
          </FormField>
        </div>
      </FormSection>

      <Separator />

      <FormSection title="Témoignage">
        <FormField label="Citation" required error={errors.quote?.message} htmlFor="quote">
          <Textarea id="quote" rows={4} placeholder="« Grâce à SFPA… »" {...register('quote')} />
        </FormField>
        <div className="grid gap-4 sm:grid-cols-2">
          <FormField label="Note (1-5)" error={errors.rating?.message} htmlFor="rating">
            <Input id="rating" type="number" min={1} max={5} {...register('rating')} />
          </FormField>
          <FormField label="Ordre" error={errors.displayOrder?.message} htmlFor="displayOrder">
            <Input id="displayOrder" type="number" min={0} {...register('displayOrder')} />
          </FormField>
        </div>
      </FormSection>

      <Separator />

      <FormSection title="Photo, statut et publication">
        <FormField label="Photo de l'auteur" hint="Format carré recommandé">
          <ProjectCoverField
            value={avatar}
            onChange={(m) => {
              setAvatar(m);
              setValue('authorImageId', m?.id ?? null, { shouldDirty: true });
            }}
          />
        </FormField>

        <div className="grid gap-4 sm:grid-cols-2">
          <FormField label="Statut" required error={errors.status?.message}>
            <Select
              value={watch('status')}
              onValueChange={(v) => setValue('status', v as never, { shouldDirty: true })}
            >
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {TESTIMONIAL_STATUSES.map((s) => (
                  <SelectItem key={s} value={s}>{TESTIMONIAL_STATUS_LABELS[s]}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormField>

          <div className="flex items-center justify-between rounded-lg border bg-muted/30 px-4 py-3">
            <div>
              <p className="text-sm font-medium">À la une</p>
              <p className="text-xs text-muted-foreground">Affiché sur l'accueil</p>
            </div>
            <Switch
              checked={watch('isFeatured')}
              onCheckedChange={(v) => setValue('isFeatured', v, { shouldDirty: true })}
            />
          </div>
        </div>

        <FormField label="Notes admin" hint="Visible uniquement par l'équipe">
          <Textarea id="adminNotes" rows={2} {...register('adminNotes')} />
        </FormField>
      </FormSection>

      <div className="flex justify-end gap-2 border-t pt-4">
        <Button type="button" variant="outline" onClick={onCancel} disabled={submitting}>
          Annuler
        </Button>
        <Button type="submit" disabled={submitting} className="bg-sfpa-terra hover:bg-sfpa-terra/90">
          {submitting ? (
            <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Enregistrement…</>
          ) : (
            <><Save className="mr-2 h-4 w-4" /> {testimonial ? 'Mettre à jour' : 'Créer'}</>
          )}
        </Button>
      </div>
    </form>
  );
}