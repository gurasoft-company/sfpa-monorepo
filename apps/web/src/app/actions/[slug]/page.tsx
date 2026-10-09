import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { api } from '@/lib/api';
import { ProjectHero } from '@/components/sections/actions/detail/ProjectHero';
import { ProjectContent } from '@/components/sections/actions/detail/ProjectContent';
import { ProjectSidebar } from '@/components/sections/actions/detail/ProjectSidebar';
import { RelatedProjects } from '@/components/sections/actions/detail/RelatedProjects';
import { ProjectFinalCTA } from '@/components/sections/actions/detail/ProjectFinalCTA';
import type { Project } from '@/lib/types';

type Params = { slug: string };

export async function generateMetadata({
  params,
}: {
  params: Params | Promise<Params>;
}): Promise<Metadata> {
  try {
    const { slug } = await Promise.resolve(params);
    const res = await api.getProject(slug);
    const project = res.data.project;
    return {
      title: `${project.title} | SFPA — La Terre entre nos mains`,
      description: project.excerpt || project.description || '',
    };
  } catch {
    return { title: 'Projet | SFPA' };
  }
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Params | Promise<Params>;
}) {
  const { slug } = await Promise.resolve(params);

  // Sécurité : si le slug est manquant, on redirige vers 404
  if (!slug || slug === 'undefined') {
    notFound();
  }

  let project: Project;
  try {
    const res = await api.getProject(slug);
    project = res.data.project;
  } catch {
    notFound();
  }

  const relatedRes = await api
    .getProjects(`?category=${project.category}&limit=4`)
    .catch(() => null);
  const related = (relatedRes?.data.items ?? [])
    .filter((p) => p.slug !== project.slug)
    .slice(0, 3);

  return (
    <>
      <ProjectHero project={project} />
      <section className="relative py-14 lg:py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-10 lg:gap-14">
            <ProjectContent project={project} />
            <ProjectSidebar project={project} />
          </div>
        </div>
      </section>
      {related.length > 0 && <RelatedProjects projects={related} />}
      <ProjectFinalCTA />
    </>
  );
}