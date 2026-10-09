// src/lib/types.ts

export interface Media {
  id: string;
  url: string;
  thumbnailUrl: string;
  alt: string | null;
  width: number | null;
  height: number | null;
}

// --- Réponses API ---
export interface ApiSuccess<T> {
  success: true;
  message?: string;
  data: T;
}

export interface ApiList<T> {
  success: true;
  data: {
    items: T[];
    pagination?: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
      hasNext: boolean;
      hasPrev: boolean;
    };
  };
}

export interface ApiError {
  success: false;
  message: string;
}

// --- Posts ---
export interface PostAuthor {
  id: string;
  firstName: string;
  lastName: string;
}

export interface PostListItem {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  category: string | null;
  tags: string[];
  publishedAt: string;
  coverImage: Media | null;
  author: PostAuthor | null;
}

export interface Post extends PostListItem {
  content: string | null;
  coverImageId: string | null;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

// --- Projects ---
export type ProjectCategory = 'formation' | 'agriculture' | 'eau' | 'energie' | 'reforestation' | 'autre';
export type ProjectStatus = 'en_cours' | 'termine' | 'a_venir';

export interface ProjectListItem {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  category: ProjectCategory;
  country: string | null;
  status: ProjectStatus;
  publishedAt: string | null;
  coverImage: Media | null;
}

export interface Project extends ProjectListItem {
  description: string | null;
  coverImageId: string | null;
  startDate: string | null;
  endDate: string | null;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

// --- Pages ---
export interface PageHero {
  title: string;
  subtitle?: string;
  imageId?: string;
  image?: Media;
  cta?: {
    label: string;
    url: string;
  };
}

export interface PageSectionText {
  type: 'text';
  title: string;
  body: string;
}

export interface PageSectionStats {
  type: 'stats';
  items: { value: string; label: string }[];
}

export type PageSection = PageSectionText | PageSectionStats;

export interface PageContent {
  hero?: PageHero;
  sections?: PageSection[];
}

export interface Page {
  id: string;
  slug: string;
  title: string;
  content: PageContent;
  metaTitle: string | null;
  metaDescription: string | null;
  updatedAt: string;
}

// --- Formations ---
export type FormationCategory = 'agriculture' | 'batiment' | 'mecanique' | 'artisanat' | 'numerique' | 'autre';

export interface FormationListItem {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  duration: string | null;
  level: string | null;
  audience: string | null;
  category: FormationCategory;
  displayOrder: number;
  coverImage: Media | null;
}

export interface Formation extends FormationListItem {
  description: string | null;
  objectives: string[];
  coverImageId: string | null;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

// --- Partners ---
export type PartnerType = 'ecole' | 'entreprise' | 'collectivite' | 'association' | 'autre';

export interface Partner {
  id: string;
  slug: string;
  name: string;
  type: PartnerType;
  description: string | null;
  website: string | null;
  country: string | null;
  displayOrder: number;
  logo: Media | null;
}


// --- Testimonials ---
export interface Testimonial {
  id: string;
  authorName: string;
  authorRole: string | null;
  authorLocation: string | null;
  quote: string;
  rating: number | null;
  isFeatured: boolean;
  publishedAt: string;
  authorImage: Media | null;
}

export interface CreateTestimonialInput {
  authorName: string;
  authorEmail?: string;
  authorRole?: string;
  authorLocation?: string;
  quote: string;
  rating?: number;
}