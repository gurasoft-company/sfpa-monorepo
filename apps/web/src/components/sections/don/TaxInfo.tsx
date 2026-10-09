import { Container } from '@/components/layout/Container';

export function TaxInfo() {
  return (
    <section className="relative py-14 lg:py-16 bg-white">
      <Container>
        <div className="max-w-4xl mx-auto bg-sfpa-olive text-white rounded-2xl p-8 md:p-12 shadow-lg relative overflow-hidden">
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none" />

          <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            <div className="flex justify-center md:justify-start">
              <div className="w-20 h-20 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center ring-1 ring-white/20">
                <span className="text-3xl font-bold text-sfpa-ocre">66%</span>
              </div>
            </div>

            <div className="md:col-span-2">
              <div className="text-[10px] font-semibold uppercase tracking-[0.25em] text-sfpa-ocre mb-3">
                Avantage fiscal
              </div>
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-4 leading-tight">
                Un don de 100 € vous coûte{' '}
                <span className="text-sfpa-ocre">réellement 34 €</span>
              </h2>
              <p className="text-[14.5px] text-white/90 leading-relaxed">
                Bénéficiez d'une réduction d'impôt de <strong>66 %</strong> dans
                la limite de 20 % du revenu imposable. Un reçu fiscal vous sera
                adressé automatiquement pour votre déclaration.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}