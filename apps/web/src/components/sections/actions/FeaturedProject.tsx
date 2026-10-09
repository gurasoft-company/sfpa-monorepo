import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { Container } from '@/components/layout/Container';
import type { ProjectListItem } from '@/lib/types';

const STATUS_LABELS: Record<string, string> = {
  en_cours: 'En cours',
  termine: 'Terminé',
  a_venir: 'À venir',
};

export function FeaturedProject({ project }: { project: ProjectListItem }) {
  return (
    <section className="relative py-12 lg:py-14 bg-white">
      <Container>
        <div className="flex items-center gap-3 mb-6 max-w-3xl mx-auto">
          <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-sfpa-olive">
            Projet à la une
          </span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        <Link
          href={`/actions/${project.slug}`}
          className="group block max-w-3xl mx-auto rounded-2xl overflow-hidden border border-gray-200 bg-white shadow-md hover:shadow-2xl hover:border-sfpa-olive/40 hover:-translate-y-0.5 transition-all duration-500"
        >
          <div className="grid grid-cols-1 lg:grid-cols-[42%_58%]">
            {/* Image — 42% */}
            <div className="relative h-56 sm:h-72 lg:h-[300px] overflow-hidden bg-gray-200">
              {project.coverImage ? (
                <Image
                  src={project.coverImage.url}
                  alt={project.coverImage.alt || project.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  priority
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-sfpa-olive">
                  <span className="text-white/40 text-xs uppercase tracking-widest">
                    À la une
                  </span>
                </div>
              )}

              {/* Badge À la une */}
              <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-sfpa-ocre text-sfpa-anthracite shadow-lg">
                <span className="w-1.5 h-1.5 rounded-full bg-sfpa-anthracite" />
                <span className="text-[9px] font-bold uppercase tracking-[0.15em]">
                  À la une
                </span>
              </div>

              {/* Badge statut */}
              <div className="absolute bottom-4 left-4 px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-sm shadow-md">
                <span className="text-[9px] font-bold uppercase tracking-[0.15em] text-sfpa-olive">
                  {STATUS_LABELS[project.status] || project.status}
                </span>
              </div>
            </div>

            {/* Contenu — 58% */}
            <div className="p-6 lg:p-7 flex flex-col justify-between bg-white">
              <div>
                {/* Catégorie + pays */}
                <div className="flex items-center gap-2.5 mb-3">
                  {project.category && (
                    <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-sfpa-olive">
                      {project.category}
                    </span>
                  )}
                  <span className="w-1 h-1 rounded-full bg-gray-300" />
                  <span className="text-[11px] text-gray-500">
                    📍 {project.country || 'Afrique'}
                  </span>
                </div>

                {/* Titre */}
                <h2 className="text-lg md:text-xl lg:text-[22px] font-bold text-sfpa-anthracite leading-tight mb-3 group-hover:text-sfpa-olive transition-colors">
                  {project.title}
                </h2>

                {/* Extrait */}
                <p className="text-[13.5px] text-gray-600 leading-relaxed mb-4 line-clamp-3">
                  {project.excerpt}
                </p>
              </div>

              {/* CTA en bas */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <span className="inline-flex items-center gap-1.5 text-sfpa-olive text-[11px] font-semibold uppercase tracking-wider group-hover:gap-2.5 transition-all">
                  Découvrir le projet
                  <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          </div>
        </Link>
      </Container>
    </section>
  );
}