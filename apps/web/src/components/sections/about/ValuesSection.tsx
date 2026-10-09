import { HandHeart, Sprout, Wrench, ShieldCheck } from 'lucide-react';
import { Container } from '@/components/layout/Container';

const VALEURS = [
  {
    icon: HandHeart,
    title: 'Fraternité',
    text: "Personne n'est laissé de côté. Nous agissons avec et pour les communautés, dans le respect et l'écoute.",
  },
  {
    icon: Sprout,
    title: 'Respect du vivant',
    text: "La Terre est notre maison commune. Protéger l'eau, les sols, les forêts, c'est protéger l'Humanité.",
  },
  {
    icon: Wrench,
    title: 'Transmission',
    text: 'Le savoir-faire est une richesse. Nous transmettons des compétences concrètes, durables, utiles.',
  },
  {
    icon: ShieldCheck,
    title: 'Justice climatique',
    text: 'Les plus vulnérables sont les premiers touchés par le dérèglement climatique. Nous agissons pour eux.',
  },
];

export function ValuesSection() {
  return (
    <section className="relative py-14 lg:py-16 bg-gray-50">
      <Container>
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="text-[10px] font-semibold uppercase tracking-[0.25em] text-sfpa-olive mb-3">
            Nos valeurs
          </div>
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-sfpa-anthracite mb-3 leading-tight">
            Ce qui nous <span className="text-sfpa-olive">anime</span>
          </h2>
          <div className="w-10 h-0.5 bg-sfpa-ocre mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {VALEURS.map((valeur, i) => {
            const Icon = valeur.icon;
            return (
              <div
                key={i}
                className="bg-white rounded-xl border border-gray-100 hover:shadow-md transition-shadow p-6 flex flex-col text-center"
              >
                <div className="w-12 h-12 rounded-full bg-sfpa-olive text-white flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-sfpa-olive mb-2 leading-snug">
                  {valeur.title}
                </h3>
                <p className="text-[13px] text-gray-500 leading-relaxed flex-grow">
                  {valeur.text}
                </p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}