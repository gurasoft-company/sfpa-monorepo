import { Container } from '@/components/layout/Container';
import { ContactForm } from '@/components/forms/ContactForm';

export function ContactFormSection() {
  return (
    <section className="relative py-14 lg:py-16 bg-gray-50">
      <Container>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <div className="text-[10px] font-semibold uppercase tracking-[0.25em] text-sfpa-olive mb-3">
              Écrivez-nous
            </div>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-sfpa-anthracite mb-3 leading-tight">
              Envoyez-nous un <span className="text-sfpa-olive">message</span>
            </h2>
            <div className="w-10 h-0.5 bg-sfpa-ocre mx-auto mb-4" />
            <p className="text-sm text-gray-600 leading-relaxed max-w-xl mx-auto">
              Remplissez le formulaire ci-dessous. Nous vous répondrons dans les 24 à 48 heures.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-6 lg:p-8 shadow-sm">
            <ContactForm />
          </div>
        </div>
      </Container>
    </section>
  );
}