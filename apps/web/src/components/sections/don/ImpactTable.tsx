import { Container } from '@/components/layout/Container';

const IMPACTS = [
  { amount: '20 €', label: 'Fournitures pédagogiques pour 1 jeune' },
  { amount: '50 €', label: '1 semaine de formation pour 1 jeune' },
  { amount: '100 €', label: '1 kit d\'agroécologie complet' },
  { amount: '500 €', label: '1 mois de formation pour 10 jeunes' },
];

export function ImpactTable() {
  return (
    <section className="relative py-14 lg:py-16 bg-white">
      <Container>
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="text-[10px] font-semibold uppercase tracking-[0.25em] text-sfpa-olive mb-3">
            Votre impact
          </div>
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-sfpa-anthracite mb-3 leading-tight">
            Ce que votre don <span className="text-sfpa-olive">finance</span>
          </h2>
          <div className="w-10 h-0.5 bg-sfpa-ocre mx-auto mb-4" />
          <p className="text-sm text-gray-600 leading-relaxed">
            Chaque euro que vous confiez à SFPA est utilisé concrètement
            sur le terrain. Voici ce qu'il permet de financer.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {IMPACTS.map((impact, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border border-gray-100 hover:border-sfpa-olive/30 hover:shadow-md transition-all duration-300 p-6 flex flex-col text-center"
            >
              <div className="text-2xl md:text-3xl font-bold text-sfpa-olive mb-3 leading-none">
                {impact.amount}
              </div>
              <div className="w-8 h-0.5 bg-sfpa-ocre mx-auto mb-3" />
              <p className="text-[13px] text-gray-600 leading-relaxed flex-grow">
                {impact.label}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}