import Link from 'next/link';
import { Container } from '@/components/layout/Container';

export function AboutFinalCTA() {
  return (
    <section className="py-14 lg:py-16 bg-gray-50">
      <Container>
        <div className="relative bg-sfpa-olive rounded-2xl p-8 md:p-12 lg:p-14 text-white text-center shadow-lg overflow-hidden">
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-56 h-56 bg-sfpa-ocre/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative max-w-2xl mx-auto">
            <div className="text-[10px] font-semibold uppercase tracking-[0.25em] text-sfpa-ocre mb-3">
              Vous partagez nos valeurs ?
            </div>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-3 leading-tight">
              Rejoignez le <span className="text-sfpa-ocre">mouvement</span>
            </h2>
            <div className="w-10 h-0.5 bg-sfpa-ocre mx-auto mb-5" />
            <p className="text-sm md:text-base text-white/85 leading-relaxed mb-8">
              Chaque geste compte. Chaque euro forme un jeune. Chaque heure transmise change une vie.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/adherer"
                className="inline-flex items-center justify-center gap-2 bg-white text-sfpa-olive font-semibold px-6 py-3 rounded-full hover:bg-sfpa-sable transition shadow-sm text-sm"
              >
                Adhérer
              </Link>
              <Link
                href="/devenir-benevole"
                className="inline-flex items-center justify-center gap-2 border-2 border-white text-white font-semibold px-6 py-3 rounded-full hover:bg-white hover:text-sfpa-olive transition text-sm"
              >
                Devenir bénévole
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}