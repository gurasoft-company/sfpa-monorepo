import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Clock } from 'lucide-react';
import type { Post } from '@/lib/types';

function readingTime(text: string | null): number {
  if (!text) return 1;
  const words = text.replace(/<[^>]*>/g, ' ').split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

export function PostHero({ post }: { post: Post }) {
  const published = new Date(post.publishedAt).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  const minutes = readingTime(post.content);

  return (
    <section className="relative overflow-hidden bg-sfpa-anthracite">
      {/* Image de fond */}
      <div className="absolute inset-0">
        {post.coverImage ? (
          <Image
            src={post.coverImage.url}
            alt={post.coverImage.alt || post.title}
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
        ) : (
          <div className="w-full h-full bg-sfpa-olive" />
        )}
        {/* Overlay sombre élégant */}
        <div className="absolute inset-0 bg-gradient-to-b from-sfpa-anthracite/95 via-sfpa-anthracite/75 to-sfpa-anthracite/95" />
      </div>

      {/* Contenu */}
           <div className="relative max-w-4xl mx-auto px-5 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* Retour */}
        <Link
          href="/actualites"
          className="inline-flex items-center gap-2 mb-8 text-white/70 hover:text-white text-[11px] font-semibold uppercase tracking-[0.15em] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Retour aux actualités
        </Link>

        {/* Badge catégorie */}
        {post.category && (
          <div className="mb-6">
            <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-sfpa-ocre text-sfpa-anthracite text-[10px] font-bold uppercase tracking-[0.2em] shadow-lg">
              {post.category}
            </span>
          </div>
        )}

        {/* Titre — DOMINANT */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[56px] font-bold text-white leading-[1.05] tracking-tight mb-8">
          {post.title}
        </h1>

        {/* Extrait éditorial */}
        {post.excerpt && (
          <p className="text-lg md:text-xl text-white/85 leading-relaxed max-w-2xl mb-10 font-light">
            {post.excerpt}
          </p>
        )}

        {/* Meta bar */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-white/70 text-[12px]">
          {post.author && (
            <div className="inline-flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-white/15 backdrop-blur-sm ring-1 ring-white/20 flex items-center justify-center text-white font-bold text-[12px]">
                {post.author.firstName.charAt(0).toUpperCase()}
              </div>
              <span className="text-white/90 font-medium">
                {post.author.firstName} {post.author.lastName}
              </span>
            </div>
          )}

          <div className="inline-flex items-center gap-1.5">
            <span className="w-1 h-1 rounded-full bg-white/40" />
            {published}
          </div>

          <div className="inline-flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            {minutes} min de lecture
          </div>
        </div>
      </div>
    </section>
  );
}