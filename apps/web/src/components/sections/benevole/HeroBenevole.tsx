import Image from 'next/image';
import { Container } from '@/components/layout/Container';

const HERO_IMAGE = 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=1600&q=80';

export function HeroBenevole() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={HERO_IMAGE}
          alt="Devenir bénévole à SFPA"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-sfpa-olive/95 via-sfpa-olive/85 to-sfpa-olive/60" />
      </div>

      <Container className="relative py-16 lg:py-20">
        <div className="max-w-xl">
          <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-full bg-white/12 backdrop-blur-sm border border-white/20 text-white text-[10px] font-semibold uppercase tracking-[0.25em]">
            <span className="w-1.5 h-1.5 rounded-full bg-sfpa-ocre animate-pulse" />
            Rejoignez l'équipe
          </div>

          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 leading-[1.1]">
            Transmettez votre <span className="text-sfpa-ocre">savoir-faire</span>
          </h1>

          <div className="w-10 h-0.5 bg-sfpa-ocre mb-4" />

          <p className="text-[14.5px] text-white/90 leading-relaxed mb-6 max-w-lg">
            Vous êtes artisan, ingénieur, agriculteur, médecin ou soignant ?
            Votre expérience est une richesse. Venez la transmettre à ceux
            qui en ont besoin — en Provence et en Afrique.
          </p>

          <div className="flex flex-wrap items-center gap-5 text-white">
            <div className="flex items-center gap-2">
              <div className="text-xl font-bold text-sfpa-ocre leading-none">2</div>
              <div className="text-[10px] uppercase tracking-wider text-white/70 leading-tight">
                Pays<br />d'action
              </div>
            </div>
            <div className="w-px h-7 bg-white/20" />
            <div className="flex items-center gap-2">
              <div className="text-xl font-bold text-sfpa-ocre leading-none">100%</div>
              <div className="text-[10px] uppercase tracking-wider text-white/70 leading-tight">
                Engagement<br />bénévole
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}