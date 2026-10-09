import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2, Save } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FormField } from '@/components/forms/FormField';
import { useAuthStore } from '@/store/auth.store';
import { updateProfile } from '@/services/auth.service';
import { getApiErrorMessage } from '@/lib/api';

const schema = z.object({
  firstName: z.string().min(1, 'Prénom requis').max(100),
  lastName: z.string().min(1, 'Nom requis').max(100),
  email: z.string().email('Email invalide').max(255),
});

type FormValues = z.infer<typeof schema>;

export function ProfileSection() {
  const user = useAuthStore((s) => s.user);
  const setUser = useAuthStore((s) => s.setUser);
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: user?.firstName ?? '',
      lastName: user?.lastName ?? '',
      email: user?.email ?? '',
    },
  });

  const submit = handleSubmit(async (values) => {
    setSubmitting(true);
    try {
      const updated = await updateProfile(values);
      setUser(updated);
      reset(values);
      toast.success('Profil mis à jour');
    } catch (err) {
      toast.error(getApiErrorMessage(err));
    } finally {
      setSubmitting(false);
    }
  });

  return (
    <form onSubmit={submit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <FormField label="Prénom" required error={errors.firstName?.message} htmlFor="firstName">
          <Input id="firstName" {...register('firstName')} />
        </FormField>
        <FormField label="Nom" required error={errors.lastName?.message} htmlFor="lastName">
          <Input id="lastName" {...register('lastName')} />
        </FormField>
      </div>

      <FormField label="Email" required error={errors.email?.message} htmlFor="email">
        <Input id="email" type="email" {...register('email')} />
      </FormField>

      <div className="flex justify-end pt-2">
        <Button
          type="submit"
          disabled={submitting || !isDirty}
          className="bg-sfpa-terra hover:bg-sfpa-terra/90"
        >
          {submitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Enregistrement…
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" /> Enregistrer
            </>
          )}
        </Button>
      </div>
    </form>
  );
}