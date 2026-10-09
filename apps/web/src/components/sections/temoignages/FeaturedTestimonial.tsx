import Image from 'next/image';
import { Quote, Star } from 'lucide-react';
import { Container } from '@/components/layout/Container';
import type { Testimonial } from '@/lib/types';

function Stars({ rating }: { rating: number | null }) {
  if (!rating || rating <= 0) return null;
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-3 h-3 ${
            i < rating ? 'fill-sfpa-ocre text-sfpa-ocre' : 'text-white/20'
          }`}
        />
      ))}
    </div>
  );
}

export function FeaturedTestimonial({ testimonial }: { testimonial: Testimonial }) {
  return (
    <section className="relative py-10 lg:py-12 bg-white">
      <Container>
        <div className="flex items-center gap-3 mb-5 max-w-xl mx-auto">
          <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-sfpa-olive">
            Témoignage à la une
          </span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        <div className="max-w-xl mx-auto relative rounded-xl bg-gradient-to-br from-sfpa-olive to-sfpa-olive/85 text-white overflow-hidden shadow-md">
          {/* Halo décoratif */}
          <div className="absolute -top-12 -right-12 w-40 h-40 bg-white/5 rounded-full blur-3xl pointer-events-none" />

          {/* Guillemet discret */}
          <div className="absolute top-3 right-5 text-white/10 pointer-events-none">
            <Quote className="w-12 h-12" strokeWidth={0.8} />
          </div>

          <div className="relative p-5 md:p-6">
            {/* Badge + Étoiles sur la même ligne */}
            <div className="flex items-center gap-3 mb-3.5">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-sfpa-ocre text-sfpa-anthracite">
                <span className="w-1.5 h-1.5 rounded-full bg-sfpa-anthracite" />
                <span className="text-[9px] font-bold uppercase tracking-[0.15em]">
                  À la une
                </span>
              </div>
              <Stars rating={testimonial.rating} />
            </div>

            {/* Citation */}
            <blockquote className="relative text-sm md:text-[15px] italic font-medium leading-relaxed mb-5">
              « {testimonial.quote} »
            </blockquote>

            {/* Auteur */}
            <div className="flex items-center gap-3 pt-4 border-t border-white/15">
              {testimonial.authorImage ? (
                <div className="relative w-9 h-9 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-white/30">
                  <Image
                    src={testimonial.authorImage.url}
                    alt={testimonial.authorName}
                    fill
                    className="object-cover"
                    sizes="36px"
                  />
                </div>
              ) : (
                <div className="w-9 h-9 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center text-white font-bold text-[13px] flex-shrink-0 ring-2 ring-white/30">
                  {testimonial.authorName.charAt(0).toUpperCase()}
                </div>
              )}
              <div>
                <div className="font-bold text-[13px]">
                  {testimonial.authorName}
                </div>
                {(testimonial.authorRole || testimonial.authorLocation) && (
                  <div className="text-[11px] text-white/75">
                    {testimonial.authorRole}
                    {testimonial.authorRole && testimonial.authorLocation && ' · '}
                    {testimonial.authorLocation}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}