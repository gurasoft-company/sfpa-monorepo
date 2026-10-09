import { api } from '@/lib/api';
import { HeroSection } from '@/components/sections/home/HeroSection';
import { StatsSection } from '@/components/sections/home/StatsSection';
import { MissionSection } from '@/components/sections/home/MissionSection';
import { PillarsSection } from '@/components/sections/home/PillarsSection';
import { MethodSection } from '@/components/sections/home/MethodSection';
import { ChildrenSection } from '@/components/sections/home/ChildrenSection';
import { BridgeSection } from '@/components/sections/home/BridgeSection';
import { ImpactSection } from '@/components/sections/home/ImpactSection';
import { ProjectsSection } from '@/components/sections/home/ProjectsSection';
import { TestimonialsSection } from '@/components/sections/home/TestimonialsSection';
import { PostsSection } from '@/components/sections/home/PostsSection';
import { FinalCTA } from '@/components/sections/FinalCTA';

export default async function HomePage() {
  const [pageRes, projectsRes, postsRes, testimonialsRes] = await Promise.all([
    api.getPage('accueil').catch(() => null),
    api.getProjects('limit=3').catch(() => null),
    api.getPosts('limit=3').catch(() => null),
    api.getTestimonials('featured=true').catch(() => null),
  ]);

  const pageData = pageRes?.data.page;
  const projects = projectsRes?.data.items ?? [];
  const posts = postsRes?.data.items ?? [];
  const testimonials = testimonialsRes?.data.items ?? [];

  const hero = {
    title: pageData?.content?.hero?.title ?? 'La Terre entre nos mains, la fraternité dans nos cœurs.',
    subtitle:
      pageData?.content?.hero?.subtitle ??
     "Former, soigner, protéger — parce que prendre soin des Hommes et de la Terre est une même mission.",
    cta: {
      label: pageData?.content?.hero?.cta?.label ?? 'Découvrir nos actions',
      url: pageData?.content?.hero?.cta?.url ?? '/actions',
    },
  };

  return (
    <>
      <HeroSection hero={hero} />
      <StatsSection />
      <MissionSection />
      <PillarsSection />
      <MethodSection />
      <ChildrenSection />
      <BridgeSection />
      <ImpactSection />
      <ProjectsSection projects={projects} />
      <TestimonialsSection testimonials={testimonials} />
      <PostsSection posts={posts} />
      <FinalCTA />
    </>
  );
}