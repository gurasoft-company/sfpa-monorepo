'use client';

import { useState } from 'react';
import { Heart, CreditCard, Building2, FileCheck } from 'lucide-react';
import { Container } from '@/components/layout/Container';
import { createDonationSession } from '@/app/actions/stripe';

const AMOUNTS = ['20', '50', '100', '200', '500'];

export function DonationForm() {
  const [amount, setAmount] = useState('50');
  const [customAmount, setCustomAmount] = useState('');
  const [frequency, setFrequency] = useState<'once' | 'monthly'>('once');
  const [isLoading, setIsLoading] = useState(false);

  const displayAmount = customAmount || amount;

  const handleDonation = async () => {
    const finalAmount = Number(customAmount) || Number(amount);

    if (finalAmount < 1) {
      alert('Veuillez saisir un montant valide (minimum 1 €).');
      return;
    }

    setIsLoading(true);

    try {
      await createDonationSession({
        amount: finalAmount,
        frequency: frequency === 'monthly' ? 'monthly' : 'once',
      });
    } catch (err) {
      console.error(err);
      alert(
        'Une erreur est survenue lors de la création du paiement. Réessayez.'
      );
      setIsLoading(false);
    }
  };

  return (
    <section className="relative py-14 lg:py-16 bg-gray-50">
      <Container>
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <div className="text-[10px] font-semibold uppercase tracking-[0.25em] text-sfpa-olive mb-3">
              Faire un don
            </div>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-sfpa-anthracite mb-3 leading-tight">
              Choisissez votre <span className="text-sfpa-olive">montant</span>
            </h2>
            <div className="w-10 h-0.5 bg-sfpa-ocre mx-auto" />
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 lg:p-8">
            {/* Fréquence */}
            <div className="mb-6">
              <label className="block text-[12px] font-semibold text-sfpa-anthracite mb-2 uppercase tracking-wider">
                Je donne
              </label>
              <div className="grid grid-cols-2 gap-2 p-1 bg-gray-100 rounded-full">
                <button
                  type="button"
                  onClick={() => setFrequency('once')}
                  className={`py-2.5 rounded-full text-[13px] font-semibold transition-all ${
                    frequency === 'once'
                      ? 'bg-white text-sfpa-olive shadow-sm'
                      : 'text-gray-600 hover:text-sfpa-olive'
                  }`}
                >
                  Une seule fois
                </button>
                <button
                  type="button"
                  onClick={() => setFrequency('monthly')}
                  className={`py-2.5 rounded-full text-[13px] font-semibold transition-all ${
                    frequency === 'monthly'
                      ? 'bg-white text-sfpa-olive shadow-sm'
                      : 'text-gray-600 hover:text-sfpa-olive'
                  }`}
                >
                  Chaque mois
                </button>
              </div>
            </div>

            {/* Montants */}
            <div className="mb-6">
              <label className="block text-[12px] font-semibold text-sfpa-anthracite mb-2 uppercase tracking-wider">
                Montant
              </label>
              <div className="grid grid-cols-5 gap-2 mb-3">
                {AMOUNTS.map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => {
                      setAmount(amt);
                      setCustomAmount('');
                    }}
                    className={`py-3 rounded-xl text-[15px] font-bold transition-all border ${
                      amount === amt && !customAmount
                        ? 'bg-sfpa-olive text-white border-sfpa-olive shadow-sm'
                        : 'bg-white text-sfpa-anthracite border-gray-200 hover:border-sfpa-olive/40 hover:text-sfpa-olive'
                    }`}
                  >
                    {amt} €
                  </button>
                ))}
              </div>

              <div className="relative">
                <input
                  type="number"
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                  placeholder="Autre montant"
                  min="1"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-[14px] bg-white focus:ring-2 focus:ring-sfpa-olive focus:border-sfpa-olive outline-none transition pr-12"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-[14px] font-semibold">
                  €
                </span>
              </div>
            </div>

            {/* Info fiscale */}
            <div className="bg-sfpa-olive/5 border border-sfpa-olive/15 rounded-xl p-4 mb-6">
              <p className="text-[13px] text-sfpa-anthracite leading-relaxed">
                <span className="font-bold text-sfpa-olive">
                  Après réduction fiscale
                </span>
                , votre don de <strong>{displayAmount} €</strong> vous coûte
                réellement{' '}
                <strong className="text-sfpa-olive">
                  {(Number(displayAmount) * 0.34 || 0).toFixed(0)} €
                </strong>
                .
              </p>
            </div>

            {/* Bouton */}
            <button
              type="button"
              onClick={handleDonation}
              disabled={isLoading}
              className="w-full bg-sfpa-terra text-white font-bold py-4 rounded-full shadow-md transition text-[15px] hover:bg-sfpa-terra/90 disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2"
            >
              <Heart className="w-4 h-4" />
              {isLoading
                ? 'Redirection vers le paiement...'
                : `Faire un don de ${displayAmount} €`}
            </button>

            <p className="text-[11px] text-gray-500 text-center mt-3 leading-relaxed">
              Paiement 100% sécurisé via Stripe. Vous serez redirigé vers une
              page de paiement sécurisée.
            </p>

            <div className="flex items-center justify-center gap-3 mt-5 pt-5 border-t border-gray-100">
              <div className="inline-flex items-center gap-1.5 text-[10px] text-gray-500 uppercase tracking-wider">
                <CreditCard className="w-3.5 h-3.5 text-sfpa-olive" />
                Carte bancaire
              </div>
              <div className="w-px h-3 bg-gray-200" />
              <div className="inline-flex items-center gap-1.5 text-[10px] text-gray-500 uppercase tracking-wider">
                <Building2 className="w-3.5 h-3.5 text-sfpa-olive" />
                Virement
              </div>
              <div className="w-px h-3 bg-gray-200" />
              <div className="inline-flex items-center gap-1.5 text-[10px] text-gray-500 uppercase tracking-wider">
                <FileCheck className="w-3.5 h-3.5 text-sfpa-olive" />
                Chèque
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}