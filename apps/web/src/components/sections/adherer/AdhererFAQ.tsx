'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Container } from '@/components/layout/Container';

const FAQ = [
  {
    q: 'Quand mon adhésion prend-elle effet ?',
    a: 'Dès réception de votre cotisation. Vous recevez ensuite une confirmation par email avec votre carte de membre et les informations pratiques.',
  },
  {
    q: 'Mon adhésion est-elle déductible des impôts ?',
    a: 'Pour l\'adhésion Bienfaiteur uniquement : 66 % du montant est déductible, dans la limite de 20 % du revenu imposable. Un reçu fiscal vous sera adressé.',
  },
  {
    q: 'Comment payer ma cotisation ?',
    a: 'Par virement bancaire, chèque ou en espèces. Nous vous transmettrons les coordonnées après réception de votre formulaire.',
  },
  {
    q: 'Puis-je changer de formule en cours d\'année ?',
    a: 'Oui, à tout moment. Il suffit de nous écrire ou de le signaler lors de l\'assemblée générale.',
  },
  {
    q: 'Que se passe-t-il si je ne renouvelle pas ?',
    a: 'Votre adhésion s\'arrête simplement à la fin de l\'année civile. Aucun engagement automatique, aucune reconduction tacite.',
  },
];

export function AdhererFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="relative py-14 lg:py-16 bg-gray-50">
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
                className="bg-white rounded-xl border border-gray-100 overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left hover:bg-gray-50 transition"
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