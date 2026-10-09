import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Heart, CheckCircle2 } from 'lucide-react';

interface HeroProps {
  hero: {
    title: string;
    subtitle: string;
    cta: { label: string; url: string };
  };
}

export function HeroSection({ hero }: HeroProps) {
  return (
    <section className="bg-sfpa-olive text-white overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 lg:items-stretch lg:min-h-[600px]">

        {/* Colonne texte */}
       <div className="relative order-2 lg:order-1 px-6 sm:px-10 lg:px-14 py-6 lg:py-8">
          {/* Motif décoratif */}
          <div
            className="absolute inset-0 opacity-[0.08] pointer-events-none"
            style={{
              backgroundImage:
                'radial-gradient(circle at 30% 30%, white 0%, transparent 40%), radial-gradient(circle at 70% 70%, white 0%, transparent 40%)',
            }}
          />

        <div className="relative w-full max-w-xl h-full flex flex-col justify-between gap-y-5 lg:gap-y-0">

            {/* Badge */}
            <div className="flex">
              <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/12 backdrop-blur-sm border border-white/20 text-[11px] font-medium tracking-wide">
                <span>🌍</span>
                <span>Humanitaire &amp; Environnement</span>
              </div>
            </div>

            {/* Titre + sous-titre */}
            <div className="flex flex-col gap-y-5">
              <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-[2.6rem] font-bold leading-[1.12] tracking-tight">
                {hero.title}
              </h1>
              <div className="w-12 h-1 bg-sfpa-ocre rounded-full" />
              <p className="text-sm md:text-base lg:text-[17px] text-white/90 leading-relaxed">
                {hero.subtitle}
              </p>
            </div>

            {/* Boutons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href={hero.cta.url}
                className="inline-flex items-center justify-center gap-2 bg-sfpa-ocre text-sfpa-anthracite font-semibold px-6 py-3 rounded-full hover:bg-opacity-90 transition shadow-md text-sm"
              >
                {hero.cta.label} <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/faire-un-don"
                className="inline-flex items-center justify-center gap-2 bg-sfpa-terra text-white font-semibold px-6 py-3 rounded-full hover:bg-opacity-90 transition shadow-md text-sm"
              >
                <Heart className="w-4 h-4" /> Faire un don
              </Link>
            </div>

            {/* Puces de réassurance */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-2 pt-5 border-t border-white/15">
              <div className="flex items-center gap-2 text-[12px] text-white/80">
                <CheckCircle2 className="w-3.5 h-3.5 text-sfpa-ocre flex-shrink-0" />
                <span>Association loi 1901</span>
              </div>
              <div className="flex items-center gap-2 text-[12px] text-white/80">
                <CheckCircle2 className="w-3.5 h-3.5 text-sfpa-ocre flex-shrink-0" />
                <span>Provence · Afrique</span>
              </div>
              <div className="flex items-center gap-2 text-[12px] text-white/80">
                <CheckCircle2 className="w-3.5 h-3.5 text-sfpa-ocre flex-shrink-0" />
                <span>Depuis 2021</span>
              </div>
            </div>
          </div>
        </div>

        {/* Colonne image */}
        <div className="relative order-1 lg:order-2 h-64 sm:h-80 lg:h-full">
          <Image
            src="https://pub-67fe5ceccbdf450888e33f1555aad41e.r2.dev/pages/66fc7de2-39c9-4ddc-a6d8-12df20c8722b.webp"
            alt="Jeunes en formation SFPA"
            fill
            priority
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
      </div>
    </section>
  );
}