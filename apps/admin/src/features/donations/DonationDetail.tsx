import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Loader2, Save,ExternalLink } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import { FormField } from '@/components/forms/FormField';
import { StatusBadge, STATUS_MAP } from '@/components/common/StatusBadge';
import { Badge } from '@/components/ui/badge';

import { donationSchema, type DonationFormValues } from '@/schemas/donation.schema';
import {
  DONATION_STATUSES, DONATION_STATUS_LABELS,
  DONATION_FREQUENCY_LABELS, type Donation,
} from '@/services/donations.service';
import { formatCents } from '@/lib/utils';

interface Props {
  donation: Donation;
  submitting?: boolean;
  onSave: (v: DonationFormValues) => void | Promise<void>;
  onCancel: () => void;
}

const toForm = (d: Donation): DonationFormValues => ({
  status: d.status,
  adminNotes: d.adminNotes ?? '',
  taxReceiptSent: d.taxReceiptSent,
  donorName: d.donorName ?? '',
  donorEmail: d.donorEmail ?? '',
  donorAddress: d.donorAddress ?? '',
  donorCity: d.donorCity ?? '',
  donorPostalCode: d.donorPostalCode ?? '',
  donorCountry: d.donorCountry ?? '',
});

export function DonationDetail({ donation, submitting, onSave, onCancel }: Props) {
  const { register, handleSubmit, setValue, watch, reset, formState: { errors } } =
    useForm<DonationFormValues>({
      resolver: zodResolver(donationSchema),
      defaultValues: toForm(donation),
    });

  useEffect(() => { reset(toForm(donation)); }, [donation, reset]);

  const submit = handleSubmit((v) =>
    onSave({
      ...v,
      adminNotes: v.adminNotes || null,
      donorName: v.donorName || null,
      donorEmail: v.donorEmail || null,
      donorAddress: v.donorAddress || null,
      donorCity: v.donorCity || null,
      donorPostalCode: v.donorPostalCode || null,
      donorCountry: v.donorCountry || null,
    })
  );

  return (
    <form onSubmit={submit} className="space-y-5">
      {/* Montant + statut */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-heading text-3xl font-bold text-sfpa-terra">
            {formatCents(donation.amount, donation.currency)}
          </p>
          <div className="mt-1 flex items-center gap-2">
            <Badge variant="secondary" className="text-xs">
              {DONATION_FREQUENCY_LABELS[donation.frequency]}
            </Badge>
            <StatusBadge
              label={STATUS_MAP[donation.status]?.label ?? donation.status}
              tone={STATUS_MAP[donation.status]?.tone}
            />
          </div>
        </div>
        {donation.stripePaymentId && (
          <a
            href={`https://dashboard.stripe.com/payments/${donation.stripePaymentId}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-xs text-sfpa-bleu hover:underline"
          >
            Voir dans Stripe <ExternalLink className="h-3 w-3" />
          </a>
        )}
      </div>

      <Separator />

      {/* Dates Stripe */}
      <dl className="grid gap-3 sm:grid-cols-2 text-sm">
        <Info label="Payé le" value={donation.paidAt
          ? format(new Date(donation.paidAt), "dd MMM yyyy 'à' HH:mm", { locale: fr })
          : '—'}
        />
        <Info label="Créé le" value={format(new Date(donation.createdAt), 'dd MMM yyyy', { locale: fr })} />
      </dl>

      <Separator />

      {/* Formulaire admin */}
      <div className="grid gap-4 sm:grid-cols-2">
        <FormField label="Statut" required error={errors.status?.message}>
          <Select
            value={watch('status')}
            onValueChange={(v) => setValue('status', v as never, { shouldDirty: true })}
          >
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {DONATION_STATUSES.map((s) => (
                <SelectItem key={s} value={s}>{DONATION_STATUS_LABELS[s]}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormField>

        <div className="flex items-center justify-between rounded-lg border bg-muted/30 px-4 py-3">
          <div>
            <p className="text-sm font-medium">Reçu fiscal envoyé</p>
            <p className="text-xs text-muted-foreground">Cocher après envoi</p>
          </div>
          <Switch
            checked={watch('taxReceiptSent')}
            onCheckedChange={(v) => setValue('taxReceiptSent', v, { shouldDirty: true })}
          />
        </div>
      </div>

      {/* Coordonnées donateur */}
      <div className="grid gap-4 sm:grid-cols-2">
        <FormField label="Nom" error={errors.donorName?.message}>
          <Input {...register('donorName')} />
        </FormField>
        <FormField label="Email" error={errors.donorEmail?.message}>
          <Input type="email" {...register('donorEmail')} />
        </FormField>
        <FormField label="Adresse">
          <Input {...register('donorAddress')} />
        </FormField>
        <FormField label="Ville">
          <Input {...register('donorCity')} />
        </FormField>
        <FormField label="Code postal">
          <Input {...register('donorPostalCode')} />
        </FormField>
        <FormField label="Pays">
          <Input {...register('donorCountry')} />
        </FormField>
      </div>

      <FormField label="Notes internes">
        <Textarea rows={3} placeholder="Ex : Reçu fiscal envoyé le 06/10" {...register('adminNotes')} />
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

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {label}
      </dt>
      <dd className="mt-0.5">{value}</dd>
    </div>
  );
}