'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { api } from '@/lib/api';

const schema = z.object({
  firstName: z.string().min(2, 'Prénom requis'),
  lastName: z.string().min(2, 'Nom requis'),
  email: z.string().email('Email invalide'),
  phone: z.string().optional(),
  address: z.string().optional(),
  city: z.string().min(2, 'Ville requise'),
  country: z.string().min(2, 'Pays requis'),
  membershipType: z.enum(['actif', 'bienfaiteur', 'honneur']),
  motivation: z.string().min(10, 'Motivation requise (10 caractères min)'),
});

type FormData = z.infer<typeof schema>;

export function MemberForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { membershipType: 'actif' },
  });

  const onSubmit = async (data: FormData) => {
    setStatus('loading');
    try {
      const res = await api.createMember(data);
      setMessage(
        res.message ??
          'Merci de rejoindre SFPA ! Nous vous recontacterons pour finaliser votre adhésion.'
      );
      setStatus('success');
      reset();
    } catch (err: any) {
      setMessage(err.message || 'Une erreur est survenue.');
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="bg-sfpa-olive/10 border-2 border-sfpa-olive rounded-2xl p-8 text-center">
        <p className="text-sfpa-olive font-semibold text-lg mb-2">✅ Merci !</p>
        <p className="text-sfpa-anthracite text-[14px]">{message}</p>
        <button
          onClick={() => setStatus('idle')}
          className="mt-5 text-[12px] underline text-sfpa-olive font-semibold hover:text-sfpa-olive/80"
        >
          Envoyer une autre adhésion
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Prénom + Nom */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-[13px] font-semibold text-sfpa-anthracite mb-1.5">
            Prénom *
          </label>
          <input
            {...register('firstName')}
            className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-[14px] bg-white focus:ring-2 focus:ring-sfpa-olive focus:border-sfpa-olive outline-none transition"
          />
          {errors.firstName && (
            <p className="text-red-500 text-xs mt-1">{errors.firstName.message}</p>
          )}
        </div>
        <div>
          <label className="block text-[13px] font-semibold text-sfpa-anthracite mb-1.5">
            Nom *
          </label>
          <input
            {...register('lastName')}
            className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-[14px] bg-white focus:ring-2 focus:ring-sfpa-olive focus:border-sfpa-olive outline-none transition"
          />
          {errors.lastName && (
            <p className="text-red-500 text-xs mt-1">{errors.lastName.message}</p>
          )}
        </div>
      </div>

      {/* Email + Téléphone */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-[13px] font-semibold text-sfpa-anthracite mb-1.5">
            Email *
          </label>
          <input
            type="email"
            {...register('email')}
            className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-[14px] bg-white focus:ring-2 focus:ring-sfpa-olive focus:border-sfpa-olive outline-none transition"
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
          )}
        </div>
        <div>
          <label className="block text-[13px] font-semibold text-sfpa-anthracite mb-1.5">
            Téléphone <span className="text-gray-400 font-normal">(optionnel)</span>
          </label>
          <input
            {...register('phone')}
            className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-[14px] bg-white focus:ring-2 focus:ring-sfpa-olive focus:border-sfpa-olive outline-none transition"
          />
        </div>
      </div>

      {/* Ville + Pays */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-[13px] font-semibold text-sfpa-anthracite mb-1.5">
            Ville *
          </label>
          <input
            {...register('city')}
            className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-[14px] bg-white focus:ring-2 focus:ring-sfpa-olive focus:border-sfpa-olive outline-none transition"
          />
          {errors.city && (
            <p className="text-red-500 text-xs mt-1">{errors.city.message}</p>
          )}
        </div>
        <div>
          <label className="block text-[13px] font-semibold text-sfpa-anthracite mb-1.5">
            Pays *
          </label>
          <input
            {...register('country')}
            className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-[14px] bg-white focus:ring-2 focus:ring-sfpa-olive focus:border-sfpa-olive outline-none transition"
          />
          {errors.country && (
            <p className="text-red-500 text-xs mt-1">{errors.country.message}</p>
          )}
        </div>
      </div>

      {/* Adresse */}
      <div>
        <label className="block text-[13px] font-semibold text-sfpa-anthracite mb-1.5">
          Adresse <span className="text-gray-400 font-normal">(optionnel)</span>
        </label>
        <input
          {...register('address')}
          className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-[14px] bg-white focus:ring-2 focus:ring-sfpa-olive focus:border-sfpa-olive outline-none transition"
        />
      </div>

      {/* Type d'adhésion */}
      <div>
        <label className="block text-[13px] font-semibold text-sfpa-anthracite mb-1.5">
          Type d'adhésion *
        </label>
        <select
          {...register('membershipType')}
          className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-[14px] bg-white focus:ring-2 focus:ring-sfpa-olive focus:border-sfpa-olive outline-none transition"
        >
          <option value="actif">Membre actif — 20 € / an</option>
          <option value="bienfaiteur">Membre bienfaiteur — 100 € / an</option>
          <option value="honneur">Membre d'honneur — Sur décision du CA</option>
        </select>
        {errors.membershipType && (
          <p className="text-red-500 text-xs mt-1">{errors.membershipType.message}</p>
        )}
      </div>

      {/* Motivation */}
      <div>
        <label className="block text-[13px] font-semibold text-sfpa-anthracite mb-1.5">
          Motivation *
        </label>
        <textarea
          {...register('motivation')}
          rows={4}
          placeholder="Pourquoi souhaitez-vous adhérer à SFPA ?"
          className="w-full border border-gray-200 rounded-lg px-4 py-3 text-[14px] bg-white focus:ring-2 focus:ring-sfpa-olive focus:border-sfpa-olive outline-none transition resize-none"
        />
        {errors.motivation && (
          <p className="text-red-500 text-xs mt-1">{errors.motivation.message}</p>
        )}
      </div>

      {status === 'error' && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm p-4 rounded-lg">
          {message}
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full bg-sfpa-ocre text-sfpa-anthracite font-semibold py-3.5 rounded-full hover:bg-sfpa-ocre/90 disabled:opacity-50 transition shadow-sm"
      >
        {status === 'loading' ? 'Envoi en cours...' : 'Adhérer à SFPA'}
      </button>

      <p className="text-xs text-gray-500 text-center">
        Nous vous recontacterons pour finaliser votre adhésion et vous transmettre les modalités de paiement.
      </p>
    </form>
  );
}