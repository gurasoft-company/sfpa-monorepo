import { Container } from '@/components/layout/Container';

const STATS = [
  { value: '50', label: 'Jeunes formés', color: 'terra' },
  { value: '3', label: "Pays d'intervention", color: 'olive' },
  { value: '2', label: 'Continents reliés', color: 'ocre' },
  { value: '100%', label: 'Bénévoles engagés', color: 'bleu' },
];

const COLORS: Record<string, string> = {
  terra: 'text-sfpa-terra',
  olive: 'text-sfpa-olive',
  ocre: 'text-sfpa-ocre',
  bleu: 'text-sfpa-bleu',
};

export function StatsSection() {
  return (
    <section className="py-8 lg:py-10 bg-white border-y border-gray-300">
      <Container>
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-gray-200">
          {STATS.map((stat, i) => (
            <div key={i} className="px-4 py-2 text-center">
              <div className={`text-2xl md:text-3xl lg:text-4xl font-bold mb-1 ${COLORS[stat.color]}`}>
                {stat.value}
              </div>
              <div className="text-[11px] md:text-xs text-gray-500 uppercase tracking-wider font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}