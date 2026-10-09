import { MetadataRoute } from 'next';
import { api } from '@/lib/api';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  // Pages statiques
  const staticPages = [
    '', '/a-propos', '/actions', '/formations', '/actualites', '/partenaires', '/contact', '/devenir-benevole', '/adherer', '/faire-un-don', '/mentions-legales'
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // Pages dynamiques (Projets, Posts, Formations)
  const [projectsRes, postsRes, formationsRes] = await Promise.all([
    api.getProjects().catch(() => null),
    api.getPosts().catch(() => null),
    api.getFormations().catch(() => null),
  ]);

  const projectPages = (projectsRes?.data.items || []).map((p) => ({
    url: `${baseUrl}/actions/${p.slug}`,
    lastModified: p.publishedAt ? new Date(p.publishedAt) : new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const postPages = (postsRes?.data.items || []).map((p) => ({
    url: `${baseUrl}/actualites/${p.slug}`,
    lastModified: new Date(p.publishedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const formationPages = (formationsRes?.data.items || []).map((f) => ({
    url: `${baseUrl}/formations/${f.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticPages, ...projectPages, ...postPages, ...formationPages];
}