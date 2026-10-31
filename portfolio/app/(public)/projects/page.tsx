'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ExternalLink, ArrowRight } from 'lucide-react'
import SectionHeader from '@/components/ui/SectionHeader'

const projects = [
  {
    title: 'SportsPe FB',
    slug: 'sportspefb',
    category: 'Business Website',
    image: '/sportspefb logo.png.png',
    desc: 'A sports federation business website with event management and membership features.',
    tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Supabase', 'Framer Motion'],
    url: 'https://sportspefb.org',
  },
  {
    title: 'The Take Studio',
    slug: 'thetakestudio',
    category: 'Media & Creative',
    image: '/thetakestudio logo.png.png',
    desc: 'Premium creative studio website with portfolio showcase and booking system.',
    tech: ['Next.js', 'TypeScript', 'GSAP', 'Tailwind CSS', 'Supabase'],
    url: 'https://thetakestudio.com',
  },
  {
    title: 'The Backstory Media',
    slug: 'thebackstorymedia',
    category: 'Media Website',
    image: '/thebackstorymedia logo.png.png',
    desc: 'Digital media platform with content management and editorial publishing features.',
    tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Supabase', 'Framer Motion'],
    url: 'https://thebackstorymedia.com',
  },
  {
    title: 'NPVL Official',
    slug: 'npvlofficial',
    category: 'Sports & Entertainment',
    image: '/npvl logo.png.png',
    desc: 'Official platform for NPVL league with live scores, teams, and tournament brackets.',
    tech: ['Next.js', 'TypeScript', 'Supabase', 'Tailwind CSS', 'GSAP'],
    url: 'https://npvlofficial.com',
  },
  {
    title: 'GrowthWapi',
    slug: 'growthwapi',
    category: 'SaaS / API Platform',
    image: '/Growthwapilogo.png.png',
    desc: 'WhatsApp API SaaS platform for business automation and bulk messaging.',
    tech: ['Next.js', 'TypeScript', 'Node.js', 'WhatsApp API', 'Supabase'],
    url: 'https://growthwapi.in',
  },
  {
    title: 'Veerteja Watertech',
    slug: 'veertejawatertech',
    category: 'E-Commerce',
    image: '/veertejawatertech logo.png.png',
    desc: 'E-commerce store for water treatment and purification products.',
    tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Supabase', 'Razorpay'],
    url: 'https://veertejawatertech.store',
  },
]

const categories = ['All', ...Array.from(new Set(projects.map(p => p.category)))]

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState('All')

  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter(p => p.category === activeCategory)

  return (
    <div className="pt-24 pb-20">
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            label="Portfolio"
            title="My Projects"
            description="A showcase of websites and web applications I've designed and developed for clients across various industries."
          />

          {/* Category Filters */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
                  activeCategory === cat
                    ? 'bg-gradient-to-r from-[#1E5BFF] to-[#3B7BFF] text-white shadow-lg shadow-blue-500/20'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, i) => (
                <motion.div
                  key={project.slug}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="group"
                >
                  <div className="relative rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-lg hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 h-full flex flex-col perspective-1000">
                    {/* Image with hover zoom */}
                    <div className="relative h-56 overflow-hidden bg-gray-50">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-contain p-8 group-hover:scale-110 transition-transform duration-700"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      {/* Overlay slide for desktop hover */}
                      <div className="hidden sm:flex absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 items-end p-5">
                        <div className="flex gap-2">
                          <a
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-4 py-2 bg-white rounded-full text-xs font-semibold text-gray-900 hover:bg-gray-100 transition-colors"
                          >
                            Visit Live Site <ExternalLink size={14} />
                          </a>
                          <Link
                            href={`/projects/${project.slug}`}
                            className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#1E5BFF] rounded-full text-xs font-semibold text-white hover:bg-blue-600 transition-colors"
                          >
                            Case Study <ArrowRight size={14} />
                          </Link>
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5 flex flex-col flex-1">
                      <span className="inline-block self-start px-3 py-1 text-xs font-medium text-[#1E5BFF] bg-blue-50 rounded-full mb-3">
                        {project.category}
                      </span>
                      <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-[#1E5BFF] transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-sm text-gray-500 leading-relaxed mb-4 flex-1">
                        {project.desc}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tech.slice(0, 4).map((t) => (
                          <span key={t} className="px-2.5 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded-md">
                            {t}
                          </span>
                        ))}
                        {project.tech.length > 4 && (
                          <span className="px-2.5 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded-md">
                            +{project.tech.length - 4}
                          </span>
                        )}
                      </div>

                      {/* Mobile Actions: Always visible on mobile */}
                      <div className="flex sm:hidden items-center gap-2 pt-4 border-t border-gray-100 mt-auto">
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-[#1E5BFF] rounded-xl text-xs font-semibold text-white shadow-sm hover:bg-[#1650cc] active:scale-95 transition-all"
                        >
                          Visit Live Site <ExternalLink size={14} />
                        </a>
                        <Link
                          href={`/projects/${project.slug}`}
                          className="inline-flex items-center justify-center gap-1 px-3.5 py-2.5 bg-gray-100 rounded-xl text-xs font-semibold text-gray-700 hover:bg-gray-200 active:scale-95 transition-all"
                        >
                          Case Study <ArrowRight size={14} />
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
