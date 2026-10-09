import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { PostAuthor } from '@/lib/types';

export function AuthorCard({ author }: { author: PostAuthor }) {
  return (
    <div className="mt-12 p-6 lg:p-8 rounded-2xl bg-gray-50 border border-gray-100">
      <div className="flex items-start gap-5">
        {/* Avatar */}
        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-sfpa-olive to-sfpa-olive/70 flex items-center justify-center text-white font-bold text-lg flex-shrink-0 shadow-sm">
          {author.firstName.charAt(0).toUpperCase()}
        </div>

        <div className="min-w-0">
          <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-sfpa-olive mb-1.5">
            Écrit par
          </div>
          <div className="text-base font-bold text-sfpa-anthracite mb-2">
            {author.firstName} {author.lastName}
          </div>
          <p className="text-[13.5px] text-gray-600 leading-relaxed mb-3">
            Membre de l'équipe SFPA, engagé pour un trait d'union durable
            entre la Provence et l'Afrique.
          </p>
          <Link
            href="/a-propos"
            className="inline-flex items-center gap-1.5 text-sfpa-olive text-[11px] font-semibold uppercase tracking-wider hover:gap-2.5 transition-all"
          >
            En savoir plus sur l'équipe
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </div>
  );
}