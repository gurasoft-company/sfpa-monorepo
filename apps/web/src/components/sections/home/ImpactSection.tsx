import { Users, Leaf, Globe2 } from 'lucide-react';
import { Container } from '@/components/layout/Container';

const IMPACTS = [
  {
    icon: Users,
    label: 'Impact humain',
    title: '1 jeune formé',
    text: "= 1 famille qui choisit de rester et de bâtir son avenir au village.",
  },
  {
    icon: Leaf,
    label: 'Impact environnemental',
    title: '1 Terre protégée',
    text: "= 1 communauté stable, durable, autonome, respectueuse du vivant.",
  },
  {
    icon: Globe2,
    label: 'Impact global',
    title: '2 continents reliés',
    text: "= 1 pont de fraternité et d'avenir partagé entre l'Europe et l'Afrique.",
  },
];

export function ImpactSection() {
  return (
    <section className="relative py-14 lg:py-16 bg-gray-50">
      <Container>
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="text-[10px] font-semibold uppercase tracking-[0.25em] text-sfpa-olive mb-3">
            Ce que notre action produit
          </div>
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-sfpa-anthracite mb-3 leading-tight">
            Une jeunesse debout,{' '}
            <span className="text-sfpa-olive">une Terre respectée</span>
          </h2>
          <div className="w-10 h-0.5 bg-sfpa-ocre mx-auto mb-4" />
          <p className="text-sm text-gray-600 leading-relaxed">
            Notre engagement humanitaire et environnemental produit des effets profonds, bien au-delà de ce que nous imaginions.
          </p>
        </div>

        {/* 3 cartes — fond blanc, seuls les cercles + titres sont en vert */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto mb-10">
          {IMPACTS.map((imp, i) => {
            const Icon = imp.icon;
            return (
              <article
                key={i}
                className="bg-white rounded-xl border border-gray-100 hover:shadow-md transition-all duration-300 p-6 flex flex-col text-center"
              >
                {/* Cercle vert autour de l'icône */}
                <div className="w-12 h-12 rounded-full bg-sfpa-olive text-white flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-5 h-5" />
                </div>

                {/* Label */}
                <div className="text-[10px] uppercase tracking-[0.22em] font-semibold text-gray-400 mb-2">
                  {imp.label}
                </div>

                {/* Titre en vert */}
                <div className="text-base font-bold text-sfpa-olive mb-2 leading-snug">
                  {imp.title}
                </div>

                {/* Description neutre */}
                <p className="text-[13.5px] text-gray-500 leading-relaxed flex-grow">
                  {imp.text}
                </p>
              </article>
            );
          })}
        </div>

        {/* Rectangle bas en vert */}
        <div className="max-w-3xl mx-auto">
          <div className="p-5 rounded-xl bg-sfpa-olive text-white">
            <p className="text-[13.5px] italic leading-relaxed text-center text-white/95">
              Ce ne sont pas nos combats : ce sont les <strong className="not-italic text-white">conséquences naturelles</strong> d'une action menée avec cohérence — prendre soin des Hommes et de la Terre, ensemble.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}