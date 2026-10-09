'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Container } from '@/components/layout/Container';

const FAQ = [
  {
    q: 'Faut-il être disponible longtemps ?',
    a: 'Non. Certaines missions sont ponctuelles (une semaine, un week-end) et d\'autres s\'étendent sur plusieurs mois. Nous nous adaptons à votre disponibilité.',
  },
  {
    q: 'Faut-il financer son déplacement ?',
    a: 'Selon les missions. Pour les missions courtes en Provence, aucun frais. Pour les missions en Afrique, une partie peut être prise en charge par l\'association ou par des partenaires. Nous en discutons au cas par cas.',
  },
  {
    q: 'Je ne suis pas un expert, puis-je aider ?',
    a: 'Oui. La logistique, la communication, la traduction, la collecte de matériel — toutes les bonnes volontés sont utiles.',
  },
  {
    q: 'Comment se passe la sélection ?',
    a: 'Un premier échange par téléphone ou visio, puis une rencontre si possible. Nous cherchons avant tout des personnes fiables et motivées.',
  },
  {
    q: 'Y a-t-il une formation préalable ?',
    a: 'Oui, une courte préparation est proposée avant chaque mission (contexte, culture, sécurité, logistique).',
  },
];

export function VolunteerFAQ() {
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