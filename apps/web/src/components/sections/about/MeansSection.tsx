import { Users, Globe2, Heart } from 'lucide-react';
import { Container } from '@/components/layout/Container';

const MOYENS = [
  {
    icon: Users,
    title: 'Bénévoles de France',
    text: 'Artisans, ingénieurs, agriculteurs, médecins, soignants — ils transmettent leur métier sur le terrain.',
  },
  {
    icon: Globe2,
    title: 'Partenariats locaux',
    text: 'Écoles, entreprises, collectivités, associations africaines et provençales construisent ensemble.',
  },
  {
    icon: Heart,
    title: 'Financements solidaires',
    text: 'Dons, adhésions et subventions financent les formations, les soins et les équipements.',
  },
];

export function MeansSection() {
  return (
    <section className="relative py-14 lg:py-16 bg-white">
      <Container>
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="text-[10px] font-semibold uppercase tracking-[0.25em] text-sfpa-olive mb-3">
            Nos moyens d'action
          </div>
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-sfpa-anthracite mb-3 leading-tight">
            Comment nous <span className="text-sfpa-olive">agissons</span>
          </h2>
          <div className="w-10 h-0.5 bg-sfpa-ocre mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {MOYENS.map((moyen, i) => {
            const Icon = moyen.icon;
            return (
              <div
                key={i}
                className="bg-gray-50 rounded-xl border border-gray-100 p-6 flex flex-col"
              >
                <div className="w-11 h-11 rounded-full bg-sfpa-olive text-white flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-[15px] font-bold text-sfpa-olive mb-2 leading-snug">
                  {moyen.title}
                </h3>
                <p className="text-[13.5px] text-gray-500 leading-relaxed flex-grow">
                  {moyen.text}
                </p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}