import type { Metadata } from 'next';
import { api } from '@/lib/api';
import { HeroActions } from '@/components/sections/actions/HeroActions';
import { FiltersActions } from '@/components/sections/actions/FiltersActions';
import { FeaturedProject } from '@/components/sections/actions/FeaturedProject';
import { ProjectsGrid } from '@/components/sections/actions/ProjectsGrid';
import { ActionsFinalCTA } from '@/components/sections/actions/ActionsFinalCTA';
import type { ProjectListItem } from '@/lib/types';

export const metadata: Metadata = {
  title: 'Nos actions | SFPA — La Terre entre nos mains',
  description:
    "Les projets de SFPA sur le terrain : formation professionnelle, agroécologie, santé, eau et énergie — en Provence et en Afrique.",
};

// Libellés lisibles pour les catégories
const CATEGORY_LABELS: Record<string, string> = {
  formation: 'Formation',
  agriculture: 'Agriculture',
  eau: 'Eau',
  energie: 'Énergie',
  reforestation: 'Reforestation',
  sante: 'Santé',
  autre: 'Autre',
};

export default async function ActionsPage({
  searchParams,
}: {
  searchParams: { category?: string };
}) {
  const res = await api.getProjects().catch(() => null);
  const allProjects: ProjectListItem[] = res?.data.items ?? [];

  // Catégories uniques dérivées du backend (triées alphabétiquement)
  const uniqueCategories = Array.from(
    new Set(allProjects.map((p) => p.category).filter(Boolean))
  ).sort() as string[];

  // Filtre appliqué côté serveur selon l'URL
  const projects = searchParams.category
    ? allProjects.filter((p) => p.category === searchParams.category)
    : allProjects;

  const [featured, ...rest] = projects;

  return (
    <>
      <HeroActions total={allProjects.length} />
      <FiltersActions
        categories={uniqueCategories}
        labels={CATEGORY_LABELS}
        activeCategory={searchParams.category}
      />

      {projects.length === 0 ? (
        <section className="py-16 bg-white">
          <div className="text-center text-gray-500 text-sm">
            Aucun projet dans cette catégorie pour le moment.
          </div>
        </section>
      ) : (
        <>
          {featured && <FeaturedProject project={featured} />}
          {rest.length > 0 && <ProjectsGrid projects={rest} />}
        </>
      )}

      <ActionsFinalCTA />
    </>
  );
}