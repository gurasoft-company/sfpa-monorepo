import { Container } from '@/components/layout/Container';
import { MemberForm } from '@/components/forms/MemberForm';

export function MemberFormSection() {
  return (
    <section id="formulaire" className="relative py-14 lg:py-16 bg-white scroll-mt-24">
      <Container>
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="text-[10px] font-semibold uppercase tracking-[0.25em] text-sfpa-olive mb-3">
              Formulaire d'adhésion
            </div>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-sfpa-anthracite mb-3 leading-tight">
              Rejoignez <span className="text-sfpa-olive">SFPA</span>
            </h2>
            <div className="w-10 h-0.5 bg-sfpa-ocre mx-auto mb-4" />
            <p className="text-sm text-gray-600 leading-relaxed max-w-xl mx-auto">
              Remplissez ce formulaire pour adhérer. Nous vous recontacterons
              rapidement pour finaliser votre adhésion et vous transmettre
              les modalités de paiement.
            </p>
          </div>

          {/* Form */}
          <div className="bg-gray-50 rounded-2xl border border-gray-100 p-6 lg:p-8">
            <MemberForm />
          </div>
        </div>
      </Container>
    </section>
  );
}