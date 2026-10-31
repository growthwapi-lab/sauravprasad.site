'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Image from 'next/image'
import { motion } from 'framer-motion'
import SectionHeader from '@/components/ui/SectionHeader'
import MagneticButton from '@/components/animations/MagneticButton'
import { ArrowLeft, ExternalLink } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

const defaultProjects = [
  {
    title: 'SportsPe FB',
    slug: 'sportspefb',
    category: 'Business Website',
    preview_image: '/sportspefb logo.png.png',
    description: 'A comprehensive sports federation business website featuring tournament management, real-time match tracking, and member federation onboarding portals.',
    short_description: 'Sports federation platform with live match updates and team registration.',
    tech_stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Supabase', 'Framer Motion'],
    live_url: 'https://sportspefb.org',
  },
  {
    title: 'The Take Studio',
    slug: 'thetakestudio',
    category: 'Media & Creative',
    preview_image: '/thetakestudio logo.png.png',
    description: 'A high-end creative agency portfolio showcasing video productions, cinematography portfolios, client case studies, and interactive booking forms.',
    short_description: 'Creative production agency showcase with motion design.',
    tech_stack: ['Next.js', 'TypeScript', 'GSAP', 'Tailwind CSS', 'Supabase'],
    live_url: 'https://thetakestudio.com',
  },
  {
    title: 'The Backstory Media',
    slug: 'thebackstorymedia',
    category: 'Media Website',
    preview_image: '/thebackstorymedia logo.png.png',
    description: 'A modern digital journalism and media publishing house built for fast content distribution, dynamic categories, and editorial staff management.',
    short_description: 'Digital journalism publication platform.',
    tech_stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Supabase', 'Framer Motion'],
    live_url: 'https://thebackstorymedia.com',
  },
  {
    title: 'NPVL Official',
    slug: 'npvlofficial',
    category: 'Sports & Entertainment',
    preview_image: '/npvl logo.png.png',
    description: 'The official digital tournament grounds for the NPVL championship featuring live brackets, team rosters, schedules, and fan interactions.',
    short_description: 'Official sports league portal.',
    tech_stack: ['Next.js', 'TypeScript', 'Supabase', 'Tailwind CSS', 'GSAP'],
    live_url: 'https://npvlofficial.com',
  },
  {
    title: 'GrowthWapi',
    slug: 'growthwapi',
    category: 'SaaS / API Platform',
    preview_image: '/Growthwapilogo.png.png',
    description: 'A powerful cloud messaging gateway and developer platform empowering businesses to automate customer communications at scale.',
    short_description: 'Developer API platform for WhatsApp workflows.',
    tech_stack: ['Next.js', 'TypeScript', 'Node.js', 'WhatsApp API', 'Supabase'],
    live_url: 'https://growthwapi.in',
  },
  {
    title: 'Veerteja Watertech',
    slug: 'veertejawatertech',
    category: 'E-Commerce',
    preview_image: '/veertejawatertech logo.png.png',
    description: 'A robust B2B industrial catalog and filtration solutions portal providing quote requests, product specifications, and inquiry handling.',
    short_description: 'Industrial tech product catalog and quote engine.',
    tech_stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Supabase'],
    live_url: 'https://veertejawatertech.com',
  },
]

