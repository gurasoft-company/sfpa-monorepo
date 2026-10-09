import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, Save } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import { FormField } from '@/components/forms/FormField';
import { ValidationActions } from '@/components/common/ValidationActions';
import { StatusBadge, STATUS_MAP } from '@/components/common/StatusBadge';

import { volunteerSchema, type VolunteerFormValues } from '@/schemas/volunteer.schema';
import type { Volunteer } from '@/services/volunteers.service';

interface Props {
  volunteer: Volunteer;
  submitting?: boolean;
  onSave: (v: VolunteerFormValues) => void | Promise<void>;
  onQuickStatus: (status: 'approved' | 'rejected') => void;
  onCancel: () => void;
}

const toForm = (v: Volunteer): VolunteerFormValues => ({
  status: v.status,
  adminNotes: v.adminNotes ?? '',
});

export function VolunteerDetail({
  volunteer, submitting, onSave, onQuickStatus, onCancel,
}: Props) {
  const {
    register, handleSubmit, setValue, watch, reset,
    formState: { errors },
  } = useForm<VolunteerFormValues>({
    resolver: zodResolver(volunteerSchema),
    defaultValues: toForm(volunteer),
  });

  useEffect(() => { reset(toForm(volunteer)); }, [volunteer, reset]);

  const submit = handleSubmit((v) =>
    onSave({ ...v, adminNotes: v.adminNotes || null })
  );

  return (
    <form onSubmit={submit} className="space-y-5">
      {/* Identité */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-heading text-lg font-semibold">
            {volunteer.firstName} {volunteer.lastName}
          </p>
          <p className="text-sm text-muted-foreground">{volunteer.email}</p>
          {volunteer.phone && (
            <p className="text-sm text-muted-foreground">{volunteer.phone}</p>
          )}
        </div>
        <StatusBadge
          label={STATUS_MAP[volunteer.status]?.label ?? volunteer.status}
          tone={STATUS_MAP[volunteer.status]?.tone}
        />
      </div>

      <Separator />

      {/* Localisation */}
      <dl className="grid gap-3 sm:grid-cols-2 text-sm">
        <Info label="Ville" value={volunteer.city} />
        <Info label="Pays" value={volunteer.country} />
        <Info label="Disponibilité" value={volunteer.availability} />
        <Info
          label="Candidature reçue"
          value={format(new Date(volunteer.createdAt), 'dd MMM yyyy', { locale: fr })}
        />
      </dl>

      {volunteer.skills && (
        <>
          <Separator />
          <Block title="Compétences" body={volunteer.skills} />
        </>
      )}

      {volunteer.message && (
        <Block title="Message de motivation" body={volunteer.message} />
      )}

      <Separator />

      <ValidationActions
        status={volunteer.status}
        onApprove={() => onQuickStatus('approved')}
        onReject={() => onQuickStatus('rejected')}
        loading={submitting}
      />

      <FormField label="Statut" required error={errors.status?.message}>
        <Select
          value={watch('status')}
          onValueChange={(v) => setValue('status', v as never, { shouldDirty: true })}
        >
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="pending">En attente</SelectItem>
            <SelectItem value="approved">Approuvé</SelectItem>
            <SelectItem value="rejected">Rejeté</SelectItem>
          </SelectContent>
        </Select>
      </FormField>

      <FormField label="Notes internes" hint="Visible uniquement par l'équipe">
        <Textarea rows={3} placeholder="Ex : Contacté le 06/10" {...register('adminNotes')} />
      </FormField>

      <div className="flex justify-end gap-2 border-t pt-4">
        <Button type="button" variant="outline" onClick={onCancel} disabled={submitting}>
          Fermer
        </Button>
        <Button type="submit" disabled={submitting} className="bg-sfpa-terra hover:bg-sfpa-terra/90">
          {submitting ? (
            <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Enregistrement…</>
          ) : (
            <><Save className="mr-2 h-4 w-4" /> Enregistrer</>
          )}
        </Button>
      </div>
    </form>
  );
}

function Info({ label, value }: { label: string; value: string | null | undefined }) {
  return (
    <div>
      <dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {label}
      </dt>
      <dd className="mt-0.5">{value || <span className="text-muted-foreground">—</span>}</dd>
    </div>
  );
}

function Block({ title, body }: { title: string; body: string }) {
  return (
    <div>
      <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {title}
      </p>
      <p className="whitespace-pre-wrap rounded-lg border bg-muted/30 p-3 text-sm">
        {body}
      </p>
    </div>
  );
}