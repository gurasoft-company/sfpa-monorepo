import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';
import { Container } from '@/components/layout/Container';
import type { Project } from '@/lib/types';

const STATUS_LABELS: Record<string, string> = {
  en_cours: 'En cours',
  termine: 'Terminé',
  a_venir: 'À venir',
};

export function ProjectHero({ project }: { project: Project }) {
  return (
    <section className="relative overflow-hidden">
      {/* Image de fond */}
      <div className="absolute inset-0">
        {project.coverImage ? (
          <Image
            src={project.coverImage.url}
            alt={project.coverImage.alt || project.title}
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
        ) : (
          <div className="w-full h-full bg-sfpa-olive" />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-sfpa-olive/95 via-sfpa-olive/85 to-sfpa-olive/60" />
      </div>

      {/* Contenu */}
      <Container className="relative py-16 lg:py-20">
        {/* Retour */}
        <Link
          href="/actions"
          className="inline-flex items-center gap-2 mb-6 text-white/85 hover:text-white text-[12px] font-semibold uppercase tracking-wider transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Retour aux actions
        </Link>

        <div className="max-w-3xl">
          {/* Badges catégorie + statut */}
          <div className="flex flex-wrap items-center gap-2.5 mb-5">
            {project.category && (
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/15 backdrop-blur-sm border border-white/25 text-white text-[10px] font-semibold uppercase tracking-[0.15em]">
                {project.category}
              </span>
            )}
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-sfpa-ocre text-sfpa-anthracite text-[10px] font-bold uppercase tracking-[0.15em] shadow-sm">
              {STATUS_LABELS[project.status] || project.status}
            </span>
            {project.country && (
              <span className="inline-flex items-center gap-1.5 text-white/85 text-[11px]">
                📍 {project.country}
              </span>
            )}
          </div>

          {/* Titre */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-5 leading-[1.1]">
            {project.title}
          </h1>

          <div className="w-14 h-0.5 bg-sfpa-ocre mb-5" />

          {/* Extrait */}
          {project.excerpt && (
            <p className="text-base md:text-lg text-white/90 leading-relaxed max-w-2xl">
              {project.excerpt}
            </p>
          )}
        </div>
      </Container>
    </section>
  );
}