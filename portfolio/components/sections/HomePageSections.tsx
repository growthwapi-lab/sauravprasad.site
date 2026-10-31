'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ExternalLink, Star, ChevronLeft, ChevronRight } from 'lucide-react'
import MagneticButton from '@/components/animations/MagneticButton'
import TextReveal from '@/components/animations/TextReveal'
import SectionHeader from '@/components/ui/SectionHeader'

/* ============================
   HERO SECTION
   ============================ */
const roles = [
  'Website Designer',
  'Full-Stack Developer',
  'UI/UX Expert',
  'E-Commerce Specialist',
  'SaaS Builder',
  'API Integration Expert',
]

export function HeroSection() {
  const [roleIndex, setRoleIndex] = useState(0)
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], [0, 150])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length)
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden pt-20"
    >
      {/* Background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, #1E5BFF 0%, transparent 70%)' }}
          animate={{ scale: [1, 1.2, 1], x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -bottom-20 -left-20 w-[400px] h-[400px] rounded-full opacity-15"
          style={{ background: 'radial-gradient(circle, #FF7A1A 0%, transparent 70%)' }}
          animate={{ scale: [1, 1.3, 1], x: [0, -20, 0], y: [0, 30, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-5"
          style={{ background: 'radial-gradient(circle, #1E5BFF 0%, transparent 60%)' }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />
      </div>

      <motion.div style={{ y, opacity }} className="w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            {/* Left content */}
            <div className="order-2 lg:order-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-100 rounded-full mb-6"
              >
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-sm font-medium text-gray-700">Available for new projects</span>
              </motion.div>

              <TextReveal
                text="Building Digital Experiences That"
                as="h1"
                className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 leading-[1.1] mb-2"
              />

              <motion.div
                className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 leading-[1.15]"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                <span className="bg-gradient-to-r from-[#1E5BFF] to-[#FF7A1A] bg-clip-text text-transparent inline-block pb-1">
                  Stand Out & Convert
                </span>
              </motion.div>

              {/* Rotating roles */}
              <motion.div
                className="flex items-center gap-3 mb-6 h-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                <span className="text-sm text-gray-400 uppercase tracking-wider">I am a</span>
                <div className="relative h-8 overflow-hidden">
                  <motion.div
                    key={roleIndex}
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -30, opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="text-lg font-semibold text-[#1E5BFF]"
                  >
                    {roles[roleIndex]}
                  </motion.div>
                </div>
                <span className="w-px h-5 bg-[#FF7A1A] animate-pulse" />
              </motion.div>

              <motion.p
                className="text-base sm:text-lg text-gray-500 leading-relaxed max-w-xl mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
              >
                I design and develop premium websites that captivate your audience, grow your brand, and drive real results — from business sites to SaaS platforms.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                className="flex flex-wrap gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.6 }}
              >
                <MagneticButton>
                  <Link
                    href="/projects"
                    className="group relative inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold text-white bg-gradient-to-r from-[#1E5BFF] to-[#3B7BFF] rounded-full hover:shadow-xl hover:shadow-blue-500/25 transition-all duration-300 overflow-hidden"
                  >
                    <span className="relative z-10">View Projects</span>
                    <ArrowRight size={18} className="relative z-10 group-hover:translate-x-1 transition-transform" />
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                  </Link>
                </MagneticButton>
                <MagneticButton>
                  <Link
                    href="/contact"
                    className="group inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold text-gray-700 bg-white border-2 border-gray-200 rounded-full hover:border-[#FF7A1A] hover:text-[#FF7A1A] transition-all duration-300"
                  >
                    Hire Me
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </MagneticButton>
              </motion.div>
            </div>

            {/* Right image */}
            <motion.div
              className="order-1 lg:order-2 flex justify-center lg:justify-end"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.8, type: 'spring', stiffness: 100 }}
            >
              <div className="relative">
                {/* Floating shapes */}
                <motion.div
                  className="absolute -top-6 -right-6 w-20 h-20 rounded-2xl bg-gradient-to-br from-[#1E5BFF] to-[#3B7BFF] opacity-80"
                  animate={{ y: [-10, 10, -10], rotate: [0, 10, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                />
                <motion.div
                  className="absolute -bottom-4 -left-8 w-16 h-16 rounded-full bg-gradient-to-br from-[#FF7A1A] to-[#FF9D4D] opacity-80"
                  animate={{ y: [10, -10, 10], rotate: [0, -15, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                />
                <motion.div
                  className="absolute top-1/2 -right-12 w-8 h-8 rounded-full bg-[#1E5BFF]/30"
                  animate={{ y: [-20, 20, -20] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                />

                {/* Main photo */}
                <div className="relative w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-3xl overflow-hidden border-4 border-white shadow-2xl shadow-blue-500/10">
                  <Image
                    src="/Saurav Prasad.png.png"
                    alt="Saurav Prasad - Website Designer & Full-Stack Developer"
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 640px) 288px, (max-width: 1024px) 320px, 384px"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1E5BFF]/10 to-transparent" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}

/* ============================
   STATS SECTION
   ============================ */
const stats = [
  { label: 'Projects Completed', value: 50, suffix: '+' },
  { label: 'Happy Clients', value: 40, suffix: '+' },
  { label: 'Years Experience', value: 4, suffix: '+' },
  { label: 'Success Rate', value: 100, suffix: '%' },
]

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (!isInView) return
    let start = 0
    const end = value
    const duration = 2000
    const step = Math.ceil(end / (duration / 16))

    const timer = setInterval(() => {
      start += step
      if (start >= end) {
        setCount(end)
        clearInterval(timer)
      } else {
        setCount(start)
      }
    }, 16)

    return () => clearInterval(timer)
  }, [isInView, value])

  return (
    <span ref={ref} className="tabular-nums">
      {count}{suffix}
    </span>
  )
}

export function StatsSection() {
  return (
    <section className="py-16 md:py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="relative text-center p-6 md:p-8 rounded-2xl bg-white border border-gray-100 shadow-lg shadow-gray-100/50 group hover:shadow-xl hover:shadow-blue-500/10 hover:border-blue-100 transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <div className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-[#1E5BFF] to-[#FF7A1A] bg-clip-text text-transparent mb-2">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </div>
              <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
              {/* Glow effect on hover */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ============================
   SERVICES PREVIEW
   ============================ */
const servicesPreview = [
  { icon: '🎨', title: 'Website Design', desc: 'Stunning, conversion-focused designs' },
  { icon: '💻', title: 'Full-Stack Dev', desc: 'End-to-end web development' },
  { icon: '🛒', title: 'E-Commerce', desc: 'Feature-rich online stores' },
  { icon: '🚀', title: 'SaaS & Web Apps', desc: 'Scalable software solutions' },
  { icon: '🔗', title: 'API Integrations', desc: 'WhatsApp, payments & more' },
  { icon: '📱', title: 'Landing Pages', desc: 'High-converting pages' },
]

export function ServicesPreview() {
  return (
    <section className="py-20 md:py-28 bg-gray-50/50 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          label="What I Do"
          title="Services I Offer"
          description="From concept to deployment, I deliver premium digital solutions tailored to your business needs."
        />

        {/* Desktop / Laptop Grid View (Original Multi-column Grid) */}
        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicesPreview.map((service, i) => (
            <motion.div
              key={service.title}
              className="group p-6 md:p-8 rounded-2xl bg-white/70 backdrop-blur-sm border border-gray-100 hover:border-blue-200 shadow-sm hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -5 }}
            >
              <span className="text-4xl block mb-4">{service.icon}</span>
              <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-[#1E5BFF] transition-colors">
                {service.title}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">{service.desc}</p>
              {/* Animated gradient border bottom */}
              <div className="mt-4 h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-[#1E5BFF] to-[#FF7A1A] transition-all duration-500 rounded-full" />
            </motion.div>
          ))}
        </div>

        {/* Mobile View Only - Side Carousel */}
        <div className="sm:hidden">
          <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 px-4 -mx-4 scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {servicesPreview.map((service) => (
              <div
                key={service.title}
                className="w-[85vw] flex-shrink-0 snap-center p-6 rounded-2xl bg-white/90 backdrop-blur-sm border border-gray-100 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <span className="text-4xl block mb-4">{service.icon}</span>
                  <h3 className="text-lg font-bold text-gray-900 mb-2 text-[#1E5BFF]">
                    {service.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{service.desc}</p>
                </div>
                <div className="mt-4 h-0.5 w-full bg-gradient-to-r from-[#1E5BFF] to-[#FF7A1A] rounded-full opacity-60" />
              </div>
            ))}
          </div>

          {/* Mobile Swipe Hint */}
          <p className="text-center text-xs text-gray-400 mt-2 flex items-center justify-center gap-1.5">
            <span>←</span> Swipe to explore services <span>→</span>
          </p>
        </div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-[#1E5BFF] font-semibold hover:gap-3 transition-all"
          >
            View All Services <ArrowRight size={18} />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

/* ============================
   FEATURED PROJECTS
   ============================ */
const featuredProjects = [
  {
    title: 'SportsPe FB',
    slug: 'sportspefb',
    category: 'Business Website',
    image: '/sportspefb logo.png.png',
    desc: 'Sports federation platform with event management and membership features.',
    tech: ['Next.js', 'TypeScript', 'Supabase'],
    url: 'https://sportspefb.org',
  },
  {
    title: 'The Take Studio',
    slug: 'thetakestudio',
    category: 'Media & Creative',
    image: '/thetakestudio logo.png.png',
    desc: 'Premium creative studio website with portfolio showcase.',
    tech: ['Next.js', 'GSAP', 'Tailwind CSS'],
    url: 'https://thetakestudio.com',
  },
  {
    title: 'The Backstory Media',
    slug: 'thebackstorymedia',
    category: 'Media Website',
    image: '/thebackstorymedia logo.png.png',
    desc: 'Digital media platform with content management features.',
    tech: ['Next.js', 'Supabase', 'Framer Motion'],
    url: 'https://thebackstorymedia.com',
  },
  {
    title: 'NPVL Official',
    slug: 'npvlofficial',
    category: 'Sports & Entertainment',
    image: '/npvl logo.png.png',
    desc: 'National Premier Volleyball League digital platform.',
    tech: ['Next.js', 'TypeScript', 'GSAP'],
    url: 'https://npvlofficial.com',
  },
  {
    title: 'GrowthWapi',
    slug: 'growthwapi',
    category: 'SaaS / API Platform',
    image: '/Growthwapilogo.png.png',
    desc: 'WhatsApp API SaaS for business automation.',
    tech: ['Next.js', 'Node.js', 'WhatsApp API'],
    url: 'https://growthwapi.in',
  },
  {
    title: 'Veerteja Watertech',
    slug: 'veertejawatertech',
    category: 'E-Commerce',
    image: '/veertejawatertech logo.png.png',
    desc: 'Full-featured e-commerce for water treatment products.',
    tech: ['Next.js', 'Supabase', 'Razorpay'],
    url: 'https://veertejawatertech.store',
  },
]

export function FeaturedProjects() {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return
    const scrollAmount = 400
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    })
  }

  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-12">
          <div>
            <SectionHeader
              label="My Work"
              title="Featured Projects"
              description="Handpicked projects that showcase my expertise across different industries."
              center={false}
            />
          </div>
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={() => scroll('left')}
              className="w-12 h-12 rounded-full border-2 border-gray-200 flex items-center justify-center hover:border-[#1E5BFF] hover:text-[#1E5BFF] transition-colors"
              aria-label="Scroll left"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-12 h-12 rounded-full border-2 border-gray-200 flex items-center justify-center hover:border-[#1E5BFF] hover:text-[#1E5BFF] transition-colors"
              aria-label="Scroll right"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Horizontal scroll cards */}
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto px-4 sm:px-6 lg:px-8 pb-4 snap-x snap-mandatory scrollbar-hide"
        style={{ scrollbarWidth: 'none' }}
      >
        <div className="flex-shrink-0 w-4 lg:w-[calc((100vw-1280px)/2+32px)]" />
        {featuredProjects.map((project, i) => (
          <motion.div
            key={project.slug}
            className="flex-shrink-0 w-[320px] sm:w-[380px] snap-start group"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
          >
            <div className="relative rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-lg hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 h-full">
              {/* Image */}
              <div className="relative h-52 overflow-hidden bg-gray-50">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-contain p-6 group-hover:scale-110 transition-transform duration-700"
                  sizes="380px"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold text-gray-900 hover:bg-white transition-colors"
                  >
                    Visit Live Site <ExternalLink size={14} />
                  </a>
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
                <p className="text-sm text-gray-500 mb-4 line-clamp-2">{project.desc}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((t) => (
                    <span key={t} className="px-2.5 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded-md">
                      {t}
                    </span>
                  ))}
                </div>

                {/* Mobile View Live Button */}
                <div className="flex sm:hidden pt-3 border-t border-gray-100 mt-auto">
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-[#1E5BFF] rounded-xl text-xs font-semibold text-white shadow-sm hover:bg-[#1650cc] active:scale-95 transition-all"
                  >
                    Visit Live Site <ExternalLink size={14} />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
        <div className="flex-shrink-0 w-4" />
      </div>

      <div className="text-center mt-10">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-[#1E5BFF] font-semibold hover:gap-3 transition-all"
        >
          View All Projects <ArrowRight size={18} />
        </Link>
      </div>
    </section>
  )
}

/* ============================
   SKILLS MARQUEE
   ============================ */
const skills = [
  'Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'GSAP',
  'Node.js', 'Supabase', 'PostgreSQL', 'REST APIs', 'WhatsApp API',
  'Figma', 'UI/UX Design', 'Git', 'Vercel', 'Docker', 'SEO', 'Adobe XD',
]

export function SkillsMarquee() {
  return (
    <section className="py-16 bg-gray-50/50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <SectionHeader
          label="Tech Stack"
          title="Skills & Technologies"
          description="The tools and technologies I use to bring ideas to life."
        />
      </div>

      {/* Double marquee for infinite effect */}
      <div className="relative">
        {/* Row 1 - left to right */}
        <div className="flex gap-4 mb-4 animate-marquee">
          {[...skills, ...skills].map((skill, i) => (
            <div
              key={i}
              className="flex-shrink-0 px-6 py-3 bg-white rounded-full border border-gray-100 shadow-sm hover:border-[#1E5BFF] hover:shadow-md transition-all duration-300 cursor-default"
            >
              <span className="text-sm font-semibold text-gray-700 whitespace-nowrap">{skill}</span>
            </div>
          ))}
        </div>

        {/* Row 2 - right to left */}
        <div className="flex gap-4 animate-marquee-reverse">
          {[...skills.reverse(), ...skills].map((skill, i) => (
            <div
              key={i}
              className="flex-shrink-0 px-6 py-3 bg-white rounded-full border border-gray-100 shadow-sm hover:border-[#FF7A1A] hover:shadow-md transition-all duration-300 cursor-default"
            >
              <span className="text-sm font-semibold text-gray-700 whitespace-nowrap">{skill}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ============================
   TESTIMONIALS
   ============================ */
const testimonials = [
  {
    name: 'Shourabh Tomar',
    role: 'CEO & Founder',
    company: 'The Backstory Media',
    content: 'The platform handles thousands of articles with lightning speed. The CMS is intuitive and our editorial team picked it up in no time. Exceptional work!',
    rating: 5,
  },
  {
    name: 'Saurav Prasad',
    role: 'CEO & Founder',
    company: 'GrowthWapi',
    content: 'Our WhatsApp SaaS platform required complex API integrations and a high-performance system. Saurav handled everything flawlessly. The product launched smoothly and our clients love it.',
    rating: 5,
  },
  {
    name: 'Dr. Aashish Jakhar',
    role: 'Founder & President',
    company: 'SportsPe FB',
    content: 'Saurav transformed our vision into a world-class platform. The website is blazing fast, beautifully designed, and our users love it. He delivered ahead of schedule!',
    rating: 5,
  },
  {
    name: 'Shourabh Tomar',
    role: 'Founder & CEO',
    company: 'The Take Studio',
    content: 'Working with Saurav was an absolute pleasure. He understood our creative brand instantly and built something truly premium. The animations are exactly what we wanted.',
    rating: 5,
  },
  {
    name: 'Mr. Parveen Mishra',
    role: 'Co-Founder',
    company: 'NPVL Official',
    content: 'The platform handles our live league updates, tournaments, and team registrations smoothly. Saurav delivered top-tier work with incredible attention to detail.',
    rating: 5,
  },
  {
    name: 'Nemi Chand',
    role: 'Founder & Owner',
    company: 'Veerteja Watertechnology',
    content: 'Customer inquiries and online sales increased significantly after the new website launched. Saurav is a true professional who goes above and beyond for his clients.',
    rating: 5,
  },
]

export function TestimonialsSection() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-50/30 to-transparent pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          label="Testimonials"
          title="What Clients Say"
          description="Don't just take my word for it — hear from the people I've worked with."
        />

        <div className="max-w-3xl mx-auto">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            {/* Stars */}
            <div className="flex items-center justify-center gap-1 mb-6">
              {Array.from({ length: testimonials[current].rating }).map((_, i) => (
                <Star key={i} size={20} className="fill-[#FF7A1A] text-[#FF7A1A]" />
              ))}
            </div>

            {/* Quote */}
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-700 leading-relaxed mb-8 italic">
              &ldquo;{testimonials[current].content}&rdquo;
            </p>

            {/* Author */}
            <div>
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#1E5BFF] to-[#FF7A1A] mx-auto mb-3 flex items-center justify-center">
                <span className="text-white font-bold text-lg">
                  {testimonials[current].name.charAt(0)}
                </span>
              </div>
              <h4 className="text-base font-bold text-gray-900">{testimonials[current].name}</h4>
              <p className="text-sm text-gray-500">
                {testimonials[current].role}, {testimonials[current].company}
              </p>
            </div>
          </motion.div>

          {/* Dots */}
          <div className="flex items-center justify-center gap-2 mt-10">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  i === current
                    ? 'w-8 bg-gradient-to-r from-[#1E5BFF] to-[#FF7A1A]'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ============================
   CTA BANNER
   ============================ */
export function CTABanner() {
  return (
    <section className="py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="relative rounded-3xl overflow-hidden p-10 md:p-16 text-center"
          style={{
            background: 'linear-gradient(135deg, #1E5BFF 0%, #3B7BFF 50%, #FF7A1A 100%)',
          }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Decorative elements */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-white/10"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 6, repeat: Infinity }}
            />
            <motion.div
              className="absolute -bottom-10 -left-10 w-48 h-48 rounded-full bg-white/10"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 8, repeat: Infinity, delay: 1 }}
            />
          </div>

          <div className="relative z-10">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
              Let&apos;s Build Something Amazing
            </h2>
            <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">
              Ready to take your online presence to the next level? Let&apos;s discuss your project and make it happen.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <MagneticButton>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#1E5BFF] font-bold rounded-full hover:shadow-xl hover:shadow-black/20 transition-all duration-300"
                >
                  Start a Project <ArrowRight size={18} />
                </Link>
              </MagneticButton>
              <MagneticButton>
                <a
                  href="https://wa.me/917782004400"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-full hover:bg-white/10 transition-all duration-300"
                >
                  WhatsApp Me
                </a>
              </MagneticButton>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