export default function ProjectDetailPage() {
  const router = useRouter()
  const params = useParams()
  const slug = params?.slug as string
  const [project, setProject] = useState<any>(null)
  const [caseStudy, setCaseStudy] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!slug) return

    async function fetchData() {
      try {
        const supabase = createClient()
        const { data: projData } = await supabase
          .from('projects')
          .select('*')
          .eq('slug', slug)
          .single()

        if (projData) {
          setProject(projData)
          const { data: csData } = await supabase
            .from('case_studies')
            .select('*')
            .eq('project_id', projData.id)
            .single()
          setCaseStudy(csData)
        } else {
          // Fallback to local default projects
          const fallback = defaultProjects.find((p) => p.slug === slug)
          if (fallback) {
            setProject(fallback)
          }
        }
      } catch (err) {
        console.warn('Error fetching project from Supabase, checking local defaults:', err)
        const fallback = defaultProjects.find((p) => p.slug === slug)
        if (fallback) {
          setProject(fallback)
        }
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [slug])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <motion.div
          className="w-12 h-12 border-4 border-[#1E5BFF] border-t-transparent rounded-full"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1 }}
        />
      </div>
    )
  }

  if (!project) {
    return (
      <div className="text-center py-32">
        <p className="text-gray-500 text-lg">Project not found.</p>
        <button
          onClick={() => router.back()}
          className="mt-4 px-6 py-2.5 bg-[#1E5BFF] text-white rounded-full font-medium hover:bg-[#1650cc] transition-colors"
        >
          Go Back
        </button>
      </div>
    )
  }

  return (
    <div className="pt-24 pb-20">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <MagneticButton>
          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 mb-6 text-sm text-gray-600 hover:text-gray-900 transition-colors cursor-pointer"
          >
            <ArrowLeft size={16} /> Back to Projects
          </button>
        </MagneticButton>
        <SectionHeader
          label="Project"
          title={project.title}
          description={project.short_description || project.description}
        />
        {/* Hero Image */}
        {project.preview_image && (
          <motion.div
            className="relative w-full h-80 sm:h-96 md:h-[450px] rounded-2xl overflow-hidden mb-12 bg-gray-100 flex items-center justify-center"
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.4 }}
          >
            <Image
              src={project.preview_image}
              alt={project.title}
              fill
              className="object-contain p-8"
            />
          </motion.div>
        )}
        {/* Details */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-100 shadow-sm">
            <h3 className="text-lg font-semibold mb-3 text-[#1E5BFF]">Overview</h3>
            <p className="text-gray-600 leading-relaxed">{project.description}</p>
            {project.live_url && (
              <a
                href={project.live_url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 w-full sm:w-auto justify-center inline-flex items-center gap-2 px-6 py-3 bg-[#1E5BFF] text-white rounded-full font-semibold text-sm hover:bg-[#1650cc] shadow-md shadow-blue-500/20 active:scale-95 transition-all"
              >
                Visit Live Site <ExternalLink size={16} />
              </a>
            )}
          </div>
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-100 shadow-sm">
            <h3 className="text-lg font-semibold mb-3 text-[#1E5BFF]">Tech Stack</h3>
            <ul className="flex flex-wrap gap-2">
              {project.tech_stack?.map((tech: string) => (
                <li
                  key={tech}
                  className="px-3.5 py-1.5 text-sm bg-gray-100 rounded-full text-gray-700 font-medium"
                >
                  {tech}
                </li>
              ))}
            </ul>
          </div>
        </div>
        {/* Gallery */}
        {project.gallery_images && project.gallery_images.length > 0 && (
          <div className="mb-12">
            <h3 className="text-lg font-semibold mb-4 text-[#1E5BFF]">Gallery</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {project.gallery_images.map((img: string, i: number) => (
                <motion.div
                  key={i}
                  className="relative w-full h-48 rounded-lg overflow-hidden bg-gray-50"
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.3 }}
                >
                  <Image
                    src={img}
                    alt={`${project.title} screenshot ${i + 1}`}
                    fill
                    className="object-cover"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        )}
        {/* Case Study */}
        {caseStudy && (
          <div className="bg-gray-50 p-8 rounded-2xl shadow-inner border border-gray-100">
            <h3 className="text-2xl font-bold mb-4 text-[#1E5BFF]">Case Study</h3>
            <div
              className="prose prose-sm max-w-none text-gray-700"
              dangerouslySetInnerHTML={{ __html: typeof caseStudy.content === 'string' ? caseStudy.content : JSON.stringify(caseStudy.content) }}
            />
          </div>
        )}
      </section>
    </div>
  )
}
