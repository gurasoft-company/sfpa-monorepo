import type { FieldErrors, UseFormRegister } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { FormField } from '@/components/forms/FormField';
import type { FormationFormValues } from '@/schemas/formation.schema';

interface Props {
  register: UseFormRegister<FormationFormValues>;
  errors: FieldErrors<FormationFormValues>;
}

export function FormationBasicFields({ register, errors }: Props) {
  return (
    <>
      <FormField label="Titre" required error={errors.title?.message} htmlFor="title">
        <Input id="title" placeholder="Ex : Formation en agroécologie" {...register('title')} />
      </FormField>
      <FormField label="Résumé" error={errors.excerpt?.message} htmlFor="excerpt">
        <Textarea id="excerpt" rows={2} {...register('excerpt')} />
      </FormField>
      <FormField label="Description" error={errors.description?.message} htmlFor="description">
        <Textarea id="description" rows={5} {...register('description')} />
      </FormField>
    </>
  );
}