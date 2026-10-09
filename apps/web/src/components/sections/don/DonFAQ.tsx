'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Container } from '@/components/layout/Container';

const FAQ = [
  {
    q: 'Mon don est-il déductible des impôts ?',
    a: 'Oui. En tant qu\'association loi 1901 reconnue d\'intérêt général, SFPA vous permet de bénéficier d\'une réduction d\'impôt de 66 % de votre don, dans la limite de 20 % de votre revenu imposable.',
  },
  {
    q: 'Comment recevoir mon reçu fiscal ?',
    a: 'Un reçu fiscal vous est envoyé automatiquement par email ou par courrier, dès réception de votre don. Conservez-le précieusement : il vous sera demandé lors de votre déclaration de revenus.',
  },
  {
    q: 'Puis-je donner en plusieurs fois ?',
    a: 'Oui. Vous pouvez choisir un don mensuel qui sera prélevé automatiquement chaque mois. C\'est le moyen le plus efficace de soutenir nos actions dans la durée.',
  },
  {
    q: 'Où va concrètement mon argent ?',
    a: '75 % de votre don finance directement les projets de terrain (formations, soins, équipements). 15 % couvre le fonctionnement de l\'association, et 10 % la communication. Nos comptes sont disponibles sur simple demande.',
  },
  {
    q: 'Puis-je choisir le projet que je soutiens ?',
    a: 'Oui, contactez-nous pour discuter d\'un don affecté. Nous pouvons dédier votre soutien à un projet précis (formation, mission santé, reforestation...).',
  },
];

export function DonFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="relative py-14 lg:py-16 bg-white">
      <Container>
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="text-[10px] font-semibold uppercase tracking-[0.25em] text-sfpa-olive mb-3">
            Questions fréquentes
          </div>
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-sfpa-anthracite mb-3 leading-tight">
            Vos <span className="text-sfpa-olive">questions</span>
          </h2>
          <div className="w-10 h-0.5 bg-sfpa-ocre mx-auto" />
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {FAQ.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className="bg-gray-50 rounded-xl border border-gray-100 overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left hover:bg-gray-100/50 transition"
                >
                  <span className="text-[14px] font-semibold text-sfpa-anthracite">
                    {item.q}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-sfpa-olive flex-shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    isOpen ? 'max-h-96' : 'max-h-0'
                  }`}
                >
                  <div className="px-5 pb-4 text-[13.5px] text-gray-600 leading-relaxed">
                    {item.a}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}