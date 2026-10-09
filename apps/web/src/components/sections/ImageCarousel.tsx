'use client';
import Image from 'next/image';
import { useEffect, useState, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export interface CarouselSlide {
  image: string;
  alt: string;
  title?: string;
  caption?: string;
}

export function ImageCarousel({
  slides,
  autoPlayMs = 5000,
  showDots = true,
  showArrows = true,
  aspectRatio = 'aspect-[16/9]',
}: {
  slides: CarouselSlide[];
  autoPlayMs?: number;
  showDots?: boolean;
  showArrows?: boolean;
  aspectRatio?: string;
}) {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % slides.length);
  }, [slides.length]);

  const prev = useCallback(() => {
    setCurrent((c) => (c - 1 + slides.length) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    if (isPaused || slides.length <= 1) return;
    const timer = setInterval(next, autoPlayMs);
    return () => clearInterval(timer);
  }, [next, autoPlayMs, isPaused, slides.length]);

  if (!slides.length) return null;

  return (
    <div
      className={`relative w-full ${aspectRatio} rounded-2xl overflow-hidden bg-sfpa-sable shadow-lg group`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Slides */}
      {slides.map((slide, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
            i === current ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          <Image
            src={slide.image}
            alt={slide.alt}
            fill
            priority={i === 0}
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
          />
          {/* Overlay texte (optionnel) */}
          {(slide.title || slide.caption) && (
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end">
              <div className="p-6 md:p-10 text-white max-w-2xl">
                {slide.title && (
                  <h3 className="text-2xl md:text-3xl font-bold mb-2 drop-shadow-lg">
                    {slide.title}
                  </h3>
                )}
                {slide.caption && (
                  <p className="text-sm md:text-base opacity-90 drop-shadow-md">
                    {slide.caption}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      ))}

      {/* Flèches */}
      {showArrows && slides.length > 1 && (
        <>
          <button
            onClick={prev}
            aria-label="Image précédente"
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/80 hover:bg-white flex items-center justify-center shadow-md transition opacity-0 group-hover:opacity-100"
          >
            <ChevronLeft className="w-5 h-5 text-sfpa-anthracite" />
          </button>
          <button
            onClick={next}
            aria-label="Image suivante"
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/80 hover:bg-white flex items-center justify-center shadow-md transition opacity-0 group-hover:opacity-100"
          >
            <ChevronRight className="w-5 h-5 text-sfpa-anthracite" />
          </button>
        </>
      )}

      {/* Dots */}
      {showDots && slides.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Aller à l'image ${i + 1}`}
              className={`h-2 rounded-full transition-all ${
                i === current ? 'bg-white w-8' : 'bg-white/50 w-2 hover:bg-white/80'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}