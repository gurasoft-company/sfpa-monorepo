import type { Metadata } from 'next';
import { HeroAdherer } from '@/components/sections/adherer/HeroAdherer';
import { WhyAdherer } from '@/components/sections/adherer/WhyAdherer';
import { MembershipTypes } from '@/components/sections/adherer/MembershipTypes';
import { MemberFormSection } from '@/components/sections/adherer/MemberFormSection';
import { AdhererFAQ } from '@/components/sections/adherer/AdhererFAQ';
import { AdhererFinalCTA } from '@/components/sections/adherer/AdhererFinalCTA';

export const metadata: Metadata = {
  title: 'Adhérer | SFPA — La Terre entre nos mains',
  description:
    "Rejoignez SFPA et soutenez nos actions toute l'année. Devenez membre actif, bienfaiteur ou d'honneur.",
};

export default function AdhererPage() {
  return (
    <>
      <HeroAdherer />
      <WhyAdherer />
      <MembershipTypes />
      <MemberFormSection />
      <AdhererFAQ />
      <AdhererFinalCTA />
    </>
  );
}