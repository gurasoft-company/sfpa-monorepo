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

import { partnerSchema, type PartnerFormValues } from '@/schemas/partner.schema';
import {
  PARTNER_TYPES, PARTNER_TYPE_LABELS, type Partner,
} from '@/services/partners.service';
import type { MediaPreview } from '@/components/media/ImagePickerButton';

interface Props {
  partner?: Partner | null;
  submitting?: boolean;
  onSubmit: (v: PartnerFormValues) => void | Promise<void>;
  onCancel: () => void;
}

const toForm = (p?: Partner | null): PartnerFormValues => ({
  name: p?.name ?? '',
  type: p?.type ?? 'association',
  description: p?.description ?? '',
  logoId: p?.logoId ?? null,
  website: p?.website ?? '',
  country: p?.country ?? '',
  displayOrder: p?.displayOrder ?? 0,
  isPublished: p?.isPublished ?? false,
});

const toLogo = (p?: Partner | null): MediaPreview | null =>
  p?.logo
    ? { id: p.logo.id, url: p.logo.url, thumbnailUrl: p.logo.thumbnailUrl, alt: p.logo.alt }
    : null;

export function PartnerForm({ partner, submitting, onSubmit, onCancel }: Props) {
  const [logo, setLogo] = useState<MediaPreview | null>(toLogo(partner));
  const {
    register, handleSubmit, setValue, watch, reset,
    formState: { errors },
  } = useForm<PartnerFormValues>({
    resolver: zodResolver(partnerSchema),
    defaultValues: toForm(partner),
  });

  useEffect(() => {
    reset(toForm(partner));
    setLogo(toLogo(partner));
  }, [partner, reset]);

  const submit = handleSubmit((v) =>
    onSubmit({
      ...v,
      description: v.description || null,
      website: v.website || null,
      country: v.country || null,
    })
  );

  return (
    <form onSubmit={submit} className="space-y-5">
      <FormSection>
        <FormField label="Nom" required error={errors.name?.message} htmlFor="name">
          <Input id="name" placeholder="Ex : Mairie de Salon-de-Provence" {...register('name')} />
        </FormField>

        <div className="grid gap-4 sm:grid-cols-2">
          <FormField label="Type" required error={errors.type?.message}>
            <Select
              value={watch('type')}
              onValueChange={(v) => setValue('type', v as never, { shouldDirty: true })}
            >
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {PARTNER_TYPES.map((t) => (
                  <SelectItem key={t} value={t}>{PARTNER_TYPE_LABELS[t]}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormField>

          <FormField label="Ordre d'affichage" error={errors.displayOrder?.message} htmlFor="displayOrder">
            <Input id="displayOrder" type="number" min={0} {...register('displayOrder')} />
          </FormField>
        </div>

        <FormField label="Description" error={errors.description?.message} htmlFor="description">
          <Textarea id="description" rows={3} {...register('description')} />
        </FormField>

        <div className="grid gap-4 sm:grid-cols-2">
          <FormField label="Site web" error={errors.website?.message} htmlFor="website">
            <Input id="website" type="url" placeholder="https://…" {...register('website')} />
          </FormField>
          <FormField label="Pays" error={errors.country?.message} htmlFor="country">
            <Input id="country" placeholder="France" {...register('country')} />
          </FormField>
        </div>
      </FormSection>

      <Separator />

      <FormSection title="Logo et publication">
        <ProjectCoverField
          value={logo}
          onChange={(m) => {
            setLogo(m);
            setValue('logoId', m?.id ?? null, { shouldDirty: true });
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
            <><Save className="mr-2 h-4 w-4" /> {partner ? 'Mettre à jour' : 'Créer'}</>
          )}
        </Button>
      </div>
    </form>
  );
}