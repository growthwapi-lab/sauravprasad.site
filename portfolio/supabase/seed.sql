-- ============================================================
-- Saurav Prasad Portfolio — Seed Data
-- Run AFTER schema.sql
-- ============================================================

-- ============================================================
-- PROJECTS
-- ============================================================
INSERT INTO projects (title, slug, category, short_description, description, tech_stack, live_url, preview_image, is_featured, is_published, sort_order) VALUES
(
  'SportsPe FB',
  'sportspefb',
  'Business Website',
  'A sports federation business website with event management and membership features.',
  'SportsPe FB is a comprehensive sports federation platform that streamlines event management, athlete registrations, and federation communications. The platform features a clean, modern design with seamless user experience for both administrators and members.',
  ARRAY['Next.js', 'TypeScript', 'Tailwind CSS', 'Supabase', 'Framer Motion'],
  'https://sportspefb.org',
  '/sportspefb logo.png.png',
  true,
  true,
  1
),
(
  'The Take Studio',
  'thetakestudio',
  'Media & Creative',
  'Premium creative studio website with portfolio showcase and booking system.',
  'The Take Studio is a premium creative production studio website that showcases their portfolio, services, and team. Features a visually stunning design with smooth animations, portfolio galleries, and an integrated booking/inquiry system.',
  ARRAY['Next.js', 'TypeScript', 'GSAP', 'Tailwind CSS', 'Supabase'],
  'https://thetakestudio.com',
  '/thetakestudio logo.png.png',
  true,
  true,
  2
),
(
  'The Backstory Media',
  'thebackstorymedia',
  'Media Website',
  'Digital media platform with content management and editorial publishing features.',
  'The Backstory Media is a digital media and editorial platform that delivers in-depth journalism and storytelling. Built with a focus on readability, fast content loading, and an intuitive CMS for editors to publish and manage stories effortlessly.',
  ARRAY['Next.js', 'TypeScript', 'Tailwind CSS', 'Supabase', 'Framer Motion'],
  'https://thebackstorymedia.com',
  '/thebackstorymedia logo.png.png',
  true,
  true,
  3
),
(
  'NPVL Official',
  'npvlofficial',
  'Sports & Entertainment',
  'Official platform for NPVL league with live scores, teams, and tournament brackets.',
  'NPVL Official is the digital home of the National Premier Volleyball League. The platform features live tournament brackets, team profiles, player statistics, match schedules, and a fan engagement section — all built for high performance and real-time updates.',
  ARRAY['Next.js', 'TypeScript', 'Supabase', 'Tailwind CSS', 'GSAP'],
  'https://npvlofficial.com',
  '/npvl logo.png.png',
  true,
  true,
  4
),
(
  'GrowthWapi',
  'growthwapi',
  'SaaS / API Platform',
  'WhatsApp API SaaS platform for business automation and bulk messaging.',
  'GrowthWapi is a powerful WhatsApp API SaaS platform that enables businesses to automate customer communication, run bulk campaigns, and integrate WhatsApp into their workflows via a clean REST API. Features a multi-tenant dashboard, analytics, and webhook integrations.',
  ARRAY['Next.js', 'TypeScript', 'Node.js', 'WhatsApp API', 'Supabase', 'Tailwind CSS'],
  'https://growthwapi.in',
  '/Growthwapilogo.png.png',
  true,
  true,
  5
),
(
  'Veerteja Watertech',
  'veertejawatertech',
  'E-Commerce',
  'E-commerce store for water treatment and purification products.',
  'Veerteja Watertech is a full-featured e-commerce store specializing in water treatment and purification solutions. The platform includes product listings, categories, a shopping cart, Razorpay payment integration, and an admin dashboard for inventory management.',
  ARRAY['Next.js', 'TypeScript', 'Tailwind CSS', 'Supabase', 'Razorpay', 'Framer Motion'],
  'https://veertejawatertech.store',
  '/veertejawatertech logo.png.png',
  true,
  true,
  6
)
ON CONFLICT (slug) DO NOTHING;

-- ============================================================
-- CASE STUDIES (linked to projects)
-- ============================================================
INSERT INTO case_studies (project_id, slug, problem, solution, process, results, is_published)
SELECT 
  p.id,
  p.slug || '-case-study',
  'The client needed a modern, high-performance website that could handle their growing user base and provide an exceptional digital experience across all devices.',
  'We designed and developed a fully custom Next.js application with Supabase as the backend. The solution focused on performance optimization, mobile-first responsive design, and smooth animations that elevate the brand perception.',
  'Discovery → Wireframing → Design System → Development → Testing → Launch. We followed an iterative process with weekly client check-ins to ensure alignment at every stage.',
  'The new website achieved a 98 Lighthouse performance score, 40% increase in user engagement, 60% improvement in page load speed, and significantly improved mobile conversion rates.',
  true
FROM projects p
ON CONFLICT (slug) DO NOTHING;

