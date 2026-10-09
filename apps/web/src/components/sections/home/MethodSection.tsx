import { Container } from '@/components/layout/Container';

const STEPS = [
  {
    step: '01',
    title: 'Écouter',
    text: "Rencontrer les communautés et identifier leurs besoins réels — pas ceux qu'on imagine pour eux.",
  },
  {
    step: '02',
    title: 'Concevoir',
    text: "Bâtir des formations adaptées au climat, aux ressources et aux débouchés locaux.",
  },
  {
    step: '03',
    title: 'Former',
    text: "Transmettre un savoir-faire concret : 80 % de pratique, 20 % de théorie.",
  },
  {
    step: '04',
    title: 'Accompagner',
    text: "Suivre chaque jeune jusqu'à l'insertion ou la création de son activité.",
  },
];

export function MethodSection() {
  return (
    <section className="relative py-14 lg:py-16 bg-white">
      <Container>
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="text-[10px] font-semibold uppercase tracking-[0.25em] text-sfpa-olive mb-3">
            Notre méthode
          </div>
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-sfpa-anthracite mb-3 leading-tight">
            Nous partons du terrain,{' '}
            <span className="text-sfpa-olive">jamais d'en haut</span>
          </h2>
          <div className="w-10 h-0.5 bg-sfpa-ocre mx-auto mb-4" />
          <p className="text-sm text-gray-600 leading-relaxed">
            Les solutions durables naissent de l'écoute, pas de l'imposition.
          </p>
        </div>

        {/* 4 cartes vertes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {STEPS.map((item, i) => (
            <article
              key={i}
              className="group relative bg-sfpa-olive text-white rounded-xl border border-sfpa-olive hover:shadow-lg transition-all duration-300 p-6 flex flex-col overflow-hidden"
            >
              {/* Halo décoratif interne */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/5 rounded-full blur-2xl pointer-events-none" />

              {/* Numéro */}
              <div className="relative text-3xl font-bold text-sfpa-ocre mb-3 leading-none">
                {item.step}
              </div>

              {/* Titre */}
              <h3 className="relative text-base font-bold text-white mb-2 leading-snug">
                {item.title}
              </h3>

              {/* Description */}
              <p className="relative text-[13.5px] text-white/85 leading-relaxed flex-grow">
                {item.text}
              </p>

              {/* Barre de progression */}
              <div className="relative mt-4 h-0.5 bg-white/20 rounded-full overflow-hidden">
                <div
                  className="h-full bg-sfpa-ocre rounded-full transition-all duration-500"
                  style={{ width: `${(i + 1) * 25}%` }}
                />
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}