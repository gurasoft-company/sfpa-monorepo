import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { api } from '@/lib/api';
import { ReadingProgress } from '@/components/sections/actualites/detail/ReadingProgress';
import { PostHero } from '@/components/sections/actualites/detail/PostHero';
import { PostContent } from '@/components/sections/actualites/detail/PostContent';
import { AuthorCard } from '@/components/sections/actualites/detail/AuthorCard';
import { PostShareBar } from '@/components/sections/actualites/detail/PostShareBar';
import { RelatedPosts } from '@/components/sections/actualites/detail/RelatedPosts';
import { PostFinalCTA } from '@/components/sections/actualites/detail/PostFinalCTA';
import type { Post } from '@/lib/types';

type Params = { slug: string };

export async function generateMetadata({
  params,
}: {
  params: Params | Promise<Params>;
}): Promise<Metadata> {
  try {
    const { slug } = await Promise.resolve(params);
    const res = await api.getPost(slug);
    const post = res.data.post;
    return {
      title: `${post.title} | SFPA — La Terre entre nos mains`,
      description: post.excerpt || '',
    };
  } catch {
    return { title: 'Article | SFPA' };
  }
}

export default async function PostDetailPage({
  params,
}: {
  params: Params | Promise<Params>;
}) {
  const { slug } = await Promise.resolve(params);

  if (!slug || slug === 'undefined') {
    notFound();
  }

  let post: Post;
  try {
    const res = await api.getPost(slug);
    post = res.data.post;
  } catch {
    notFound();
  }

  const relatedRes = await api
    .getPosts(`?category=${post.category}&limit=4`)
    .catch(() => null);
  const related = (relatedRes?.data.items ?? [])
    .filter((p) => p.slug !== post.slug)
    .slice(0, 3);

  return (
    <>
      <ReadingProgress />
      <PostHero post={post} />

      {/* Contenu principal — centré, largeur confortable de lecture */}
      <section className="relative py-12 lg:py-16 bg-white">
        <div className="max-w-3xl mx-auto px-5 sm:px-6 lg:px-8">
          <PostContent post={post} />
          <PostShareBar post={post} />
          {post.author && <AuthorCard author={post.author} />}
        </div>
      </section>

      {related.length > 0 && <RelatedPosts posts={related} />}
      <PostFinalCTA />
    </>
  );
}