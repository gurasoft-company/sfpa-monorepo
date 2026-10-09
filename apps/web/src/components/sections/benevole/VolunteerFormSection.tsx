import { Container } from '@/components/layout/Container';
import { VolunteerForm } from '@/components/forms/VolunteerForm';

export function VolunteerFormSection() {
  return (
    <section className="relative py-14 lg:py-16 bg-white">
      <Container>
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="text-[10px] font-semibold uppercase tracking-[0.25em] text-sfpa-olive mb-3">
              Candidature
            </div>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-sfpa-anthracite mb-3 leading-tight">
              Rejoignez nos <span className="text-sfpa-olive">bénévoles</span>
            </h2>
            <div className="w-10 h-0.5 bg-sfpa-ocre mx-auto mb-4" />
            <p className="text-sm text-gray-600 leading-relaxed max-w-xl mx-auto">
              Remplissez ce formulaire pour nous faire part de votre
              motivation et de vos compétences. Nous vous recontacterons
              rapidement pour échanger.
            </p>
          </div>

          {/* Form */}
          <div className="bg-gray-50 rounded-2xl border border-gray-100 p-6 lg:p-8">
            <VolunteerForm />
          </div>
        </div>
      </Container>
    </section>
  );
}