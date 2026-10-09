import type { Metadata } from 'next';
import { api } from '@/lib/api';
import { HeroActualites } from '@/components/sections/actualites/HeroActualites';
import { FeaturedPost } from '@/components/sections/actualites/FeaturedPost';
import { PostsGrid } from '@/components/sections/actualites/PostsGrid';
import { ActualitesFinalCTA } from '@/components/sections/actualites/ActualitesFinalCTA';

export const metadata: Metadata = {
  title: 'Actualités | SFPA — La Terre entre nos mains',
  description:
    "Le journal de SFPA : projets de terrain, formations, missions santé, rencontres en Provence et en Afrique.",
};

export default async function ActualitesPage() {
  const res = await api.getPosts().catch(() => null);
  const posts = res?.data.items ?? [];

  const [featured, ...rest] = posts;

  return (
    <>
      <HeroActualites total={posts.length} />
      {featured && <FeaturedPost post={featured} />}
      {rest.length > 0 && <PostsGrid posts={rest} />}
      <ActualitesFinalCTA />
    </>
  );
}