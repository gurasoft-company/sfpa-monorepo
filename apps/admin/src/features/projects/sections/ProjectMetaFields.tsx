import type { FieldErrors, UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import { FormField } from '@/components/forms/FormField';
import type { ProjectFormValues } from '@/schemas/project.schema';
import { CATEGORY_LABELS, PROJECT_CATEGORIES, PROJECT_STATUSES, STATUS_LABELS } from '@/services/projects.service';

interface Props {
  register: UseFormRegister<ProjectFormValues>;
  setValue: UseFormSetValue<ProjectFormValues>;
  errors: FieldErrors<ProjectFormValues>;
  category: ProjectFormValues['category'];
  status: ProjectFormValues['status'];
}

export function ProjectMetaFields({ register, setValue, errors, category, status }: Props) {
  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2">
        <FormField label="Catégorie" required error={errors.category?.message}>
          <Select value={category} onValueChange={(v) => setValue('category', v as never, { shouldDirty: true })}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {PROJECT_CATEGORIES.map((c) => (
                <SelectItem key={c} value={c}>{CATEGORY_LABELS[c]}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormField>
        <FormField label="Statut" required error={errors.status?.message}>
          <Select value={status} onValueChange={(v) => setValue('status', v as never, { shouldDirty: true })}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {PROJECT_STATUSES.map((s) => (
                <SelectItem key={s} value={s}>{STATUS_LABELS[s]}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormField>
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        <FormField label="Pays" error={errors.country?.message} htmlFor="country">
          <Input id="country" placeholder="Togo" {...register('country')} />
        </FormField>
        <FormField label="Début" error={errors.startDate?.message} htmlFor="startDate">
          <Input id="startDate" type="date" {...register('startDate')} />
        </FormField>
        <FormField label="Fin" error={errors.endDate?.message} htmlFor="endDate">
          <Input id="endDate" type="date" {...register('endDate')} />
        </FormField>
      </div>
    </>
  );
}