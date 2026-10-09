import Link from 'next/link';
import { Calendar, Tag, ArrowRight, Heart, Share2 } from 'lucide-react';
import type { Post } from '@/lib/types';

export function PostSidebar({ post }: { post: Post }) {
  const publishedDate = new Date(post.publishedAt).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <aside className="lg:sticky lg:top-24 h-fit">
      {/* Carte détails */}
      <div className="bg-gray-50 rounded-2xl border border-gray-100 p-6 mb-5">
        <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-sfpa-olive mb-4">
          Détails de l'article
        </h3>

        <ul className="space-y-4 text-[13.5px]">
          {post.category && (
            <li className="flex items-start gap-3">
              <Tag className="w-4 h-4 text-sfpa-olive mt-0.5 flex-shrink-0" />
              <div>
                <div className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold">
                  Catégorie
                </div>
                <div className="text-sfpa-anthracite font-medium">
                  {post.category}
                </div>
              </div>
            </li>
          )}

          <li className="flex items-start gap-3">
            <Calendar className="w-4 h-4 text-sfpa-olive mt-0.5 flex-shrink-0" />
            <div>
              <div className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold">
                Publié le
              </div>
              <div className="text-sfpa-anthracite font-medium">
                {publishedDate}
              </div>
            </div>
          </li>

          {post.author && (
            <li className="flex items-start gap-3">
              <div className="w-4 h-4 rounded-full bg-sfpa-olive text-white flex items-center justify-center text-[9px] font-bold mt-0.5 flex-shrink-0">
                {post.author.firstName.charAt(0).toUpperCase()}
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold">
                  Auteur
                </div>
                <div className="text-sfpa-anthracite font-medium">
                  {post.author.firstName} {post.author.lastName}
                </div>
              </div>
            </li>
          )}
        </ul>
      </div>

      {/* Carte don */}
      <div className="bg-sfpa-olive rounded-2xl p-6 text-white relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative">
          <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-sfpa-ocre mb-3">
            Soutenez nos actions
          </div>
          <h3 className="text-base font-bold mb-3 leading-snug">
            Faites la différence dès aujourd'hui
          </h3>
          <p className="text-[13px] text-white/85 leading-relaxed mb-5">
            Chaque don finance concrètement nos projets sur le terrain.
          </p>
          <Link
            href="/faire-un-don"
            className="inline-flex items-center justify-center gap-2 w-full bg-white text-sfpa-olive font-semibold px-5 py-3 rounded-full hover:bg-sfpa-sable transition shadow-sm text-[13px]"
          >
            <Heart className="w-4 h-4" /> Faire un don
          </Link>
        </div>
      </div>

      {/* Carte contact */}
      <div className="mt-5 p-5 rounded-2xl border border-gray-100 bg-white text-center">
        <p className="text-[12px] text-gray-500 leading-relaxed mb-3">
          Une question sur cet article ?
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center gap-1.5 text-sfpa-olive text-[11px] font-semibold uppercase tracking-wider hover:gap-2.5 transition-all"
        >
          Nous contacter
          <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
    </aside>
  );
}