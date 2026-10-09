import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Clock, GraduationCap, Users } from 'lucide-react';
import { Container } from '@/components/layout/Container';
import type { FormationListItem } from '@/lib/types';

export function FormationsGrid({ formations }: { formations: FormationListItem[] }) {
  return (
    <section className="relative py-14 lg:py-16 bg-white">
      <Container>
        {formations.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500 text-sm">Aucune formation dans cette catégorie pour le moment.</p>
            <Link
              href="/formations"
              className="inline-flex items-center gap-1.5 mt-4 text-sfpa-olive text-[11px] font-semibold uppercase tracking-wider hover:gap-2.5 transition-all"
            >
              Voir toutes les formations <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {formations.map((formation) => (
              <Link
                key={formation.id}
                href={`/formations/${formation.slug}`}
                className="group relative rounded-xl overflow-hidden border border-sfpa-olive hover:shadow-lg transition-all duration-300 flex flex-col bg-sfpa-olive"
              >
                {/* Image */}
                <div className="relative h-40 overflow-hidden bg-gray-200">
                  {formation.coverImage ? (
                    <Image
                      src={formation.coverImage.url}
                      alt={formation.coverImage.alt || formation.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-gray-400 text-[10px] uppercase tracking-widest">
                        Aucune image
                      </span>
                    </div>
                  )}

                  {formation.coverImage && (
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  )}

                  {/* Badge catégorie */}
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-sm">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-sfpa-olive">
                      {formation.category}
                    </span>
                  </div>
                </div>

                {/* Contenu vert */}
                <div className="relative p-5 flex flex-col flex-grow text-white">
                  <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/5 rounded-full blur-2xl pointer-events-none" />

                  <h3 className="relative text-base font-bold text-white mb-2 leading-snug">
                    {formation.title}
                  </h3>

                  <p className="relative text-[13.5px] text-white/85 leading-relaxed line-clamp-2 flex-grow mb-4">
                    {formation.excerpt}
                  </p>

                  {/* Meta : durée, niveau, public */}
                  <div className="relative flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[11px] text-white/70 pt-4 border-t border-white/15 mb-3">
                    {formation.duration && (
                      <span className="inline-flex items-center gap-1.5">
                        <Clock className="w-3 h-3" /> {formation.duration}
                      </span>
                    )}
                    {formation.level && (
                      <span className="inline-flex items-center gap-1.5">
                        <GraduationCap className="w-3 h-3" /> {formation.level}
                      </span>
                    )}
                  </div>

                  {/* CTA */}
                  <div className="relative inline-flex items-center gap-1.5 text-sfpa-ocre text-[11px] font-semibold uppercase tracking-wider group-hover:gap-2.5 transition-all">
                    En savoir plus
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}