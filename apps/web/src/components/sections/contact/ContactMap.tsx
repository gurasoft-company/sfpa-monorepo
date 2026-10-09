import { Container } from '@/components/layout/Container';

export function ContactMap() {
  return (
    <section className="relative py-14 lg:py-16 bg-white">
      <Container>
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="text-[10px] font-semibold uppercase tracking-[0.25em] text-sfpa-olive mb-3">
            Nous trouver
          </div>
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-sfpa-anthracite mb-3 leading-tight">
            Où nous <span className="text-sfpa-olive">rencontrer</span>
          </h2>
          <div className="w-10 h-0.5 bg-sfpa-ocre mx-auto" />
        </div>

        <div className="max-w-4xl mx-auto rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
          <iframe
            title="Localisation SFPA"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2883.4971614084!2d5.093995316!3d43.6403289791!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12b5fb2e05e7b9cd%3A0x40819a5fdc2a1f0!2s47%20Rue%20de%20Lisbonne%2C%2013300%20Salon-de-Provence!5e0!3m2!1sfr!2sfr!4v1234567890"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full"
          />
        </div>

        <p className="text-center text-[13px] text-gray-500 mt-4 max-w-2xl mx-auto">
          📍 47 rue de Lisbonne, 13300 Salon-de-Provence — France
        </p>
      </Container>
    </section>
  );
}