import Image from 'next/image';
import { Quote, Star } from 'lucide-react';

export function TestimonialCard({
  quote,
  author,
  role,
  location,
  rating,
  image,
}: {
  quote: string;
  author: string;
  role?: string | null;
  location?: string | null;
  rating?: number | null;
  image?: string | null;
}) {
  return (
    <div className="bg-sfpa-sable p-8 rounded-2xl relative h-full flex flex-col">
      <Quote className="w-10 h-10 text-sfpa-ocre absolute -top-3 left-6 bg-sfpa-sable rounded-full p-1.5" />

      {rating && rating > 0 && (
        <div className="flex gap-0.5 mb-4 mt-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${i < rating ? 'fill-sfpa-ocre text-sfpa-ocre' : 'text-gray-300'}`}
            />
          ))}
        </div>
      )}

      <blockquote className="text-base md:text-lg text-sfpa-anthracite italic leading-relaxed mb-6 flex-grow">
        « {quote} »
      </blockquote>

      <div className="flex items-center gap-3">
        {image ? (
          <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
            <Image src={image} alt={author} fill className="object-cover" />
          </div>
        ) : (
          <div className="w-12 h-12 rounded-full bg-sfpa-olive flex items-center justify-center text-white font-bold flex-shrink-0">
            {author.charAt(0).toUpperCase()}
          </div>
        )}
        <div className="min-w-0">
          <div className="font-semibold text-sfpa-anthracite truncate">{author}</div>
          {(role || location) && (
            <div className="text-xs text-gray-600 truncate">
              {role}
              {role && location && ' · '}
              {location}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}