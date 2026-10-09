import type { Metadata } from 'next';
import { api } from '@/lib/api';
import { HeroTemoignages } from '@/components/sections/temoignages/HeroTemoignages';
import { FeaturedTestimonial } from '@/components/sections/temoignages/FeaturedTestimonial';
import { TestimonialsGrid } from '@/components/sections/temoignages/TestimonialsGrid';
import { TestimonialFormSection } from '@/components/sections/temoignages/TestimonialFormSection';
import { TemoignagesFinalCTA } from '@/components/sections/temoignages/TemoignagesFinalCTA';

export const metadata: Metadata = {
  title: 'Témoignages | SFPA — La Terre entre nos mains',
  description:
    "Bénéficiaires, bénévoles et partenaires racontent. Leurs mots disent mieux que les chiffres ce que SFPA change sur le terrain.",
};

export default async function TemoignagesPage() {
  const res = await api.getTestimonials().catch(() => null);
  const testimonials = res?.data.items ?? [];

  const featuredIndex = testimonials.findIndex((t) => t.isFeatured);
  const featured = featuredIndex >= 0 ? testimonials[featuredIndex] : testimonials[0];
  const rest = testimonials.filter(
    (_, i) => i !== (featuredIndex >= 0 ? featuredIndex : 0)
  );

  return (
    <>
      <HeroTemoignages total={testimonials.length} />
      {featured && <FeaturedTestimonial testimonial={featured} />}
      {rest.length > 0 && <TestimonialsGrid testimonials={rest} />}
      <TestimonialFormSection />
      <TemoignagesFinalCTA />
    </>
  );
}