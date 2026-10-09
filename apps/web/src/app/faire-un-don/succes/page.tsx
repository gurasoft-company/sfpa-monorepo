import { redirect } from 'next/navigation';
import Link from 'next/link';
import Stripe from 'stripe';
import { CheckCircle2, Heart, XCircle } from 'lucide-react';
import { Container } from '@/components/layout/Container';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
   apiVersion: '2026-09-30.endive',
});

export default async function DonSuccesPage({
  searchParams,
}: {
  searchParams: { session_id?: string };
}) {
  const { session_id } = searchParams;

  if (!session_id) {
    redirect('/faire-un-don');
  }

  let session: Stripe.Checkout.Session;
  try {
    session = await stripe.checkout.sessions.retrieve(session_id);
  } catch {
    redirect('/faire-un-don');
  }

  const isPaid = session.payment_status === 'paid';

  if (!isPaid) {
    return (
      <section className="py-20 lg:py-24 bg-white">
        <Container>
          <div className="max-w-xl mx-auto text-center">
            <div className="w-20 h-20 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-6">
              <XCircle className="w-10 h-10 text-amber-600" />
            </div>
            <div className="text-[10px] font-semibold uppercase tracking-[0.25em] text-amber-600 mb-3">
              En attente de confirmation
            </div>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-sfpa-anthracite mb-4 leading-tight">
              Paiement en cours de traitement
            </h1>
            <div className="w-10 h-0.5 bg-sfpa-ocre mx-auto mb-5" />
            <p className="text-base text-gray-600 leading-relaxed mb-8">
              Votre paiement n&apos;a pas encore été confirmé par notre
              prestataire. Vous recevrez un email dès qu&apos;il sera validé.
              Si vous pensez qu&apos;il s&apos;agit d&apos;une erreur,
              contactez-nous.
            </p>
            <Link
              href="/faire-un-don"
              className="inline-flex items-center justify-center bg-sfpa-olive text-white font-semibold px-6 py-3 rounded-full hover:bg-sfpa-olive/90 transition shadow-sm text-sm"
            >
              Retour au formulaire
            </Link>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className="py-20 lg:py-24 bg-white">
      <Container>
        <div className="max-w-xl mx-auto text-center">
          <div className="w-20 h-20 rounded-full bg-sfpa-olive/10 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-sfpa-olive" />
          </div>

          <div className="text-[10px] font-semibold uppercase tracking-[0.25em] text-sfpa-olive mb-3">
            Merci infiniment
          </div>

          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-sfpa-anthracite mb-4 leading-tight">
            Votre don a bien été reçu
          </h1>

          <div className="w-10 h-0.5 bg-sfpa-ocre mx-auto mb-5" />

          <p className="text-base text-gray-600 leading-relaxed mb-8">
            Grâce à vous, nous pouvons continuer à former la jeunesse
            africaine, soigner les populations et protéger la Terre. Un reçu
            fiscal vous sera adressé par email dans les prochains jours.
          </p>

          <p className="text-[11px] text-gray-400 mb-8 font-mono">
            Référence : {session.id.slice(0, 24)}…
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 bg-sfpa-olive text-white font-semibold px-6 py-3 rounded-full hover:bg-sfpa-olive/90 transition shadow-sm text-sm"
            >
              Retour à l&apos;accueil
            </Link>
            <Link
              href="/actions"
              className="inline-flex items-center justify-center gap-2 border-2 border-sfpa-olive text-sfpa-olive font-semibold px-6 py-3 rounded-full hover:bg-sfpa-olive hover:text-white transition text-sm"
            >
              <Heart className="w-4 h-4" /> Voir nos actions
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}