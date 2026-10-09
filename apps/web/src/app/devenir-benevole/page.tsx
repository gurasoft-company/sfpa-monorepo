import type { Metadata } from 'next';
import { HeroBenevole } from '@/components/sections/benevole/HeroBenevole';
import { WhyVolunteer } from '@/components/sections/benevole/WhyVolunteer';
import { MissionsOffered } from '@/components/sections/benevole/MissionsOffered';
import { VolunteerFormSection } from '@/components/sections/benevole/VolunteerFormSection';
import { VolunteerFAQ } from '@/components/sections/benevole/VolunteerFAQ';
import { BenevoleFinalCTA } from '@/components/sections/benevole/BenevoleFinalCTA';

export const metadata: Metadata = {
  title: 'Devenir bénévole | SFPA — La Terre entre nos mains',
  description:
    "Artisans, ingénieurs, agriculteurs, médecins, soignants — transmettez votre savoir-faire en Provence et en Afrique. Rejoignez SFPA.",
};

export default function DevenirBenevolePage() {
  return (
    <>
      <HeroBenevole />
      <WhyVolunteer />
      <MissionsOffered />
      <VolunteerFormSection />
      <VolunteerFAQ />
      <BenevoleFinalCTA />
    </>
  );
}