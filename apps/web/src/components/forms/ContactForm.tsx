'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Send } from 'lucide-react';
import { api } from '@/lib/api';

const schema = z.object({
  name: z.string().min(2, 'Nom requis (2 caractères min)'),
  email: z.string().email('Email invalide'),
  subject: z.string().min(3, 'Sujet requis (3 caractères min)'),
  message: z.string().min(10, 'Message trop court (10 caractères min)'),
});

type FormData = z.infer<typeof schema>;

export function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setStatus('loading');
    try {
      const res = await api.createContact(data);
      setMessage(
        res.message ??
          'Merci ! Votre message a bien été envoyé. Nous vous répondrons rapidement.'
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
        <p className="text-sfpa-olive font-semibold text-lg mb-2">✅ Message envoyé !</p>
        <p className="text-sfpa-anthracite text-[14px]">{message}</p>
        <button
          onClick={() => setStatus('idle')}
          className="mt-5 text-[12px] underline text-sfpa-olive font-semibold hover:text-sfpa-olive/80"
        >
          Envoyer un autre message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Nom + Email */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-[13px] font-semibold text-sfpa-anthracite mb-1.5">
            Nom complet *
          </label>
          <input
            {...register('name')}
            placeholder="Ex : Marie Dupont"
            className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-[14px] bg-white focus:ring-2 focus:ring-sfpa-olive focus:border-sfpa-olive outline-none transition"
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
          )}
        </div>
        <div>
          <label className="block text-[13px] font-semibold text-sfpa-anthracite mb-1.5">
            Email *
          </label>
          <input
            type="email"
            {...register('email')}
            placeholder="Ex : marie@example.com"
            className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-[14px] bg-white focus:ring-2 focus:ring-sfpa-olive focus:border-sfpa-olive outline-none transition"
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
          )}
        </div>
      </div>

      {/* Sujet */}
      <div>
        <label className="block text-[13px] font-semibold text-sfpa-anthracite mb-1.5">
          Sujet *
        </label>
        <input
          {...register('subject')}
          placeholder="Ex : Demande de partenariat, question sur vos actions…"
          className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-[14px] bg-white focus:ring-2 focus:ring-sfpa-olive focus:border-sfpa-olive outline-none transition"
        />
        {errors.subject && (
          <p className="text-red-500 text-xs mt-1">{errors.subject.message}</p>
        )}
      </div>

      {/* Message */}
      <div>
        <label className="block text-[13px] font-semibold text-sfpa-anthracite mb-1.5">
          Message *
        </label>
        <textarea
          {...register('message')}
          rows={6}
          placeholder="Décrivez votre demande ou votre projet en quelques mots..."
          className="w-full border border-gray-200 rounded-lg px-4 py-3 text-[14px] bg-white focus:ring-2 focus:ring-sfpa-olive focus:border-sfpa-olive outline-none transition resize-none"
        />
        {errors.message && (
          <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>
        )}
      </div>

      {/* Erreur globale */}
      {status === 'error' && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm p-4 rounded-lg">
          {message}
        </div>
      )}

      {/* Bouton */}
      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full bg-sfpa-ocre text-sfpa-anthracite font-semibold py-3.5 rounded-full hover:bg-sfpa-ocre/90 disabled:opacity-50 disabled:cursor-not-allowed transition shadow-sm inline-flex items-center justify-center gap-2"
      >
        <Send className="w-4 h-4" />
        {status === 'loading' ? 'Envoi en cours...' : 'Envoyer le message'}
      </button>

      <p className="text-xs text-gray-500 text-center">
        Vos informations restent confidentielles et ne sont jamais partagées.
      </p>
    </form>
  );
}