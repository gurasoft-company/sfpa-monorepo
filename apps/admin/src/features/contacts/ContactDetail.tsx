import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Loader2, Mail, MailOpen, Reply, Save, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { FormField } from '@/components/forms/FormField';

import { contactSchema, type ContactFormValues } from '@/schemas/contact.schema';
import type { Contact } from '@/services/contacts.service';

interface Props {
  contact: Contact;
  submitting?: boolean;
  onSave: (v: ContactFormValues) => void | Promise<void>;
  onDelete: () => void;
  onToggleRead: (isRead: boolean) => void;
  onClose: () => void;
}

export function ContactDetail({
  contact, submitting, onSave, onDelete, onToggleRead, onClose,
}: Props) {
  const {
    register, handleSubmit, reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: undefined,
    defaultValues: { isRead: contact.isRead, adminNotes: contact.adminNotes ?? '' },
  });

  useEffect(() => {
    reset({ isRead: contact.isRead, adminNotes: contact.adminNotes ?? '' });
    if (!contact.isRead) onToggleRead(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contact.id]);

  return (
    <form
      onSubmit={handleSubmit((v) =>
        onSave({ ...v, adminNotes: v.adminNotes || null })
      )}
      className="space-y-4"
    >
      {/* En-tête */}
      <div className="space-y-2">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="font-heading text-lg font-semibold">{contact.subject}</p>
            <p className="text-sm text-muted-foreground">
              De <strong>{contact.name}</strong> · {contact.email}
            </p>
          </div>
          <Badge variant={contact.isRead ? 'secondary' : 'destructive'}>
            {contact.isRead ? 'Lu' : 'Non lu'}
          </Badge>
        </div>
        <p className="text-xs text-muted-foreground">
          Reçu le {format(new Date(contact.createdAt), "dd MMM yyyy 'à' HH:mm", { locale: fr })}
        </p>
      </div>

      <Separator />

      {/* Message */}
      <div className="rounded-lg border bg-muted/30 p-4 text-sm whitespace-pre-wrap">
        {contact.message}
      </div>

      {/* Actions rapides */}
      <div className="flex flex-wrap gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => onToggleRead(!contact.isRead)}
        >
          {contact.isRead ? (
            <><Mail className="h-4 w-4" /> Marquer non lu</>
          ) : (
            <><MailOpen className="h-4 w-4" /> Marquer lu</>
          )}
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          asChild
        >
          <a href={`mailto:${contact.email}?subject=Re: ${contact.subject}`}>
            <Reply className="h-4 w-4" /> Répondre par email
          </a>
        </Button>
      </div>

      <Separator />

      <FormField
        label="Notes internes"
        hint="Visible uniquement par l'équipe"
        error={errors.adminNotes?.message}
        htmlFor="adminNotes"
      >
        <Textarea
          id="adminNotes"
          rows={3}
          placeholder="Ex : Répondu le 06/10 par email"
          {...register('adminNotes')}
        />
      </FormField>

      {/* Footer */}
      <div className="flex items-center justify-between gap-2 border-t pt-4">
        <Button
          type="button"
          variant="ghost"
          onClick={onDelete}
          className="text-destructive hover:bg-destructive/5 hover:text-destructive"
        >
          <Trash2 className="h-4 w-4" /> Supprimer
        </Button>
        <div className="flex gap-2">
          <Button type="button" variant="outline" onClick={onClose} disabled={submitting}>
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
      </div>
    </form>
  );
}