import { Check } from 'lucide-react';
import { Container } from '@/components/layout/Container';

const TYPES = [
  {
    name: 'Actif',
    price: '20 €',
    period: '/ an',
    description: 'Pour celles et ceux qui veulent participer activement à la vie de SFPA.',
    features: [
      'Voix délibérative à l\'AG',
      'Accès aux commissions',
      'Newsletter trimestrielle',
      'Rapport annuel',
    ],
    highlighted: false,
  },
  {
    name: 'Bienfaiteur',
    price: '100 €',
    period: '/ an',
    description: 'Pour celles et ceux qui veulent soutenir plus fortement nos actions.',
    features: [
      'Tous les avantages du membre actif',
      'Reçu fiscal (66 % déductible)',
      'Mise en avant dans le rapport annuel',
      'Invitation aux événements privés',
    ],
    highlighted: true,
  },
  {
    name: 'Honneur',
    price: 'Sur décision du CA',
    period: '',
    description: 'Pour reconnaître des services rendus à l\'association.',
    features: [
      'Titre honorifique',
      'Voix consultative à l\'AG',
      'Reconnaissance officielle',
      'Participation aux grands événements',
    ],
    highlighted: false,
  },
];

export function MembershipTypes() {
  return (
    <section className="relative py-14 lg:py-16 bg-gray-50">
      <Container>
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="text-[10px] font-semibold uppercase tracking-[0.25em] text-sfpa-olive mb-3">
            Types d'adhésion
          </div>
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-sfpa-anthracite mb-3 leading-tight">
            Choisissez votre <span className="text-sfpa-olive">formule</span>
          </h2>
          <div className="w-10 h-0.5 bg-sfpa-ocre mx-auto mb-4" />
          <p className="text-sm text-gray-600 leading-relaxed">
            Trois niveaux d'engagement pour vous permettre de soutenir SFPA
            selon vos moyens et vos envies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {TYPES.map((type, i) => (
            <div
              key={i}
              className={`relative rounded-2xl border p-7 flex flex-col transition-all duration-300 ${
                type.highlighted
                  ? 'bg-sfpa-olive text-white border-sfpa-olive shadow-lg md:-translate-y-2'
                  : 'bg-white border-gray-100 hover:border-sfpa-olive/30 hover:shadow-md'
              }`}
            >
              {/* Badge populaire */}
              {type.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-sfpa-ocre text-sfpa-anthracite text-[10px] font-bold uppercase tracking-[0.15em] shadow-md">
                  Recommandé
                </div>
              )}

              {/* Nom */}
              <div className={`text-[11px] font-semibold uppercase tracking-[0.2em] mb-3 ${
                type.highlighted ? 'text-sfpa-ocre' : 'text-sfpa-olive'
              }`}>
                Membre {type.name}
              </div>

              {/* Prix */}
              <div className="flex items-baseline gap-2 mb-3">
                <span className={`text-3xl font-bold leading-none ${
                  type.highlighted ? 'text-white' : 'text-sfpa-anthracite'
                }`}>
                  {type.price}
                </span>
                {type.period && (
                  <span className={`text-sm ${
                    type.highlighted ? 'text-white/70' : 'text-gray-500'
                  }`}>
                    {type.period}
                  </span>
                )}
              </div>

              {/* Description */}
              <p className={`text-[13px] leading-relaxed mb-5 ${
                type.highlighted ? 'text-white/85' : 'text-gray-600'
              }`}>
                {type.description}
              </p>

              {/* Features */}
              <ul className={`space-y-2.5 text-[13px] pt-5 border-t mb-6 flex-grow ${
                type.highlighted ? 'border-white/15 text-white/90' : 'border-gray-100 text-gray-600'
              }`}>
                {type.features.map((feature, j) => (
                  <li key={j} className="flex gap-2.5 items-start">
                    <Check className={`w-3.5 h-3.5 mt-0.5 flex-shrink-0 ${
                      type.highlighted ? 'text-sfpa-ocre' : 'text-sfpa-olive'
                    }`} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <a
                href="#formulaire"
                className={`inline-flex items-center justify-center font-semibold py-3 rounded-full transition text-[13px] ${
                  type.highlighted
                    ? 'bg-white text-sfpa-olive hover:bg-sfpa-sable'
                    : 'bg-sfpa-olive text-white hover:bg-sfpa-olive/90'
                }`}
              >
                Choisir cette formule
              </a>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}