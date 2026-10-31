'use client'

import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import SectionHeader from '@/components/ui/SectionHeader'
import TextReveal from '@/components/animations/TextReveal'

const timeline = [
  { year: '2022', title: 'Started Web Development & Freelance', desc: 'Began mastering modern web development (React, Next.js, TypeScript) and delivered first client websites and landing pages.' },
  { year: '2023', title: 'Full-Stack & Database Architecture', desc: 'Expanded into scalable backend systems, Node.js, Supabase, database architecture, and building comprehensive SaaS platforms.' },
  { year: '2024', title: 'E-Commerce & API Integrations', desc: 'Specialized in high-impact e-commerce platforms and automated API solutions including WhatsApp Business API and payment gateways.' },
  { year: '2025', title: 'Premium Digital Experiences', desc: 'Partnered with established brands, sports leagues, and media platforms to build world-class web applications and interactive motion design.' },
  { year: '2026', title: 'Founder & Lead Developer', desc: 'Leading end-to-end digital engineering, building enterprise-grade architectures, SaaS products like GrowthWapi, and delivering standout digital platforms.' },
]

const tools = [
  { name: 'Next.js', category: 'Frontend' },
  { name: 'React', category: 'Frontend' },
  { name: 'TypeScript', category: 'Frontend' },
  { name: 'Tailwind CSS', category: 'Frontend' },
  { name: 'Framer Motion', category: 'Animation' },
  { name: 'GSAP', category: 'Animation' },
  { name: 'Node.js', category: 'Backend' },
  { name: 'Supabase', category: 'Backend' },
  { name: 'PostgreSQL', category: 'Database' },
  { name: 'Figma', category: 'Design' },
  { name: 'Vercel', category: 'Deploy' },
  { name: 'Git', category: 'Tools' },
]

const expertisePoints = [
  { title: 'Business Websites', desc: 'High-converting corporate and business websites that establish credibility and drive growth.' },
  { title: 'E-Commerce Platforms', desc: 'Feature-rich online stores with seamless checkout, inventory management, and payment integration.' },
  { title: 'SaaS Applications', desc: 'Scalable multi-tenant SaaS products with subscription billing, dashboards, and real-time features.' },
  { title: 'Media & Content Sites', desc: 'Lightning-fast media platforms with CMS, editorial workflows, and optimized content delivery.' },
  { title: 'Landing Pages', desc: 'Conversion-optimized landing pages with A/B testing readiness and lead capture.' },
  { title: 'API Integrations', desc: 'WhatsApp Business API, payment gateways, CRM systems, and custom REST API development.' },
]

export default function AboutPage() {
  const photoRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: photoRef,
    offset: ['start end', 'end start'],
  })
  const photoY = useTransform(scrollYProgress, [0, 1], [60, -60])

  return (
    <div className="pt-24 pb-20">
      {/* Hero / Intro */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text */}
            <div>
              <motion.span
                className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 text-xs font-semibold uppercase tracking-widest text-[#1E5BFF] bg-blue-50 rounded-full border border-blue-100"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#1E5BFF] animate-pulse" />
                About Me
              </motion.span>

              <TextReveal
                text="Hi, I'm Saurav Prasad"
                as="h1"
                className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-4"
              />

              <motion.p
                className="text-xl text-[#1E5BFF] font-semibold mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                A Passionate Website Designer & Full-Stack Developer
              </motion.p>

              <motion.div
                className="text-base text-gray-500 leading-relaxed space-y-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                <p>
                  I&apos;m a full-stack developer and designer with a passion for crafting digital experiences that are not just visually stunning — but strategically built to perform. With expertise spanning business websites, e-commerce platforms, SaaS applications, media sites, landing pages, and API integrations, I bring your vision to life with precision and creativity.
                </p>
                <p>
                  Every project I take on receives my full attention — from the initial concept and wireframing to the final pixel-perfect implementation. I believe great websites don&apos;t just look good; they solve real problems, tell compelling stories, and drive measurable results for businesses.
                </p>
              </motion.div>
            </div>

            {/* Photo with parallax */}
            <motion.div
              ref={photoRef}
              className="flex justify-center lg:justify-end"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <motion.div
                style={{ y: photoY }}
                className="relative w-80 h-96 lg:w-96 lg:h-[480px] rounded-3xl overflow-hidden shadow-2xl shadow-blue-500/10"
              >
                <Image
                  src="/Saurav Prasad.png.png"
                  alt="Saurav Prasad"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 320px, 384px"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1E5BFF]/20 to-transparent" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Experience Timeline */}
      <section className="py-16 md:py-24 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            label="My Journey"
            title="Experience Timeline"
            description="From curious learner to seasoned professional — here's how my journey unfolded."
          />

          <div className="max-w-3xl mx-auto">
            {timeline.map((item, i) => (
              <motion.div
                key={item.year}
                className="relative pl-12 pb-10 last:pb-0 group"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
              >
                {/* Line */}
                {i < timeline.length - 1 && (
                  <div className="absolute left-[18px] top-10 bottom-0 w-px bg-gradient-to-b from-[#1E5BFF] to-gray-200" />
                )}
                
                {/* Dot */}
                <div className="absolute left-2 top-1 w-5 h-5 rounded-full bg-white border-[3px] border-[#1E5BFF] group-hover:bg-[#1E5BFF] transition-colors duration-300 z-10" />

                <span className="inline-block px-3 py-1 text-xs font-bold text-[#FF7A1A] bg-orange-50 rounded-full mb-2">
                  {item.year}
                </span>
                <h3 className="text-lg font-bold text-gray-900 mb-1">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What Makes Me an Expert */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            label="Expertise"
            title="What Makes Me an Expert"
            description="Years of hands-on experience across diverse industries and project types."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {expertisePoints.map((point, i) => (
              <motion.div
                key={point.title}
                className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-blue-500/10 hover:border-blue-100 transition-all duration-300 group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={{ y: -5 }}
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1E5BFF] to-[#3B7BFF] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <span className="text-white font-bold text-sm">{String(i + 1).padStart(2, '0')}</span>
                </div>
                <h3 className="text-base font-bold text-gray-900 mb-2 group-hover:text-[#1E5BFF] transition-colors">
                  {point.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">{point.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tools & Technologies */}
      <section className="py-16 md:py-24 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            label="Tools"
            title="Technologies I Work With"
            description="My toolkit for building exceptional digital products."
          />

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {tools.map((tool, i) => (
              <motion.div
                key={tool.name}
                className="flex flex-col items-center p-5 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-lg hover:border-[#1E5BFF]/20 hover:bg-blue-50/30 transition-all duration-300 group cursor-default"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
                whileHover={{ y: -3 }}
              >
                <span className="text-base font-bold text-gray-900 group-hover:text-[#1E5BFF] transition-colors mb-1">
                  {tool.name}
                </span>
                <span className="text-xs text-gray-400">{tool.category}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
