'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Container } from '@/components/layout/Container';

const FAQ = [
  {
    q: 'Dans quels délais répondez-vous ?',
    a: 'Nous répondons à tous les messages sous 24 à 48 heures ouvrées. Pour les demandes urgentes, privilégiez le téléphone.',
  },
  {
    q: 'Puis-je proposer un partenariat ?',
    a: 'Oui, avec plaisir. Précisez dans le message le type de partenariat envisagé (école, entreprise, collectivité, association). Nous vous recontacterons pour échanger.',
  },
  {
    q: 'Je souhaite devenir bénévole, comment faire ?',
    a: 'Le plus simple est de remplir le formulaire dédié sur la page "Devenir bénévole". Sinon, écrivez-nous avec vos compétences et disponibilités.',
  },
  {
    q: 'Organisez-vous des événements publics ?',
    a: 'Oui, nous organisons régulièrement des rencontres, ateliers et événements. Inscrivez-vous à notre newsletter pour ne rien manquer.',
  },
  {
    q: 'Comment faire un don ?',
    a: 'Rendez-vous sur la page "Faire un don" pour découvrir les différentes façons de soutenir nos actions (CB, virement, chèque).',
  },
];

export function ContactFAQ() {
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