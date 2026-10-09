'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { api } from '@/lib/api';

const schema = z.object({
  authorName: z.string().min(2, 'Nom trop court').max(255),
  authorEmail: z.string().email('Email invalide').optional().or(z.literal('')),
  authorRole: z.string().max(255).optional(),
  authorLocation: z.string().max(255).optional(),
  quote: z.string().min(20, 'Minimum 20 caractères').max(2000, 'Maximum 2000 caractères'),
  rating: z.number().int().min(1).max(5).optional(),
});

type FormData = z.infer<typeof schema>;

export function TestimonialForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setStatus('loading');
    try {
      const res = await api.createTestimonial({
        ...data,
        authorEmail: data.authorEmail || undefined,
        rating: data.rating || undefined,
      });
      setMessage(res.message ?? 'Merci ! Votre témoignage sera publié après validation.');
      setStatus('success');
      reset();
    } catch (err: any) {
      setMessage(err.message || 'Une erreur est survenue.');
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="bg-sfpa-olive/10 border-2 border-sfpa-olive rounded-lg p-8 text-center">
        <p className="text-sfpa-olive font-semibold text-lg mb-2">✅ Merci !</p>
        <p className="text-sfpa-anthracite">{message}</p>
        <button
          onClick={() => setStatus('idle')}
          className="mt-4 text-sm underline text-sfpa-olive font-semibold"
        >
          Envoyer un autre témoignage
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-[13px] font-semibold text-sfpa-anthracite mb-1.5">
            Nom complet *
          </label>
          <input
            {...register('authorName')}
            className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-[14px] bg-white focus:ring-2 focus:ring-sfpa-olive focus:border-sfpa-olive outline-none transition"
          />
          {errors.authorName && (
            <p className="text-red-500 text-xs mt-1">{errors.authorName.message}</p>
          )}
        </div>
        <div>
          <label className="block text-[13px] font-semibold text-sfpa-anthracite mb-1.5">
            Email <span className="text-gray-400 font-normal">(non publié)</span>
          </label>
          <input
            type="email"
            {...register('authorEmail')}
            className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-[14px] bg-white focus:ring-2 focus:ring-sfpa-olive focus:border-sfpa-olive outline-none transition"
          />
          {errors.authorEmail && (
            <p className="text-red-500 text-xs mt-1">{errors.authorEmail.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-[13px] font-semibold text-sfpa-anthracite mb-1.5">
            Rôle
          </label>
          <input
            {...register('authorRole')}
            placeholder="Ex : Bénévole formateur"
            className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-[14px] bg-white focus:ring-2 focus:ring-sfpa-olive focus:border-sfpa-olive outline-none transition"
          />
        </div>
        <div>
          <label className="block text-[13px] font-semibold text-sfpa-anthracite mb-1.5">
            Lieu
          </label>
          <input
            {...register('authorLocation')}
            placeholder="Ex : Togo"
            className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-[14px] bg-white focus:ring-2 focus:ring-sfpa-olive focus:border-sfpa-olive outline-none transition"
          />
        </div>
      </div>

      <div>
        <label className="block text-[13px] font-semibold text-sfpa-anthracite mb-1.5">
          Votre témoignage *
        </label>
        <textarea
          {...register('quote')}
          rows={5}
          className="w-full border border-gray-200 rounded-lg px-4 py-3 text-[14px] bg-white focus:ring-2 focus:ring-sfpa-olive focus:border-sfpa-olive outline-none transition resize-none"
          placeholder="Racontez votre expérience (minimum 20 caractères)..."
        />
        {errors.quote && (
          <p className="text-red-500 text-xs mt-1">{errors.quote.message}</p>
        )}
      </div>

      <div>
        <label className="block text-[13px] font-semibold text-sfpa-anthracite mb-1.5">
          Note (optionnel)
        </label>
        <select
          {...register('rating', { valueAsNumber: true })}
          className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-[14px] bg-white focus:ring-2 focus:ring-sfpa-olive focus:border-sfpa-olive outline-none transition"
        >
          <option value="">Pas de note</option>
          <option value="5">⭐⭐⭐⭐⭐ Excellent</option>
          <option value="4">⭐⭐⭐⭐ Très bien</option>
          <option value="3">⭐⭐⭐ Bien</option>
          <option value="2">⭐⭐ Moyen</option>
          <option value="1">⭐ Faible</option>
        </select>
      </div>

      {status === 'error' && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm p-4 rounded-lg">
          {message}
        </div>
      )}

      {/* Bouton jaune ocre */}
      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full bg-sfpa-ocre text-sfpa-anthracite font-semibold py-3 rounded-full hover:bg-sfpa-ocre/90 disabled:opacity-50 transition shadow-sm"
      >
        {status === 'loading' ? 'Envoi en cours...' : 'Envoyer mon témoignage'}
      </button>

      <p className="text-xs text-gray-500 text-center">
        Votre témoignage sera publié après validation par notre équipe. Merci de votre patience.
      </p>
    </form>
  );
}