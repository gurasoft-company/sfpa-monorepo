import type { Metadata } from 'next';
import { HeroContact } from '@/components/sections/contact/HeroContact';
import { ContactInfo } from '@/components/sections/contact/ContactInfo';
import { ContactFormSection } from '@/components/sections/contact/ContactFormSection';
import { ContactMap } from '@/components/sections/contact/ContactMap';
import { ContactFAQ } from '@/components/sections/contact/ContactFAQ';
import { ContactFinalCTA } from '@/components/sections/contact/ContactFinalCTA';

export const metadata: Metadata = {
  title: 'Contact | SFPA — La Terre entre nos mains',
  description:
    'Contactez SFPA : une question, un projet, une envie de collaborer ? Nous sommes à votre écoute.',
};

export default function ContactPage() {
  return (
    <>
      <HeroContact />
      <ContactInfo />
      <ContactFormSection />
      <ContactMap />
      <ContactFAQ />
      <ContactFinalCTA />
    </>
  );
}