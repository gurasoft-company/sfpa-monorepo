import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { Container } from '@/components/layout/Container';
import type { PostListItem } from '@/lib/types';

export function PostsSection({ posts }: { posts: PostListItem[] }) {
  if (posts.length === 0) return null;

  return (
    <section className="relative py-14 lg:py-16 bg-gray-50">
      <Container>
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="text-[10px] font-semibold uppercase tracking-[0.25em] text-sfpa-olive mb-3">
            Restez informés
          </div>
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-sfpa-anthracite mb-3 leading-tight">
            Dernières{' '}
            <span className="text-sfpa-olive">actualités</span>
          </h2>
          <div className="w-10 h-0.5 bg-sfpa-ocre mx-auto mb-4" />
          <p className="text-sm text-gray-600 leading-relaxed">
            Suivez nos projets, nos formations, nos rencontres sur le terrain.
          </p>
        </div>

        {/* 3 cartes articles — vertes avec image grise */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto mb-10">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/actualites/${post.slug}`}
              className="group relative rounded-xl overflow-hidden border border-sfpa-olive hover:shadow-lg transition-all duration-300 flex flex-col bg-sfpa-olive"
            >
              {/* Image en haut — placeholder gris si pas d'image */}
              <div className="relative h-40 overflow-hidden bg-gray-200">
                {post.coverImage ? (
                  <Image
                    src={post.coverImage.url}
                    alt={post.coverImage.alt || post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-gray-400 text-[10px] uppercase tracking-widest">
                      Aucune image
                    </span>
                  </div>
                )}

                {/* Overlay dégradé (uniquement si image) */}
                {post.coverImage && (
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                )}

                {/* Badge catégorie */}
                {post.category && (
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-sm">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-sfpa-olive">
                      {post.category}
                    </span>
                  </div>
                )}
              </div>

              {/* Contenu en vert */}
              <div className="relative p-5 flex flex-col flex-grow text-white">
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/5 rounded-full blur-2xl pointer-events-none" />

                {/* Date */}
                <div className="relative text-[10px] uppercase tracking-wider text-sfpa-ocre font-semibold mb-2">
                  {new Date(post.publishedAt).toLocaleDateString('fr-FR', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </div>

                {/* Titre */}
                <h3 className="relative text-base font-bold text-white mb-2 leading-snug">
                  {post.title}
                </h3>

                {/* Extrait */}
                <p className="relative text-[13.5px] text-white/85 leading-relaxed line-clamp-2 flex-grow mb-4">
                  {post.excerpt}
                </p>

                {/* Meta : auteur */}
                <div className="relative flex items-center justify-between text-[11px] text-white/70 pt-4 border-t border-white/15">
                  {post.author ? (
                    <span className="inline-flex items-center gap-1.5">
                      ✍️ {post.author.firstName} {post.author.lastName}
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5">✍️ SFPA</span>
                  )}
                </div>

                {/* Lien discret */}
                <div className="relative mt-3 inline-flex items-center gap-1.5 text-sfpa-ocre text-[11px] font-semibold uppercase tracking-wider group-hover:gap-2.5 transition-all">
                  Lire l'article
                  <ArrowRight className="w-3 h-3" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA centré */}
        <div className="text-center">
          <Link
            href="/actualites"
            className="inline-flex items-center gap-1.5 text-sfpa-olive text-[11px] font-semibold uppercase tracking-wider hover:gap-2.5 transition-all"
          >
            Toutes nos actualités
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </Container>
    </section>
  );
}