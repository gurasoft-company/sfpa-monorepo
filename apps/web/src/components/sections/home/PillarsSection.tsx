import Image from 'next/image';
import Link from 'next/link';
import { Sprout, Wrench, Globe2, ArrowRight } from 'lucide-react';
import { Container } from '@/components/layout/Container';

const PILLARS = [
  {
    icon: Wrench,
    title: 'Des métiers pour la vie',
    description:
      "Agriculture moderne, agroécologie, design intérieur, mécanique auto, énergie solaire. Chaque jeune repart avec un savoir-faire concret.",
    image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&q=80',
    imageAlt: 'Formation technique',
  },
  {
    icon: Sprout,
    title: 'Une Terre à préserver',
    description:
      "Préserver les sols, l'eau, les forêts et le climat. La Terre est notre demeure commune à tous.",
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80',
    imageAlt: 'Préservation des sols',
  },
  {
    icon: Globe2,
    title: 'Une fraternité agissante',
    description:
      "Un pont entre la Provence et l'Afrique. Transmettre, échanger, construire ensemble, dans les deux sens.",
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80',
    imageAlt: 'Fraternité entre les peuples',
  },
];

export function PillarsSection() {
  return (
    <section className="relative py-14 lg:py-16 bg-gray-50">
      <Container>
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="text-[10px] font-semibold uppercase tracking-[0.25em] text-sfpa-olive mb-3">
            Nos engagements
          </div>
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-sfpa-anthracite mb-3 leading-tight">
            L'Homme et la Terre,{' '}
            <span className="text-sfpa-olive">une même maison</span>
          </h2>
          <div className="w-10 h-0.5 bg-sfpa-ocre mx-auto mb-4" />
          <p className="text-sm text-gray-600 leading-relaxed">
            Trois piliers indissociables — parce qu'on ne protège pas la Terre sans protéger ceux qui l'habitent.
          </p>
        </div>

        {/* Grille élargie */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {PILLARS.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <article
                key={i}
                className="group bg-white rounded-xl border border-gray-100 hover:border-sfpa-olive/25 hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col"
              >
                {/* Image */}
                <div className="relative h-40 overflow-hidden">
                  <Image
                    src={pillar.image}
                    alt={pillar.imageAlt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                </div>

                {/* Contenu */}
                <div className="relative px-6 pt-7 pb-6 flex flex-col flex-grow">
                  {/* Icône — carré VERT par défaut */}
                  <div className="absolute -top-4 left-6 w-9 h-9 rounded-lg bg-sfpa-olive text-white shadow-sm flex items-center justify-center group-hover:shadow-md transition-shadow duration-300">
                    <Icon className="w-4 h-4" />
                  </div>

                  {/* Titre en vert */}
                  <h3 className="text-base font-bold text-sfpa-olive mb-2 leading-snug">
                    {pillar.title}
                  </h3>

                  {/* Description */}
                  <p className="text-[13.5px] text-gray-500 leading-relaxed flex-grow">
                    {pillar.description}
                  </p>

                  {/* Lien Découvrir en vert */}
                  <Link
                    href="/a-propos"
                    className="inline-flex items-center gap-1 mt-4 text-sfpa-olive text-[11px] font-semibold uppercase tracking-wider hover:gap-2 transition-all"
                  >
                    Découvrir
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}