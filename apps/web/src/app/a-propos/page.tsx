import type { Metadata } from 'next';
import { HeroAbout } from '@/components/sections/about/HeroAbout';
import { HistorySection } from '@/components/sections/about/HistorySection';
import { MissionVisionSection } from '@/components/sections/about/MissionVisionSection';
import { ValuesSection } from '@/components/sections/about/ValuesSection';
import { MeansSection } from '@/components/sections/about/MeansSection';
import { HealthSection } from '@/components/sections/about/HealthSection';
import { TransparencySection } from '@/components/sections/about/TransparencySection';
import { AboutFinalCTA } from '@/components/sections/about/AboutFinalCTA';

export const metadata: Metadata = {
  title: 'À propos | SFPA — La Terre entre nos mains',
  description:
    "Découvrez l'histoire, la mission et les valeurs de SFPA, association qui forme la jeunesse africaine aux métiers techniques, soigne les populations et protège l'environnement.",
};

export default function AProposPage() {
  return (
    <>
      <HeroAbout />
      <HistorySection />
      <MissionVisionSection />
      <ValuesSection />
      <MeansSection />
      <HealthSection />
      <TransparencySection />
      <AboutFinalCTA />
    </>
  );
}