import type { Metadata } from 'next';
import { HeroDon } from '@/components/sections/don/HeroDon';
import { ImpactTable } from '@/components/sections/don/ImpactTable';
import { DonationForm } from '@/components/sections/don/DonationForm';
import { TaxInfo } from '@/components/sections/don/TaxInfo';
import { OtherWaysToGive } from '@/components/sections/don/OtherWaysToGive';
import { DonFAQ } from '@/components/sections/don/DonFAQ';

export const metadata: Metadata = {
  title: 'Faire un don | SFPA — La Terre entre nos mains',
  description:
    "Votre don forme un jeune, soigne une famille, protège la Terre. Réduction fiscale de 66 %. Chaque geste compte.",
};

export default function FaireUnDonPage() {
  return (
    <>
      <HeroDon />
      <ImpactTable />
      <DonationForm />
      <TaxInfo />
      <OtherWaysToGive />
      <DonFAQ />
    </>
  );
}