import Image from 'next/image';
import { Star, Quote } from 'lucide-react';
import { Container } from '@/components/layout/Container';
import type { Testimonial } from '@/lib/types';

function Stars({ rating }: { rating: number | null }) {
  if (!rating || rating <= 0) return null;
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-3.5 h-3.5 ${
            i < rating ? 'fill-sfpa-ocre text-sfpa-ocre' : 'text-gray-200'
          }`}
        />
      ))}
    </div>
  );
}

export function TestimonialsGrid({ testimonials }: { testimonials: Testimonial[] }) {
  return (
    <section className="relative py-14 lg:py-16 bg-gray-50">
      <Container>
        <div className="max-w-5xl mx-auto">
          {/* Chapeau éditorial */}
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="text-[10px] font-semibold uppercase tracking-[0.25em] text-sfpa-olive mb-3">
              Tous les témoignages
            </div>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-sfpa-anthracite mb-3 leading-tight">
              Des voix, des <span className="text-sfpa-olive">histoires</span>
            </h2>
            <div className="w-10 h-0.5 bg-sfpa-ocre mx-auto mb-4" />
            <p className="text-sm text-gray-600 leading-relaxed">
              Chaque témoignage est une preuve vivante de ce que la fraternité
              entre la Provence et l'Afrique peut accomplir. Prenez le temps
              de les lire — ils viennent du terrain.
            </p>
          </div>

          {/* Grille de témoignages */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {testimonials.map((testimonial) => (
              <article
                key={testimonial.id}
                className="group relative bg-white rounded-2xl border border-gray-100 hover:border-sfpa-olive/30 hover:shadow-lg transition-all duration-300 p-6 lg:p-7 flex flex-col"
              >
                {/* Guillemet décoratif en filigrane */}
                <Quote
                  className="absolute top-5 right-5 w-10 h-10 text-sfpa-olive/[0.07] pointer-events-none"
                  strokeWidth={1}
                />

                {/* En-tête : étoiles + guillemet stylisé */}
                <div className="flex items-center justify-between mb-4">
                  <Quote className="w-5 h-5 text-sfpa-olive/30" />
                  {testimonial.rating && testimonial.rating > 0 && (
                    <Stars rating={testimonial.rating} />
                  )}
                </div>

                {/* Citation */}
                <blockquote className="text-[14.5px] text-gray-700 leading-relaxed flex-grow mb-6">
                  {testimonial.quote}
                </blockquote>

                {/* Auteur */}
                <div className="flex items-center gap-3 pt-5 border-t border-gray-100 mt-auto">
                  {testimonial.authorImage ? (
                    <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-white shadow-sm">
                      <Image
                        src={testimonial.authorImage.url}
                        alt={testimonial.authorName}
                        fill
                        className="object-cover"
                        sizes="48px"
                      />
                    </div>
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-sfpa-olive to-sfpa-olive/70 flex items-center justify-center text-white font-bold text-base flex-shrink-0 shadow-sm">
                      {testimonial.authorName.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div className="min-w-0">
                    <div className="font-bold text-sfpa-anthracite text-[14px] truncate">
                      {testimonial.authorName}
                    </div>
                    {(testimonial.authorRole || testimonial.authorLocation) && (
                      <div className="text-[12px] text-gray-500 truncate">
                        {testimonial.authorRole}
                        {testimonial.authorRole && testimonial.authorLocation && ' · '}
                        {testimonial.authorLocation}
                      </div>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}