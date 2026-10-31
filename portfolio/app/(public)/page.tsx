'use client'

import {
  HeroSection,
  StatsSection,
  ServicesPreview,
  FeaturedProjects,
  SkillsMarquee,
  TestimonialsSection,
  CTABanner,
} from '@/components/sections/HomePageSections'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <ServicesPreview />
      <FeaturedProjects />
      <SkillsMarquee />
      <TestimonialsSection />
      <CTABanner />
    </>
  )
}
