'use client'

import { motion } from 'framer-motion'
import { Palette, Code, Layout, ShoppingCart, Layers, Plug, Target, Settings, Check } from 'lucide-react'
import SectionHeader from '@/components/ui/SectionHeader'
import MagneticButton from '@/components/animations/MagneticButton'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const iconMap: Record<string, React.ElementType> = {
  palette: Palette,
  code: Code,
  layout: Layout,
  'shopping-cart': ShoppingCart,
  layers: Layers,
  plug: Plug,
  target: Target,
  settings: Settings,
}

const services = [
  {
    title: 'Website Design',
    icon: 'palette',
    description: 'Stunning, conversion-focused website designs that captivate visitors and reflect your brand perfectly.',
    features: ['Custom UI/UX Design', 'Wireframing & Prototyping', 'Design System Creation', 'Mobile-First Approach', 'Brand Identity Integration'],
    gradient: 'from-blue-500 to-blue-600',
  },
  {
    title: 'Full-Stack Development',
    icon: 'code',
    description: 'End-to-end web development from database architecture to pixel-perfect frontend implementation.',
    features: ['Next.js & React Development', 'Node.js Backend', 'Database Design', 'API Development', 'Performance Optimization'],
    gradient: 'from-purple-500 to-purple-600',
  },
  {
    title: 'UI/UX Design',
    icon: 'layout',
    description: 'User-centered design that combines aesthetics with functionality to create seamless digital experiences.',
    features: ['User Research', 'Information Architecture', 'Interactive Prototypes', 'Usability Testing', 'Accessibility (WCAG)'],
    gradient: 'from-pink-500 to-pink-600',
  },
  {
    title: 'E-Commerce Solutions',
    icon: 'shopping-cart',
    description: 'Feature-rich online stores with seamless shopping experiences and powerful admin dashboards.',
    features: ['Product Management', 'Payment Gateway Integration', 'Cart & Checkout', 'Order Management', 'Inventory Tracking'],
    gradient: 'from-green-500 to-green-600',
  },
  {
    title: 'SaaS & Web Apps',
    icon: 'layers',
    description: 'Scalable software-as-a-service applications with multi-tenant architecture and real-time features.',
    features: ['Multi-tenant Architecture', 'Real-time Features', 'Subscription & Billing', 'Dashboard Analytics', 'API-first Design'],
    gradient: 'from-orange-500 to-orange-600',
  },
  {
    title: 'API Integrations',
    icon: 'plug',
    description: 'Seamless integration of third-party APIs including WhatsApp, payment gateways, and business tools.',
    features: ['WhatsApp Business API', 'Payment Gateways', 'CRM Integrations', 'Webhook Management', 'Custom API Development'],
    gradient: 'from-cyan-500 to-cyan-600',
  },
  {
    title: 'Landing Pages',
    icon: 'target',
    description: 'High-converting landing pages designed and built to turn visitors into customers.',
    features: ['Conversion Optimization', 'A/B Testing Ready', 'Fast Load Times', 'Lead Capture Forms', 'Analytics Integration'],
    gradient: 'from-red-500 to-red-600',
  },
  {
    title: 'Maintenance & SEO',
    icon: 'settings',
    description: 'Ongoing website maintenance, performance monitoring, and search engine optimization.',
    features: ['Technical SEO', 'Core Web Vitals', 'Security Updates', 'Performance Monitoring', 'Content Updates'],
    gradient: 'from-amber-500 to-amber-600',
  },
]

export default function ServicesPage() {
  return (
    <div className="pt-24 pb-20">
      {/* Header */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            label="Services"
            title="What I Can Build For You"
            description="From concept to deployment, I offer end-to-end digital solutions tailored to your business needs."
          />

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {services.map((service, i) => {
              const IconComponent = iconMap[service.icon] || Code

              return (
                <motion.div
                  key={service.title}
                  className="group relative p-6 md:p-8 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-2xl hover:shadow-blue-500/10 hover:border-blue-100 transition-all duration-500 overflow-hidden"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  whileHover={{ y: -5 }}
                >
                  {/* Gradient glow on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500`} />

                  {/* Icon */}
                  <div className={`relative z-10 w-14 h-14 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent size={24} className="text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="relative z-10 text-xl font-bold text-gray-900 mb-3 group-hover:text-[#1E5BFF] transition-colors">
                    {service.title}
                  </h3>
                  <p className="relative z-10 text-sm text-gray-500 leading-relaxed mb-5">
                    {service.description}
                  </p>

                  {/* Features */}
                  <ul className="relative z-10 space-y-2">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm text-gray-600">
                        <Check size={16} className="text-[#1E5BFF] flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* Animated gradient border bottom */}
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-[#1E5BFF] to-[#FF7A1A] transition-all duration-700" />
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            className="p-10 md:p-16 rounded-3xl bg-gradient-to-r from-[#1E5BFF] to-[#FF7A1A] relative overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="absolute inset-0 overflow-hidden">
              <motion.div
                className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-white/10"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 5, repeat: Infinity }}
              />
            </div>
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
                Need a Custom Solution?
              </h2>
              <p className="text-white/80 mb-8 max-w-xl mx-auto">
                Let&apos;s discuss your project requirements and find the perfect solution for your business.
              </p>
              <MagneticButton>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#1E5BFF] font-bold rounded-full hover:shadow-xl transition-all duration-300"
                >
                  Get in Touch <ArrowRight size={18} />
                </Link>
              </MagneticButton>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
