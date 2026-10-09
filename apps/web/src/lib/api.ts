// src/lib/api.ts
import { ApiSuccess, ApiList, Post, PostListItem, Project, ProjectListItem, Formation, FormationListItem, Partner, Page, Testimonial, CreateTestimonialInput } from './types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

async function fetchApi<T>(path: string, options?: RequestInit & { next?: { revalidate?: number } }): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    next: options?.method === 'POST' ? undefined : { revalidate: 60 },
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: 'Erreur réseau' }));
    throw new Error(error.message || `API error: ${res.status}`);
  }
  return res.json();
}

export const api = {
  getPage: (slug: string) => fetchApi<ApiSuccess<{ page: Page }>>(`/public/pages/${slug}`),
  getProjects: (params?: string) => fetchApi<ApiList<ProjectListItem>>(`/public/projects${params ? `?${params}` : ''}`),
  getProject: (slug: string) => fetchApi<ApiSuccess<{ project: Project }>>(`/public/projects/${slug}`),
  getPosts: (params?: string) => fetchApi<ApiList<PostListItem>>(`/public/posts${params ? `?${params}` : ''}`),
  getPost: (slug: string) => fetchApi<ApiSuccess<{ post: Post }>>(`/public/posts/${slug}`),
  getFormations: () => fetchApi<ApiList<FormationListItem>>('/public/formations'),
  getFormation: (slug: string) => fetchApi<ApiSuccess<{ formation: Formation }>>(`/public/formations/${slug}`),
  getPartners: () => fetchApi<ApiList<Partner>>('/public/partners'),
    getTestimonials: (params?: string) => fetchApi<ApiList<Testimonial>>(`/public/testimonials${params ? `?${params}` : ''}`),
  createTestimonial: (data: CreateTestimonialInput) => fetchApi<ApiSuccess<{ id: string }>>('/public/testimonials', { method: 'POST', body: JSON.stringify(data) }),

  createMember: (data: any) => fetchApi<ApiSuccess<any>>('/public/members', { method: 'POST', body: JSON.stringify(data) }),
  createVolunteer: (data: any) => fetchApi<ApiSuccess<any>>('/public/volunteers', { method: 'POST', body: JSON.stringify(data) }),
  createContact: (data: any) => fetchApi<ApiSuccess<any>>('/public/contact', { method: 'POST', body: JSON.stringify(data) }),
};