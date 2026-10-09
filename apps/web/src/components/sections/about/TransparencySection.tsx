import { Container } from '@/components/layout/Container';

const REPARTITION = [
  { value: '75 %', label: 'Projets de terrain' },
  { value: '15 %', label: 'Fonctionnement' },
  { value: '10 %', label: 'Communication' },
];

export function TransparencySection() {
  return (
    <section className="relative py-14 lg:py-16 bg-white">
      <Container>
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="text-[10px] font-semibold uppercase tracking-[0.25em] text-sfpa-olive mb-3">
            Transparence
          </div>
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-sfpa-anthracite mb-3 leading-tight">
            Où va <span className="text-sfpa-olive">votre soutien</span>
          </h2>
          <div className="w-10 h-0.5 bg-sfpa-ocre mx-auto" />
        </div>

        <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
          {REPARTITION.map((item, i) => (
            <div key={i} className="bg-gray-50 rounded-xl border border-gray-100 p-6 text-center">
              <div className="text-3xl font-bold text-sfpa-olive mb-1">{item.value}</div>
              <div className="text-[11px] uppercase tracking-wider text-gray-500 font-semibold">
                {item.label}
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-[13px] text-gray-500 mt-6 max-w-2xl mx-auto">
          Nos comptes sont disponibles sur simple demande. Rapport annuel
          téléchargeable prochainement.
        </p>
      </Container>
    </section>
  );
}