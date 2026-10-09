import type { Metadata } from 'next';
import { api } from '@/lib/api';
import { HeroPartenaires } from '@/components/sections/partenaires/HeroPartenaires';
import { FiltersPartenaires } from '@/components/sections/partenaires/FiltersPartenaires';
import { PartnersGrid } from '@/components/sections/partenaires/PartnersGrid';
import { PartnerBenefits } from '@/components/sections/partenaires/PartnerBenefits';
import { BecomePartner } from '@/components/sections/partenaires/BecomePartner';
import { PartenairesFinalCTA } from '@/components/sections/partenaires/PartenairesFinalCTA';

export const metadata: Metadata = {
  title: 'Nos partenaires | SFPA — La Terre entre nos mains',
  description:
    "Écoles, entreprises, collectivités, associations — ils nous font confiance et nous accompagnent. Découvrez nos partenaires et devenez-en un.",
};

export default async function PartenairesPage({
  searchParams,
}: {
  searchParams: { type?: string };
}) {
  const res = await api.getPartners().catch(() => null);
  const partners = res?.data.items ?? [];

  const filtered = searchParams.type
    ? partners.filter((p) => p.type === searchParams.type)
    : partners;

  return (
    <>
      <HeroPartenaires total={partners.length} />
      <FiltersPartenaires activeType={searchParams.type} />
      <PartnersGrid partners={filtered} />
      <PartnerBenefits />
      <BecomePartner />
      <PartenairesFinalCTA />
    </>
  );
}