import { Container } from '@/components/layout/Container';
import { CreditCard, Building2, FileCheck } from 'lucide-react';

const WAYS = [
  {
    icon: Building2,
    title: 'Virement bancaire',
    text: 'Contactez-nous pour obtenir notre IBAN. Virement ponctuel ou mensuel.',
  },
  {
    icon: FileCheck,
    title: 'Chèque',
    text: 'À l\'ordre de SFPA, à envoyer à : 47 rue de Lisbonne, 13300 Salon-de-Provence.',
  },
  {
    icon: CreditCard,
    title: 'Legs & donations',
    text: 'Transmettez un patrimoine à une cause qui a du sens. Contactez-nous pour en parler.',
  },
];

export function OtherWaysToGive() {
  return (
    <section className="relative py-14 lg:py-16 bg-gray-50">
      <Container>
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="text-[10px] font-semibold uppercase tracking-[0.25em] text-sfpa-olive mb-3">
            Autres moyens de donner
          </div>
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-sfpa-anthracite mb-3 leading-tight">
            Donner, <span className="text-sfpa-olive">à votre façon</span>
          </h2>
          <div className="w-10 h-0.5 bg-sfpa-ocre mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {WAYS.map((way, i) => {
            const Icon = way.icon;
            return (
              <div
                key={i}
                className="bg-white rounded-2xl border border-gray-100 p-6 flex flex-col text-center hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 rounded-full bg-sfpa-olive text-white flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-[15px] font-bold text-sfpa-olive mb-2">
                  {way.title}
                </h3>
                <p className="text-[13px] text-gray-600 leading-relaxed flex-grow">
                  {way.text}
                </p>
              </div>
            );
          })}
        </div>

        <p className="text-center text-[13px] text-gray-500 mt-8 max-w-2xl mx-auto">
          Pour tout don ou pour toute question, contactez-nous à{' '}
          <a href="mailto:sofpra22@gmail.com" className="text-sfpa-olive font-semibold hover:underline">
            sofpra22@gmail.com
          </a>
          {' '}ou au{' '}
          <a href="tel:+33749912543" className="text-sfpa-olive font-semibold hover:underline">
            +33 7 49 91 25 43
          </a>.
        </p>
      </Container>
    </section>
  );
}