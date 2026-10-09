import Link from 'next/link';
import { ArrowRight, Heart, Sprout } from 'lucide-react';
import { Container } from '@/components/layout/Container';
import { ImageCarousel } from '@/components/sections/ImageCarousel';

const SLIDES = [
  { image: 'https://pub-67fe5ceccbdf450888e33f1555aad41e.r2.dev/pages/66fc7de2-39c9-4ddc-a6d8-12df20c8722b.webp', alt: 'Formation aux métiers techniques — SFPA' },
  { image: 'https://pub-67fe5ceccbdf450888e33f1555aad41e.r2.dev/pages/66fc7de2-39c9-4ddc-a6d8-12df20c8722b.webp', alt: 'Protection de la Terre — SFPA' },
  { image: 'https://pub-67fe5ceccbdf450888e33f1555aad41e.r2.dev/pages/66fc7de2-39c9-4ddc-a6d8-12df20c8722b.webp', alt: 'Fraternité Provence-Afrique — SFPA' },
];

export function MissionSection() {
  return (
    <section className="relative py-14 lg:py-16 bg-white">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">

          {/* Texte */}
          <div className="order-1 lg:order-1">
            {/* Label */}
            <div className="text-[10px] font-semibold uppercase tracking-[0.25em] text-sfpa-olive mb-3">
              Notre raison d'être
            </div>

            {/* Titre */}
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-3 text-sfpa-anthracite leading-tight">
              Un trait d'union entre{' '}
              <span className="text-sfpa-olive">l'humanitaire</span>{' '}
              et <span className="text-sfpa-olive">l'environnement</span>
            </h2>

            {/* Barre signature */}
            <div className="w-10 h-0.5 bg-sfpa-ocre mb-5" />

            {/* Équation SFPA */}
            <div className="flex flex-wrap items-center gap-2 mb-5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-50 text-sfpa-olive text-[11px] font-semibold border border-gray-100">
                <Heart className="w-3 h-3" /> Humanitaire
              </span>
              <span className="text-sfpa-anthracite/30 font-bold text-sm">+</span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-50 text-sfpa-olive text-[11px] font-semibold border border-gray-100">
                <Sprout className="w-3 h-3" /> Environnement
              </span>
              <span className="text-sfpa-anthracite/30 font-bold text-sm">=</span>
              <span className="inline-flex items-center px-3.5 py-1 rounded-full bg-sfpa-olive text-white text-[11px] font-bold">
                SFPA
              </span>
            </div>

            {/* Paragraphes */}
            <div className="space-y-3.5 text-[14.5px] text-gray-600 leading-relaxed">
              <p>
                SFPA est née d'une conviction simple :{' '}
                <strong className="text-sfpa-anthracite">
                  on ne peut pas prendre soin des Hommes sans prendre soin de la Terre
                </strong>
                , et inversement.
              </p>
              <p>
                <strong className="text-sfpa-anthracite">Sur le versant humanitaire</strong>, nous donnons à des jeunes un métier concret, une dignité, un avenir.{' '}
                <strong className="text-sfpa-anthracite">Sur le versant environnemental</strong>, nous protégeons les sols, l'eau, les forêts et transmettons le respect du vivant.
              </p>
              <p>
                Là où la jeunesse retrouve un avenir, <strong className="text-sfpa-anthracite">la migration recule</strong>. Là où la Terre est respectée, <strong className="text-sfpa-anthracite">les communautés se stabilisent</strong>.
              </p>
            </div>

            {/* Citation — encadré vert */}
            <div className="mt-6 p-4 rounded-xl bg-sfpa-olive text-white">
              <p className="text-[13.5px] italic leading-relaxed text-white/95">
                Protéger la Terre, c'est protéger les Hommes.<br />
                Former les Hommes, c'est protéger la Terre.
              </p>
            </div>

            {/* CTA */}
            <Link
              href="/a-propos"
              className="inline-flex items-center gap-1 mt-4 text-sfpa-olive text-[11px] font-semibold uppercase tracking-wider hover:gap-2 transition-all"
            >
              Découvrir notre histoire
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          {/* Carrousel */}
          <div className="order-2 lg:order-2 relative">
            <div className="relative rounded-xl overflow-hidden shadow-sm ring-1 ring-gray-200">
              <ImageCarousel aspectRatio="aspect-[4/3]" autoPlayMs={4500} slides={SLIDES} />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}