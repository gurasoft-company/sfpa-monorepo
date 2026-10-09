import type { FieldErrors, UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import { FormField } from '@/components/forms/FormField';
import type { FormationFormValues } from '@/schemas/formation.schema';
import {
  FORMATION_CATEGORIES,
  FORMATION_CATEGORY_LABELS,
} from '@/services/formations.service';

interface Props {
  register: UseFormRegister<FormationFormValues>;
  setValue: UseFormSetValue<FormationFormValues>;
  errors: FieldErrors<FormationFormValues>;
  category: FormationFormValues['category'];
}

export function FormationMetaFields({ register, setValue, errors, category }: Props) {
  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2">
        <FormField label="Catégorie" required error={errors.category?.message}>
          <Select
            value={category}
            onValueChange={(v) =>
              setValue('category', v as never, { shouldDirty: true })
            }
          >
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {FORMATION_CATEGORIES.map((c) => (
                <SelectItem key={c} value={c}>
                  {FORMATION_CATEGORY_LABELS[c]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormField>

        <FormField label="Ordre d'affichage" error={errors.displayOrder?.message} htmlFor="displayOrder">
          <Input id="displayOrder" type="number" min={0} {...register('displayOrder')} />
        </FormField>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <FormField label="Durée" error={errors.duration?.message} htmlFor="duration">
          <Input id="duration" placeholder="Ex : 6 mois" {...register('duration')} />
        </FormField>
        <FormField label="Niveau" error={errors.level?.message} htmlFor="level">
          <Input id="level" placeholder="Ex : Débutant" {...register('level')} />
        </FormField>
        <FormField label="Public" error={errors.audience?.message} htmlFor="audience">
          <Input id="audience" placeholder="Ex : Jeunes 18-30 ans" {...register('audience')} />
        </FormField>
      </div>
    </>
  );
}