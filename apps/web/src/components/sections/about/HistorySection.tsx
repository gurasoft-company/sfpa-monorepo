import { Container } from '@/components/layout/Container';

const TIMELINE = [
  {
    year: '2021',
    title: 'Création à Salon-de-Provence',
    text: "Naissance de SFPA, portée par un collectif de bénévoles provençaux désireux d'agir concrètement en Afrique.",
  },
  {
    year: '2022-2023',
    title: 'Premiers partenariats',
    text: 'Rencontres avec des communautés locales au Togo. Premières missions de terrain, premières formations.',
  },
  {
    year: '2024',
    title: 'Réorientation stratégique',
    text: "SFPA affirme son ADN : un trait d'union entre l'humanitaire et l'environnement. Formation, santé et Terre deviennent indissociables.",
  },
  {
    year: '2026',
    title: 'Lancement du pôle formation',
    text: 'Ouverture du programme structuré de formation professionnelle : agriculture moderne, agroécologie, design intérieur, mécanique auto, énergie solaire.',
  },
];

export function HistorySection() {
  return (
    <section className="relative py-14 lg:py-16 bg-gray-50">
      <Container>
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="text-[10px] font-semibold uppercase tracking-[0.25em] text-sfpa-olive mb-3">
            Notre histoire
          </div>
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-sfpa-anthracite mb-3 leading-tight">
            De 2021 à <span className="text-sfpa-olive">aujourd'hui</span>
          </h2>
          <div className="w-10 h-0.5 bg-sfpa-ocre mx-auto" />
        </div>

        <div className="max-w-3xl mx-auto relative">
          <div className="absolute left-4 md:left-1/2 top-2 bottom-2 w-px bg-sfpa-olive/20 md:-translate-x-1/2" />

          <div className="space-y-6">
            {TIMELINE.map((item, i) => (
              <div
                key={i}
                className={`relative flex gap-5 md:gap-0 ${
                  i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                <div className="absolute left-4 md:left-1/2 top-5 -translate-x-1/2 w-3 h-3 rounded-full bg-sfpa-olive ring-4 ring-gray-50 z-10" />
                <div className="hidden md:block md:w-1/2" />
                <div className={`pl-12 md:pl-0 md:w-1/2 ${i % 2 === 0 ? 'md:pr-10' : 'md:pl-10'}`}>
                  <div className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-md transition-shadow">
                    <div className="inline-block px-2.5 py-0.5 rounded-full bg-sfpa-olive/10 text-sfpa-olive text-[10px] font-bold uppercase tracking-wider mb-2">
                      {item.year}
                    </div>
                    <h3 className="text-[15px] font-bold text-sfpa-anthracite mb-1.5 leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-[13.5px] text-gray-500 leading-relaxed">
                      {item.text}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}