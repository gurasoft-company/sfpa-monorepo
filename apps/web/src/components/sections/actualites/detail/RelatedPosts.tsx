import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Clock } from 'lucide-react';
import { Container } from '@/components/layout/Container';
import type { PostListItem } from '@/lib/types';

export function RelatedPosts({ posts }: { posts: PostListItem[] }) {
  return (
    <section className="relative py-14 lg:py-16 bg-gray-50">
      <Container>
        <div className="max-w-5xl mx-auto">
          {/* Label de section */}
          <div className="flex items-center gap-3 mb-8">
            <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-sfpa-olive">
              À lire aussi
            </span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {posts.map((post) => (
              <Link
                key={post.id}
                href={`/actualites/${post.slug}`}
                className="group flex flex-col bg-white rounded-xl overflow-hidden border border-gray-100 hover:border-sfpa-olive/30 hover:shadow-md transition-all duration-300"
              >
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
                    <div className="w-full h-full flex items-center justify-center bg-sfpa-olive/10">
                      <span className="text-sfpa-olive/40 text-[10px] uppercase tracking-widest">
                        SFPA
                      </span>
                    </div>
                  )}
                  {post.category && (
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-sm">
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-sfpa-olive">
                        {post.category}
                      </span>
                    </div>
                  )}
                </div>

                <div className="p-5 flex flex-col flex-grow">
                  <div className="flex items-center gap-2 mb-2 text-[10px] uppercase tracking-wider">
                    <span className="text-sfpa-ocre font-semibold">
                      {new Date(post.publishedAt).toLocaleDateString('fr-FR', {
                        day: 'numeric',
                        month: 'long',
                      })}
                    </span>
                  </div>

                  <h3 className="text-[15px] font-bold text-sfpa-anthracite leading-snug mb-2 group-hover:text-sfpa-olive transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-[13px] text-gray-500 leading-relaxed line-clamp-2 mb-4 flex-grow">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <span className="text-[11px] text-gray-500">
                      ✍️ {post.author ? `${post.author.firstName} ${post.author.lastName}` : 'SFPA'}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-sfpa-olive group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}