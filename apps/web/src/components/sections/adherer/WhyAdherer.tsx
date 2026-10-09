import { Vote, Newspaper, Users, ShieldCheck } from 'lucide-react';
import { Container } from '@/components/layout/Container';

const REASONS = [
  {
    icon: Vote,
    title: 'Voix à l\'AG',
    text: 'Vous votez sur les orientations stratégiques de l\'association lors de l\'assemblée générale annuelle.',
  },
  {
    icon: Newspaper,
    title: 'Actualités en avant-première',
    text: 'Vous recevez la newsletter, les rapports et les informations réservées aux membres.',
  },
  {
    icon: Users,
    title: 'Participation active',
    text: 'Vous pouvez rejoindre les commissions, les projets, et participer aux décisions collectives.',
  },
  {
    icon: ShieldCheck,
    title: 'Soutien financier stable',
    text: 'Votre cotisation annuelle finance le fonctionnement et garantit la pérennité de nos actions.',
  },
];

export function WhyAdherer() {
  return (
    <section className="relative py-14 lg:py-16 bg-white">
      <Container>
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="text-[10px] font-semibold uppercase tracking-[0.25em] text-sfpa-olive mb-3">
            Pourquoi adhérer
          </div>
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-sfpa-anthracite mb-3 leading-tight">
            Plus qu'un don, un <span className="text-sfpa-olive">engagement</span>
          </h2>
          <div className="w-10 h-0.5 bg-sfpa-ocre mx-auto mb-4" />
          <p className="text-sm text-gray-600 leading-relaxed">
            Adhérer, c'est faire partie de l'association. C'est participer
            à ses décisions, à sa vie, à son avenir.
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