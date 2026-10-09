import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { Container } from '@/components/layout/Container';
import type { ProjectListItem } from '@/lib/types';

export function ProjectsSection({ projects }: { projects: ProjectListItem[] }) {
  if (projects.length === 0) return null;

  return (
    <section className="relative py-14 lg:py-16 bg-white">
      <Container>
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="text-[10px] font-semibold uppercase tracking-[0.25em] text-sfpa-olive mb-3">
            Sur le terrain
          </div>
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-sfpa-anthracite mb-3 leading-tight">
            Nos actions{' '}
            <span className="text-sfpa-olive">en cours</span>
          </h2>
          <div className="w-10 h-0.5 bg-sfpa-ocre mx-auto mb-4" />
          <p className="text-sm text-gray-600 leading-relaxed">
            Chaque action change une vie, une famille, un village. Découvrez celles qui sont en cours.
          </p>
        </div>

        {/* 3 cartes projets */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto mb-10">
          {projects.map((project) => (
            <Link
              key={project.id}
              href={`/actions/${project.slug}`}
              className="group relative rounded-xl overflow-hidden border border-sfpa-olive hover:shadow-lg transition-all duration-300 flex flex-col bg-sfpa-olive"
            >
              {/* Image en haut — placeholder gris si pas d'image */}
              <div className="relative h-40 overflow-hidden bg-gray-200">
                {project.coverImage ? (
                  <Image
                    src={project.coverImage.url}
                    alt={project.coverImage.alt || project.title}
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

                {/* Overlay dégradé (uniquement si image) */}
                {project.coverImage && (
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                )}

                {/* Badge catégorie */}
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-sm">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-sfpa-olive">
                    {project.category}
                  </span>
                </div>
              </div>

              {/* Contenu en vert */}
              <div className="relative p-5 flex flex-col flex-grow text-white">
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/5 rounded-full blur-2xl pointer-events-none" />

                {/* Titre */}
                <h3 className="relative text-base font-bold text-white mb-2 leading-snug">
                  {project.title}
                </h3>

                {/* Extrait */}
                <p className="relative text-[13.5px] text-white/85 leading-relaxed line-clamp-2 flex-grow mb-4">
                  {project.excerpt}
                </p>

                {/* Meta : pays + statut */}
                <div className="relative flex items-center justify-between text-[11px] text-white/70 pt-4 border-t border-white/15">
                  <span className="inline-flex items-center gap-1.5">
                    📍 {project.country || 'Afrique'}
                  </span>
                  <span className="capitalize">
                    {project.status.replace('_', ' ')}
                  </span>
                </div>

                {/* Lien discret */}
                <div className="relative mt-3 inline-flex items-center gap-1.5 text-sfpa-ocre text-[11px] font-semibold uppercase tracking-wider group-hover:gap-2.5 transition-all">
                  Découvrir
                  <ArrowRight className="w-3 h-3" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA centré */}
        <div className="text-center">
          <Link
            href="/actions"
            className="inline-flex items-center gap-1.5 text-sfpa-olive text-[11px] font-semibold uppercase tracking-wider hover:gap-2.5 transition-all"
          >
            Tous nos projets
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </Container>
    </section>
  );
}