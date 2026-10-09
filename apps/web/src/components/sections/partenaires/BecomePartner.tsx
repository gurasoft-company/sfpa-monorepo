import Link from 'next/link';
import { Handshake, ArrowRight } from 'lucide-react';
import { Container } from '@/components/layout/Container';

export function BecomePartner() {
  return (
    <section className="relative py-12 lg:py-14 bg-white">
      <Container>
        <div className="max-w-4xl mx-auto bg-sfpa-olive rounded-2xl p-8 md:p-12 text-white shadow-lg relative overflow-hidden">
          {/* Halos */}
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-56 h-56 bg-sfpa-ocre/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            {/* Icône */}
            <div className="flex justify-center md:justify-start">
              <div className="w-20 h-20 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center ring-1 ring-white/20">
                <Handshake className="w-9 h-9 text-white" />
              </div>
            </div>

            {/* Contenu */}
            <div className="md:col-span-2">
              <div className="text-[10px] font-semibold uppercase tracking-[0.25em] text-sfpa-ocre mb-3">
                Devenir partenaire
              </div>
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-4 leading-tight">
                Construisons quelque chose{' '}
                <span className="text-sfpa-ocre">ensemble</span>
              </h2>
              <p className="text-[14.5px] text-white/90 leading-relaxed mb-5">
                Vous êtes une école, une entreprise, une collectivité ou une
                association ? Rejoignez notre réseau de partenaires engagés
                pour la jeunesse, la santé et l'environnement.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 text-sfpa-ocre text-[11px] font-semibold uppercase tracking-wider hover:gap-2.5 transition-all"
              >
                Nous contacter
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}