import Link from 'next/link';
import { ArrowRight, Stethoscope } from 'lucide-react';
import { Container } from '@/components/layout/Container';

export function HealthSection() {
  return (
    <section className="relative py-14 lg:py-16 bg-gray-50">
      <Container>
        <div className="max-w-4xl mx-auto bg-sfpa-olive text-white rounded-2xl p-8 md:p-12 shadow-lg relative overflow-hidden">
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none" />

          <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            <div className="flex justify-center md:justify-start">
              <div className="w-20 h-20 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center ring-1 ring-white/20">
                <Stethoscope className="w-9 h-9 text-white" />
              </div>
            </div>

            <div className="md:col-span-2">
              <div className="text-[10px] font-semibold uppercase tracking-[0.25em] text-sfpa-ocre mb-3">
                La santé pour tous
              </div>
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-4 leading-tight">
                Soigner, c'est aussi une forme de{' '}
                <span className="text-sfpa-ocre">fraternité</span>
              </h2>
              <p className="text-[14.5px] text-white/90 leading-relaxed mb-5">
                SFPA fédère des professionnels de santé bénévoles — médecins, infirmiers,
                sages-femmes, spécialistes — qui mettent leurs compétences au service des
                populations africaines. Consultations, dépistages, formation du personnel
                local : la santé est un pilier à part entière de notre action.
              </p>
              <Link
                href="/devenir-benevole"
                className="inline-flex items-center gap-1.5 text-sfpa-ocre text-[11px] font-semibold uppercase tracking-wider hover:gap-2.5 transition-all"
              >
                Devenir soignant bénévole
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}