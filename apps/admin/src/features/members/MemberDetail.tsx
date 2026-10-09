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

import { memberSchema, type MemberFormValues } from '@/schemas/member.schema';
import {
  MEMBERSHIP_LABELS, MEMBERSHIP_TYPES, type Member,
} from '@/services/members.service';

interface Props {
  member: Member;
  submitting?: boolean;
  onSave: (v: MemberFormValues) => void | Promise<void>;
  onQuickStatus: (status: 'approved' | 'rejected') => void;
  onCancel: () => void;
}

const toForm = (m: Member): MemberFormValues => ({
  status: m.status,
  membershipType: m.membershipType,
  adminNotes: m.adminNotes ?? '',
});

export function MemberDetail({ member, submitting, onSave, onQuickStatus, onCancel }: Props) {
  const { register, handleSubmit, setValue, watch, reset, formState: { errors } } = useForm<MemberFormValues>({
    resolver: zodResolver(memberSchema),
    defaultValues: toForm(member),
  });

  useEffect(() => { reset(toForm(member)); }, [member, reset]);

  const submit = handleSubmit((v) =>
    onSave({ ...v, adminNotes: v.adminNotes || null, membershipType: v.membershipType || null })
  );

  return (
    <form onSubmit={submit} className="space-y-5">
      {/* Identité */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-heading text-lg font-semibold">
            {member.firstName} {member.lastName}
          </p>
          <p className="text-sm text-muted-foreground">{member.email}</p>
          {member.phone && (
            <p className="text-sm text-muted-foreground">{member.phone}</p>
          )}
        </div>
        <StatusBadge
          label={STATUS_MAP[member.status]?.label ?? member.status}
          tone={STATUS_MAP[member.status]?.tone}
        />
      </div>

      <Separator />

      {/* Infos */}
      <dl className="grid gap-3 sm:grid-cols-2 text-sm">
        <Info label="Adresse" value={member.address} />
        <Info label="Ville" value={member.city} />
        <Info label="Pays" value={member.country} />
        <Info
          label="Inscrit le"
          value={format(new Date(member.createdAt), 'dd MMM yyyy', { locale: fr })}
        />
      </dl>

      {member.motivation && (
        <>
          <Separator />
          <div>
            <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Motivation
            </p>
            <p className="whitespace-pre-wrap rounded-lg border bg-muted/30 p-3 text-sm">
              {member.motivation}
            </p>
          </div>
        </>
      )}

      <Separator />

      {/* Actions rapides si pending */}
      <ValidationActions
        status={member.status}
        onApprove={() => onQuickStatus('approved')}
        onReject={() => onQuickStatus('rejected')}
        loading={submitting}
      />

      {/* Formulaire admin */}
      <div className="grid gap-4 sm:grid-cols-2">
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

        <FormField label="Type d'adhésion">
          <Select
            value={watch('membershipType') ?? 'none'}
            onValueChange={(v) =>
              setValue('membershipType', v === 'none' ? null : (v as never), { shouldDirty: true })
            }
          >
            <SelectTrigger><SelectValue placeholder="Non défini" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="none">Non défini</SelectItem>
              {MEMBERSHIP_TYPES.map((t) => (
                <SelectItem key={t} value={t}>{MEMBERSHIP_LABELS[t]}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormField>
      </div>

      <FormField label="Notes internes" hint="Visible uniquement par l'équipe">
        <Textarea rows={3} placeholder="Ex : CB reçue le 06/10" {...register('adminNotes')} />
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