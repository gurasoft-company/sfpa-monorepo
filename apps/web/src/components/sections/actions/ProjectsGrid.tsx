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

export function ProjectsGrid({ projects }: { projects: ProjectListItem[] }) {
  return (
    <section className="relative py-12 lg:py-14 bg-gray-50">
      <Container>
        <div className="max-w-5xl mx-auto">
          {/* Label */}
          <div className="flex items-center gap-3 mb-8">
            <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-sfpa-olive">
              Tous les projets
            </span>
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-[11px] text-gray-400">
              {projects.length} projet{projects.length > 1 ? 's' : ''}
            </span>
          </div>

          {/* Grille */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {projects.map((project) => (
              <Link
                key={project.id}
                href={`/actions/${project.slug}`}
                className="group flex flex-col bg-white rounded-xl overflow-hidden border border-gray-100 hover:border-sfpa-olive/30 hover:shadow-md transition-all duration-300"
              >
                {/* Image */}
                <div className="relative h-44 overflow-hidden bg-gray-200">
                  {project.coverImage ? (
                    <Image
                      src={project.coverImage.url}
                      alt={project.coverImage.alt || project.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-sfpa-olive/10">
                      <span className="text-sfpa-olive/40 text-[10px] uppercase tracking-widest">
                        SFPA
                      </span>
                    </div>
                  )}

                  {/* Badge catégorie */}
                  {project.category && (
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-sm">
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-sfpa-olive">
                        {project.category}
                      </span>
                    </div>
                  )}

                  {/* Badge statut */}
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-sfpa-olive/90 backdrop-blur-sm">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-white">
                      {STATUS_LABELS[project.status] || project.status}
                    </span>
                  </div>
                </div>

                {/* Contenu */}
                <div className="p-5 flex flex-col flex-grow">
                  {/* Pays */}
                  <div className="text-[10px] uppercase tracking-wider text-sfpa-ocre font-semibold mb-2">
                    📍 {project.country || 'Afrique'}
                  </div>

                  {/* Titre */}
                  <h3 className="text-base font-bold text-sfpa-anthracite leading-snug mb-2 group-hover:text-sfpa-olive transition-colors line-clamp-2">
                    {project.title}
                  </h3>

                  {/* Extrait */}
                  <p className="text-[13px] text-gray-500 leading-relaxed line-clamp-2 mb-4 flex-grow">
                    {project.excerpt}
                  </p>

                  {/* CTA */}
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <span className="text-[11px] text-gray-500">
                      Découvrir
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-sfpa-olive group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}