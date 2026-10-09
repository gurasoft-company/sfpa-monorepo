import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

export const runtime = 'nodejs';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2026-09-30.endive',
});

export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get('stripe-signature');

  if (!signature) {
    return NextResponse.json(
      { error: 'Signature Stripe manquante' },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    console.error('❌ Erreur signature webhook:', err.message);
    return NextResponse.json(
      { error: `Webhook Error: ${err.message}` },
      { status: 400 }
    );
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;

        try {
          const res = await fetch(
            `${process.env.BACKEND_API_URL}/public/donations/webhook`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'X-Webhook-Secret': process.env.DONATION_WEBHOOK_SECRET!,
              },
              body: JSON.stringify({
                stripeSessionId: session.id,
                stripePaymentIntentId: session.payment_intent as
                  | string
                  | undefined,
                stripeSubscriptionId: session.subscription as
                  | string
                  | undefined,
                stripeCustomerId: session.customer as string | undefined,
                amount: session.amount_total,
                currency: session.currency || 'EUR',
                frequency:
                  session.mode === 'subscription' ? 'monthly' : 'once',
                donorEmail: session.customer_details?.email || undefined,
                donorName: session.customer_details?.name || undefined,
                donorAddress:
                  session.customer_details?.address?.line1 || undefined,
                donorCity: session.customer_details?.address?.city || undefined,
                donorPostalCode:
                  session.customer_details?.address?.postal_code || undefined,
                donorCountry:
                  session.customer_details?.address?.country || undefined,
                status: 'paid',
                paidAt: new Date().toISOString(),
              }),
            }
          );

          const data = await res.json();
          if (data.success) {
            console.log('✅ Don enregistré en base :', data.data.donation.id);
          } else {
            console.error('❌ Erreur backend :', data.message);
          }
        } catch (err) {
          console.error('❌ Erreur appel backend :', err);
        }
        break;
      }

      case 'invoice.paid': {
        const invoice = event.data.object as Stripe.Invoice;
        console.log('✅ Renouvellement mensuel confirmé :', invoice.id);
        break;
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice;
        console.warn('⚠️ Échec de paiement récurrent :', invoice.id);
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        console.log('🛑 Abonnement annulé :', subscription.id);
        break;
      }

      default:
        console.log(`ℹ️ Événement non traité : ${event.type}`);
    }
  } catch (err: any) {
    console.error('❌ Erreur traitement webhook:', err);
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    );
  }

  return NextResponse.json({ received: true });
}