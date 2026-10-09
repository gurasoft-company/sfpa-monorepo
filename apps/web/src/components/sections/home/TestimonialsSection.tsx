import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Star } from 'lucide-react';
import { Container } from '@/components/layout/Container';
import type { Testimonial } from '@/lib/types';

/* --- Étoiles --- */
function Stars({ rating }: { rating: number | null }) {
  if (!rating || rating <= 0) return null;
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-3 h-3 ${
            i < rating ? 'fill-sfpa-ocre text-sfpa-ocre' : 'text-gray-200'
          }`}
        />
      ))}
    </div>
  );
}

/* --- Avatar --- */
function Avatar({ name, image }: { name: string; image?: string | null }) {
  if (image) {
    return (
      <div className="relative w-9 h-9 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-white">
        <Image src={image} alt={name} fill className="object-cover" sizes="36px" />
      </div>
    );
  }
  return (
    <div className="w-9 h-9 rounded-full bg-sfpa-olive flex items-center justify-center text-white font-bold text-[12px] flex-shrink-0">
      {name.charAt(0).toUpperCase()}
    </div>
  );
}

/* --- Carte témoignage --- */
function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <article className="group bg-white rounded-xl border border-gray-100 hover:border-sfpa-olive/25 hover:shadow-md transition-all duration-300 p-5 flex flex-col h-full">
      {/* Étoiles */}
      {testimonial.rating && testimonial.rating > 0 && (
        <div className="mb-3">
          <Stars rating={testimonial.rating} />
        </div>
      )}

      {/* Citation */}
      <blockquote className="text-[13.5px] text-gray-600 leading-relaxed flex-grow mb-5">
        <span className="text-sfpa-olive/40 text-base leading-none mr-0.5">"</span>
        {testimonial.quote}
        <span className="text-sfpa-olive/40 text-base leading-none ml-0.5">"</span>
      </blockquote>

      {/* Auteur */}
      <div className="flex items-center gap-2.5 pt-4 border-t border-gray-100 mt-auto">
        <Avatar
          name={testimonial.authorName}
          image={testimonial.authorImage?.url}
        />
        <div className="min-w-0">
          <div className="font-semibold text-sfpa-anthracite text-[13px] truncate">
            {testimonial.authorName}
          </div>
          {(testimonial.authorRole || testimonial.authorLocation) && (
            <div className="text-[11px] text-gray-500 truncate">
              {testimonial.authorRole}
              {testimonial.authorRole && testimonial.authorLocation && ' · '}
              {testimonial.authorLocation}
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

/* --- Section principale --- */
export function TestimonialsSection({ testimonials }: { testimonials: Testimonial[] }) {
  if (testimonials.length === 0) return null;

  // Tri : featured en premier, puis les autres
  const sorted = [...testimonials].sort((a, b) => {
    if (a.isFeatured && !b.isFeatured) return -1;
    if (!a.isFeatured && b.isFeatured) return 1;
    return 0;
  });

  return (
    <section className="relative py-14 lg:py-16 bg-white">
      <Container>
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="text-[10px] font-semibold uppercase tracking-[0.25em] text-sfpa-olive mb-3">
            Ils racontent
          </div>
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-sfpa-anthracite mb-3 leading-tight">
            Des vies qui{' '}
            <span className="text-sfpa-olive">changent</span>
          </h2>
          <div className="w-10 h-0.5 bg-sfpa-ocre mx-auto mb-4" />
          <p className="text-sm text-gray-600 leading-relaxed">
            Bénéficiaires, bénévoles et partenaires partagent leur expérience.
          </p>
        </div>

        {/* Grille de cartes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-10">
          {sorted.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>

        {/* CTA centré */}
        <div className="text-center">
          <Link
            href="/temoignages"
            className="inline-flex items-center gap-1.5 text-sfpa-olive text-[11px] font-semibold uppercase tracking-wider hover:gap-2.5 transition-all"
          >
            Voir tous les témoignages
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </Container>
    </section>
  );
}