-- ============================================================
-- SERVICES
-- ============================================================
INSERT INTO services (title, description, icon, features, sort_order, is_active) VALUES
(
  'Website Design',
  'Stunning, conversion-focused website designs that captivate visitors and reflect your brand perfectly.',
  'palette',
  ARRAY['Custom UI/UX Design', 'Wireframing & Prototyping', 'Design System Creation', 'Mobile-First Approach', 'Brand Identity Integration'],
  1,
  true
),
(
  'Full-Stack Development',
  'End-to-end web development from database architecture to pixel-perfect frontend implementation.',
  'code',
  ARRAY['Next.js & React Development', 'Node.js Backend', 'Database Design', 'API Development', 'Performance Optimization'],
  2,
  true
),
(
  'UI/UX Design',
  'User-centered design that combines aesthetics with functionality to create seamless digital experiences.',
  'layout',
  ARRAY['User Research', 'Information Architecture', 'Interactive Prototypes', 'Usability Testing', 'Accessibility (WCAG)'],
  3,
  true
),
(
  'E-Commerce Solutions',
  'Feature-rich online stores with seamless shopping experiences and powerful admin dashboards.',
  'shopping-cart',
  ARRAY['Product Management', 'Payment Gateway Integration', 'Cart & Checkout', 'Order Management', 'Inventory Tracking'],
  4,
  true
),
(
  'SaaS & Web Apps',
  'Scalable software-as-a-service applications with multi-tenant architecture and real-time features.',
  'layers',
  ARRAY['Multi-tenant Architecture', 'Real-time Features', 'Subscription & Billing', 'Dashboard Analytics', 'API-first Design'],
  5,
  true
),
(
  'API Integrations',
  'Seamless integration of third-party APIs including WhatsApp, payment gateways, and business tools.',
  'plug',
  ARRAY['WhatsApp Business API', 'Payment Gateways', 'CRM Integrations', 'Webhook Management', 'Custom API Development'],
  6,
  true
),
(
  'Landing Pages',
  'High-converting landing pages designed and built to turn visitors into customers.',
  'target',
  ARRAY['Conversion Optimization', 'A/B Testing Ready', 'Fast Load Times', 'Lead Capture Forms', 'Analytics Integration'],
  7,
  true
),
(
  'Maintenance & SEO',
  'Ongoing website maintenance, performance monitoring, and search engine optimization to keep you ahead.',
  'settings',
  ARRAY['Technical SEO', 'Core Web Vitals', 'Security Updates', 'Performance Monitoring', 'Content Updates'],
  8,
  true
)
ON CONFLICT DO NOTHING;

-- ============================================================
-- SKILLS
-- ============================================================
INSERT INTO skills (name, category, proficiency, icon, sort_order, is_active) VALUES
-- Frontend
('Next.js', 'Frontend', 98, 'nextjs', 1, true),
('React', 'Frontend', 97, 'react', 2, true),
('TypeScript', 'Frontend', 95, 'typescript', 3, true),
('Tailwind CSS', 'Frontend', 98, 'tailwind', 4, true),
('Framer Motion', 'Frontend', 90, 'framer', 5, true),
('GSAP', 'Frontend', 88, 'gsap', 6, true),
-- Backend
('Node.js', 'Backend', 92, 'nodejs', 7, true),
('Supabase', 'Backend', 95, 'supabase', 8, true),
('PostgreSQL', 'Backend', 88, 'postgresql', 9, true),
('REST APIs', 'Backend', 93, 'api', 10, true),
('WhatsApp API', 'Backend', 90, 'whatsapp', 11, true),
-- Design
('Figma', 'Design', 92, 'figma', 12, true),
('UI/UX Design', 'Design', 90, 'design', 13, true),
('Adobe XD', 'Design', 82, 'xd', 14, true),
-- Tools
('Git & GitHub', 'Tools', 93, 'git', 15, true),
('Vercel', 'Tools', 95, 'vercel', 16, true),
('Docker', 'Tools', 78, 'docker', 17, true),
('SEO', 'Tools', 88, 'seo', 18, true)
ON CONFLICT DO NOTHING;

-- ============================================================
-- TESTIMONIALS
-- ============================================================
INSERT INTO testimonials (name, role, company, content, rating, is_active, sort_order) VALUES
(
  'Shourabh Tomar',
  'CEO & Founder',
  'The Backstory Media',
  'The platform Saurav built for us handles thousands of articles with lightning speed. The CMS is intuitive and our editorial team picked it up in no time. Exceptional work!',
  5,
  true,
  1
),
(
  'Saurav Prasad',
  'CEO & Founder',
  'GrowthWapi',
  'Our WhatsApp SaaS platform required complex API integrations and a robust multi-tenant system. Saurav handled everything flawlessly. The product launched on time and our customers are extremely happy.',
  5,
  true,
  2
),
(
  'Dr. Aashish Jakhar',
  'Founder & President',
  'SportsPe FB',
  'Saurav transformed our vision into a world-class platform. The website is blazing fast, beautifully designed, and our users love it. He delivered ahead of schedule and the quality exceeded our expectations!',
  5,
  true,
  3
),
(
  'Shourabh Tomar',
  'Founder & CEO',
  'The Take Studio',
  'Working with Saurav was an absolute pleasure. He understood our creative brand instantly and built something truly premium. The animations and interactions are exactly what we wanted — and more.',
  5,
  true,
  4
),
(
  'Mr. Parveen Mishra',
  'Co-Founder',
  'NPVL Official',
  'The platform handles our live league updates, tournaments, and team registrations smoothly. Saurav delivered top-tier work with incredible attention to detail.',
  5,
  true,
  5
),
(
  'Nemi Chand',
  'Founder & Owner',
  'Veerteja Watertechnology',
  'Our business inquiries and online presence increased significantly after the new website launched. Saurav is a true professional who goes above and beyond for his clients.',
  5,
  true,
  6
)
ON CONFLICT DO NOTHING;

