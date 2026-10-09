import { Container } from '@/components/layout/Container';
import { TestimonialForm } from '@/components/forms/TestimonialForm';

export function TestimonialFormSection() {
  return (
    <section className="relative py-14 lg:py-16 bg-white">
      <Container>
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="text-[10px] font-semibold uppercase tracking-[0.25em] text-sfpa-olive mb-3">
              À votre tour
            </div>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-sfpa-anthracite mb-3 leading-tight">
              Partagez votre <span className="text-sfpa-olive">témoignage</span>
            </h2>
            <div className="w-10 h-0.5 bg-sfpa-ocre mx-auto mb-4" />
            <p className="text-sm text-gray-600 leading-relaxed max-w-xl mx-auto">
              Vous avez bénéficié d'une formation, d'une mission, d'un échange
              avec SFPA ? Racontez-nous. Votre parole inspirera d'autres.
            </p>
          </div>

          {/* Form */}
          <div className="bg-gray-50 rounded-2xl border border-gray-100 p-6 lg:p-8">
            <TestimonialForm />
          </div>
        </div>
      </Container>
    </section>
  );
}