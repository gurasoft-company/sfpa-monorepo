'use server';

import { redirect } from 'next/navigation';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-09-30.endive',
});

interface DonationParams {
  amount: number;
  frequency: 'once' | 'monthly';
}

export async function createDonationSession({
  amount,
  frequency,
}: DonationParams) {
  const amountInCents = Math.round(amount * 100);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  const session = await stripe.checkout.sessions.create({
    mode: frequency === 'monthly' ? 'subscription' : 'payment',
    line_items: [
      {
        price_data: {
          currency: 'eur',
          product_data: {
            name: 'Don à SFPA',
            description:
              'Soutien aux actions de Solidarité Fraternelle Provence Afrique',
          },
          unit_amount: amountInCents,
          ...(frequency === 'monthly' && {
            recurring: { interval: 'month' },
          }),
        },
        quantity: 1,
      },
    ],
    success_url: `${siteUrl}/faire-un-don/succes?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${siteUrl}/faire-un-don`,
    metadata: {
      frequency,
      source: 'website',
    },
  });

  if (!session.url) {
    throw new Error('Impossible de créer la session de paiement');
  }

  redirect(session.url);
}