-- ============================================================
-- SITE CONTENT (key-value store for all editable content)
-- ============================================================
INSERT INTO site_content (key, value, description) VALUES

-- Hero Section
('hero_headline', '"Building Digital Experiences That"', 'Main hero headline (first line)'),
('hero_headline_highlight', '"Stand Out & Convert"', 'Hero headline highlighted text'),
('hero_subtext', '"I design and develop premium websites that captivate your audience, grow your brand, and drive real results — from business sites to SaaS platforms."', 'Hero section subtext'),
('hero_roles', '["Website Designer", "Full-Stack Developer", "UI/UX Expert", "E-Commerce Specialist", "SaaS Builder", "API Integration Expert"]', 'Rotating typewriter roles'),
('hero_cta_primary', '"View Projects"', 'Primary CTA button text'),
('hero_cta_secondary', '"Hire Me"', 'Secondary CTA button text'),

-- About Section  
('about_intro', '"Hi, I''m Saurav Prasad"', 'About page intro'),
('about_tagline', '"A Passionate Website Designer & Full-Stack Developer"', 'About page tagline'),
('about_story', '"I''m a full-stack developer and designer with a passion for crafting digital experiences that are not just visually stunning — but strategically built to perform. With expertise spanning business websites, e-commerce platforms, SaaS applications, media sites, landing pages, and API integrations, I bring your vision to life with precision and creativity.\n\nEvery project I take on receives my full attention — from the initial concept and wireframing to the final pixel-perfect implementation. I believe great websites don''t just look good; they solve real problems, tell compelling stories, and drive measurable results for businesses."', 'About page story'),
('about_experience_years', '4', 'Years of experience'),
('about_projects_count', '50', 'Total projects completed'),
('about_clients_count', '40', 'Happy clients count'),
('about_satisfaction_rate', '100', 'Client satisfaction rate %'),

-- Stats Section
('stats', '[{"label": "Projects Completed", "value": 50, "suffix": "+"}, {"label": "Happy Clients", "value": 40, "suffix": "+"}, {"label": "Years Experience", "value": 4, "suffix": "+"}, {"label": "Success Rate", "value": 100, "suffix": "%"}]', 'Stats counter data'),

-- Contact Info
('contact_email', '"contact@sauravprasad.dev"', 'Contact email address'),
('contact_phone', '"7782004400"', 'Contact phone number'),
('contact_whatsapp', '"917782004400"', 'WhatsApp number with country code'),
('contact_location', '"India"', 'Location'),

-- Social Links
('social_links', '{"github": "https://github.com/sauravprasad", "linkedin": "https://linkedin.com/in/sauravprasad", "twitter": "https://twitter.com/sauravprasad", "instagram": "https://instagram.com/sauravprasad"}', 'Social media links'),

-- SEO
('seo_home_title', '"Saurav Prasad — Website Designer & Full-Stack Developer"', 'Home page SEO title'),
('seo_home_description', '"Premium website design and full-stack development by Saurav Prasad. Specializing in business sites, e-commerce, SaaS, media platforms, and API integrations."', 'Home page meta description'),
('seo_about_title', '"About Saurav Prasad — Expert Web Designer & Developer"', 'About page SEO title'),
('seo_services_title', '"Services — Saurav Prasad Web Design & Development"', 'Services page SEO title'),
('seo_projects_title', '"Projects Portfolio — Saurav Prasad"', 'Projects page SEO title'),
('seo_contact_title', '"Contact Saurav Prasad — Let''s Build Something Great"', 'Contact page SEO title')

ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;

-- ============================================================
-- SETTINGS (theme, fonts, etc.)
-- ============================================================
INSERT INTO settings (key, value) VALUES
('theme', '{"primaryColor": "#1E5BFF", "accentColor": "#FF7A1A", "backgroundColor": "#FFFFFF", "textColor": "#0A0A0A"}'),
('fonts', '{"heading": "Space Grotesk", "body": "Inter"}'),
('contact_info', '{"phone": "7782004400", "email": "contact@sauravprasad.dev", "whatsapp": "917782004400", "location": "India"}'),
('footer', '{"tagline": "Building premium digital experiences that drive real results.", "copyright": "© 2024 Saurav Prasad. All rights reserved."}')
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;
