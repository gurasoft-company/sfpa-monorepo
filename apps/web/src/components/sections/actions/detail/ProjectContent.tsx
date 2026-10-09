import type { Project } from '@/lib/types';

export function ProjectContent({ project }: { project: Project }) {
  return (
    <article className="min-w-0">
      {/* Titre de section */}
      <div className="flex items-center gap-3 mb-6">
        <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-sfpa-olive">
          Le projet
        </span>
        <div className="flex-1 h-px bg-gray-200" />
      </div>

      {/* Contenu principal */}
      {project.description ? (
        <div
          className="prose prose-lg max-w-none text-gray-700 leading-relaxed
            prose-headings:text-sfpa-anthracite prose-headings:font-bold
            prose-a:text-sfpa-olive prose-a:no-underline hover:prose-a:underline
            prose-strong:text-sfpa-anthracite
            prose-ul:list-disc prose-ul:pl-6
            prose-ol:list-decimal prose-ol:pl-6
            prose-li:my-1.5"
          dangerouslySetInnerHTML={{ __html: project.description }}
        />
      ) : (
        <p className="text-[15px] text-gray-600 leading-relaxed">
          {project.excerpt || 'Description à venir.'}
        </p>
      )}

      {/* Encadré citation */}
      <div className="mt-10 p-5 rounded-xl bg-sfpa-olive text-white">
        <p className="text-[14px] italic leading-relaxed text-white/95">
          Chaque projet SFPA est mené avec et pour les communautés locales.
          Votre soutien finance concrètement sa réalisation.
        </p>
      </div>
    </article>
  );
}