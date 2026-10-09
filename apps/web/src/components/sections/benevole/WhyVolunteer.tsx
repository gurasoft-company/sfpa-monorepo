import { Globe2, Users, Sparkles, Heart } from 'lucide-react';
import { Container } from '@/components/layout/Container';

const REASONS = [
  {
    icon: Globe2,
    title: 'Impact concret',
    text: 'Votre savoir-faire se transforme immédiatement en compétences utiles pour des jeunes qui n\'avaient rien.',
  },
  {
    icon: Users,
    title: 'Rencontres humaines',
    text: 'Vous tissez des liens forts avec des communautés, des bénévoles, des partenaires locaux.',
  },
  {
    icon: Sparkles,
    title: 'Transmission valorisante',
    text: 'Transmettre, c\'est laisser une trace. Votre métier devient un héritage vivant.',
  },
  {
    icon: Heart,
    title: 'Sens et fierté',
    text: 'Contribuer à un monde plus juste et durable, à votre échelle, avec vos mains.',
  },
];

export function WhyVolunteer() {
  return (
    <section className="relative py-14 lg:py-16 bg-white">
      <Container>
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="text-[10px] font-semibold uppercase tracking-[0.25em] text-sfpa-olive mb-3">
            Pourquoi nous rejoindre
          </div>
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-sfpa-anthracite mb-3 leading-tight">
            Ce que le bénévolat <span className="text-sfpa-olive">vous apporte</span>
          </h2>
          <div className="w-10 h-0.5 bg-sfpa-ocre mx-auto mb-4" />
          <p className="text-sm text-gray-600 leading-relaxed">
            Le bénévolat n'est pas un don de soi. C'est un échange qui
            vous enrichit autant qu'il aide les autres.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {REASONS.map((reason, i) => {
            const Icon = reason.icon;
            return (
              <div
                key={i}
                className="bg-white rounded-2xl border border-gray-100 hover:border-sfpa-olive/30 hover:shadow-md transition-all duration-300 p-6 flex flex-col text-center"
              >
                <div className="w-12 h-12 rounded-full bg-sfpa-olive text-white flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-[15px] font-bold text-sfpa-olive mb-2 leading-snug">
                  {reason.title}
                </h3>
                <p className="text-[13px] text-gray-500 leading-relaxed flex-grow">
                  {reason.text}
                </p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}