import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { KeyRound, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FormField } from '@/components/forms/FormField';
import { changePassword } from '@/services/auth.service';
import { getApiErrorMessage } from '@/lib/api';

const schema = z
  .object({
    currentPassword: z.string().min(1, 'Mot de passe actuel requis'),
    newPassword: z
      .string()
      .min(8, 'Au moins 8 caractères')
      .regex(/[A-Z]/, 'Au moins une majuscule')
      .regex(/[a-z]/, 'Au moins une minuscule')
      .regex(/\d/, 'Au moins un chiffre'),
    confirmPassword: z.string().min(1, 'Confirmation requise'),
  })
  .refine((d) => d.newPassword === d.confirmPassword, {
    message: 'Les mots de passe ne correspondent pas',
    path: ['confirmPassword'],
  });

type FormValues = z.infer<typeof schema>;

export function PasswordSection() {
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { currentPassword: '', newPassword: '', confirmPassword: '' },
  });

  const submit = handleSubmit(async (values) => {
    setSubmitting(true);
    try {
      await changePassword({
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
      });
      toast.success('Mot de passe modifié');
      reset();
    } catch (err) {
      toast.error(getApiErrorMessage(err));
    } finally {
      setSubmitting(false);
    }
  });

  return (
    <form onSubmit={submit} className="space-y-4">
      <FormField
        label="Mot de passe actuel"
        required
        error={errors.currentPassword?.message}
        htmlFor="currentPassword"
      >
        <Input
          id="currentPassword"
          type="password"
          autoComplete="current-password"
          {...register('currentPassword')}
        />
      </FormField>

      <FormField
        label="Nouveau mot de passe"
        required
        error={errors.newPassword?.message}
        hint="8 caractères min, 1 majuscule, 1 minuscule, 1 chiffre"
        htmlFor="newPassword"
      >
        <Input
          id="newPassword"
          type="password"
          autoComplete="new-password"
          {...register('newPassword')}
        />
      </FormField>

      <FormField
        label="Confirmer le nouveau mot de passe"
        required
        error={errors.confirmPassword?.message}
        htmlFor="confirmPassword"
      >
        <Input
          id="confirmPassword"
          type="password"
          autoComplete="new-password"
          {...register('confirmPassword')}
        />
      </FormField>

      <div className="flex justify-end pt-2">
        <Button
          type="submit"
          disabled={submitting}
          className="bg-sfpa-terra hover:bg-sfpa-terra/90"
        >
          {submitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Modification…
            </>
          ) : (
            <>
              <KeyRound className="mr-2 h-4 w-4" /> Changer le mot de passe
            </>
          )}
        </Button>
      </div>
    </form>
  );
}