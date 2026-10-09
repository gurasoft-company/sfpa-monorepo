import type { Metadata } from 'next';
import { api } from '@/lib/api';
import { HeroFormations } from '@/components/sections/formations/HeroFormations';
import { FiltersFormations } from '@/components/sections/formations/FiltersFormations';
import { FormationsGrid } from '@/components/sections/formations/FormationsGrid';
import { FormationsFinalCTA } from '@/components/sections/formations/FormationsFinalCTA';
import type { FormationListItem } from '@/lib/types';

export const metadata: Metadata = {
  title: 'Nos formations | SFPA — La Terre entre nos mains',
  description:
    "Découvrez les formations professionnelles de SFPA : agriculture moderne, agroécologie, design intérieur, mécanique auto, énergie solaire. Former la jeunesse africaine aux métiers de demain.",
};

const CATEGORY_LABELS: Record<string, string> = {
  agriculture: 'Agriculture',
  batiment: 'Bâtiment',
  mecanique: 'Mécanique',
  artisanat: 'Artisanat',
  numerique: 'Numérique',
  autre: 'Autre',
};

export default async function FormationsPage({
  searchParams,
}: {
  searchParams: { category?: string };
}) {
  const res = await api.getFormations().catch(() => null);
  const allFormations: FormationListItem[] = res?.data.items ?? [];

  const uniqueCategories = Array.from(
    new Set(allFormations.map((f) => f.category).filter(Boolean))
  ).sort() as string[];

  const formations = searchParams.category
    ? allFormations.filter((f) => f.category === searchParams.category)
    : allFormations;

  return (
    <>
      <HeroFormations total={allFormations.length} />
      <FiltersFormations
        categories={uniqueCategories}
        labels={CATEGORY_LABELS}
        activeCategory={searchParams.category}
      />
      <FormationsGrid formations={formations} />
      <FormationsFinalCTA />
    </>
  );
}