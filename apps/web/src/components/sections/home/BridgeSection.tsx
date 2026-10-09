import { Container } from '@/components/layout/Container';

const VECTEURS = [
  {
    emoji: '🗣️',
    title: 'Langues & cultures',
    text: "Enseignement des langues africaines à ceux qui se préparent à retourner aux sources. Un pont pour les entreprises provençales qui s'implantent en Afrique.",
  },
  {
    emoji: '🎭',
    title: 'Échanges culturels',
    text: "Musique, danse, contes, mémoire. Parce que se connaître, c'est se reconnaître. Les Provençaux découvrent une part d'eux-mêmes.",
  },
  {
    emoji: '🛠️',
    title: 'Savoir-faire artisanaux',
    text: "Métiers d'art de Provence et savoir-faire africains dialoguent. Chaque tradition ouvre de nouvelles opportunités des deux côtés.",
  },
];

export function BridgeSection() {
  return (
    <section className="relative py-14 lg:py-16 bg-white">
      <Container>
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="text-[10px] font-semibold uppercase tracking-[0.25em] text-sfpa-olive mb-3">
            Un pont dans les deux sens
          </div>
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-sfpa-anthracite mb-3 leading-tight">
            Deux continents,{' '}
            <span className="text-sfpa-olive">un même avenir</span>
          </h2>
          <div className="w-10 h-0.5 bg-sfpa-ocre mx-auto mb-4" />
          <p className="text-sm text-gray-600 leading-relaxed">
            SFPA met en dialogue deux terres, deux cultures, deux héritages. Chacune s'enrichit de l'autre.
          </p>
        </div>

        {/* Visuel du pont */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="grid grid-cols-3 items-center gap-3">
            <div className="text-center">
              <div className="w-14 h-14 mx-auto rounded-full bg-sfpa-olive flex items-center justify-center text-white text-xl shadow-sm mb-2.5">
                🇫🇷
              </div>
              <div className="font-semibold text-sfpa-anthracite text-[14px]">Provence</div>
              <div className="text-[10px] text-gray-400 uppercase tracking-widest mt-0.5">Europe</div>
            </div>

            <div className="relative">
              <div className="h-0.5 bg-gradient-to-r from-sfpa-olive via-sfpa-ocre to-sfpa-olive rounded-full" />
              <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 top-0 bg-white px-2.5 py-1 rounded-full border border-sfpa-ocre/40">
                <span className="text-[9px] font-bold text-sfpa-ocre uppercase tracking-[0.15em]">SFPA</span>
              </div>
            </div>

            <div className="text-center">
              <div className="w-14 h-14 mx-auto rounded-full bg-sfpa-olive flex items-center justify-center text-white text-xl shadow-sm mb-2.5">
                🌍
              </div>
              <div className="font-semibold text-sfpa-anthracite text-[14px]">Afrique</div>
              <div className="text-[10px] text-gray-400 uppercase tracking-widest mt-0.5">Berceau</div>
            </div>
          </div>
        </div>

        {/* 3 vecteurs — cartes vertes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto mb-12">
          {VECTEURS.map((v, i) => (
            <article
              key={i}
              className="group relative bg-sfpa-olive text-white rounded-xl border border-sfpa-olive hover:shadow-lg transition-all duration-300 p-6 flex flex-col overflow-hidden"
            >
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/5 rounded-full blur-2xl pointer-events-none" />

              <div className="relative text-2xl mb-3">{v.emoji}</div>

              <h3 className="relative text-base font-bold text-white mb-2 leading-snug">
                {v.title}
              </h3>

              <p className="relative text-[13.5px] text-white/85 leading-relaxed flex-grow">
                {v.text}
              </p>
            </article>
          ))}
        </div>

        {/* Bénéfices mutuels — cartes VERTES aussi */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
          {/* Provence */}
          <article className="group relative bg-sfpa-olive text-white rounded-xl border border-sfpa-olive hover:shadow-lg transition-all duration-300 p-6 overflow-hidden">
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/5 rounded-full blur-2xl pointer-events-none" />

            <div className="relative flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center text-base ring-1 ring-white/20">
                🇫🇷
              </div>
              <h3 className="text-[15px] font-bold text-white">
                Ce que la Provence y gagne
              </h3>
            </div>

            <ul className="relative space-y-2.5 text-[13.5px] text-white/90 leading-relaxed">
              <li className="flex gap-2.5 items-start">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-sfpa-ocre flex-shrink-0" />
                <span>Un partenaire économique fiable pour les entreprises provençales.</span>
              </li>
              <li className="flex gap-2.5 items-start">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-sfpa-ocre flex-shrink-0" />
                <span>Une Méditerranée plus apaisée, moins de détresse humaine.</span>
              </li>
              <li className="flex gap-2.5 items-start">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-sfpa-ocre flex-shrink-0" />
                <span>Des échanges culturels qui enrichissent la Provence.</span>
              </li>
              <li className="flex gap-2.5 items-start">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-sfpa-ocre flex-shrink-0" />
                <span>Un pont durable, équilibré, respectueux.</span>
              </li>
            </ul>
          </article>

          {/* Afrique */}
          <article className="group relative bg-sfpa-olive text-white rounded-xl border border-sfpa-olive hover:shadow-lg transition-all duration-300 p-6 overflow-hidden">
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/5 rounded-full blur-2xl pointer-events-none" />

            <div className="relative flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center text-base ring-1 ring-white/20">
                🌍
              </div>
              <h3 className="text-[15px] font-bold text-white">
                Ce que l'Afrique y gagne
              </h3>
            </div>

            <ul className="relative space-y-2.5 text-[13.5px] text-white/90 leading-relaxed">
              <li className="flex gap-2.5 items-start">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-sfpa-ocre flex-shrink-0" />
                <span>Des formations adaptées aux besoins locaux identifiés.</span>
              </li>
              <li className="flex gap-2.5 items-start">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-sfpa-ocre flex-shrink-0" />
                <span>Des savoir-faire transmis dans le respect des réalités.</span>
              </li>
              <li className="flex gap-2.5 items-start">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-sfpa-ocre flex-shrink-0" />
                <span>Des échanges économiques équitables, pas une aide descendante.</span>
              </li>
              <li className="flex gap-2.5 items-start">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-sfpa-ocre flex-shrink-0" />
                <span>Une dignité retrouvée : vivre de son travail, dans son pays.</span>
              </li>
            </ul>
          </article>
        </div>
      </Container>
    </section>
  );
}