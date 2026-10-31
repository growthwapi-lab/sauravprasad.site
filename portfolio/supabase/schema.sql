-- ============================================================
-- Saurav Prasad Portfolio — Supabase Schema
-- Run this FIRST before seed.sql
-- ============================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- TABLE: projects
-- ============================================================
CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  category TEXT NOT NULL,
  description TEXT,
  short_description TEXT,
  tech_stack TEXT[], -- array of tech names
  live_url TEXT,
  preview_image TEXT, -- storage path or URL
  gallery_images TEXT[], -- array of storage paths
  is_featured BOOLEAN DEFAULT false,
  is_published BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- TABLE: case_studies
-- ============================================================
CREATE TABLE IF NOT EXISTS case_studies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  slug TEXT UNIQUE NOT NULL,
  problem TEXT,
  solution TEXT,
  process TEXT,
  results TEXT,
  content JSONB, -- rich text (Tiptap JSON)
  screenshot_images TEXT[],
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- TABLE: services
-- ============================================================
CREATE TABLE IF NOT EXISTS services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  icon TEXT, -- icon name or SVG string
  features TEXT[],
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- TABLE: skills
-- ============================================================
CREATE TABLE IF NOT EXISTS skills (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  category TEXT, -- e.g. "Frontend", "Backend", "Design"
  proficiency INTEGER DEFAULT 80, -- 0-100
  icon TEXT,
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- TABLE: testimonials
-- ============================================================
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  role TEXT,
  company TEXT,
  avatar TEXT,
  content TEXT NOT NULL,
  rating INTEGER DEFAULT 5,
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- TABLE: messages (contact form submissions)
-- ============================================================
CREATE TABLE IF NOT EXISTS messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- TABLE: site_content (key-value for all editable content)
-- ============================================================
CREATE TABLE IF NOT EXISTS site_content (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  key TEXT UNIQUE NOT NULL,
  value JSONB NOT NULL,
  description TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- TABLE: settings (theme, contact, SEO)
-- ============================================================
CREATE TABLE IF NOT EXISTS settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  key TEXT UNIQUE NOT NULL,
  value JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- UPDATED_AT TRIGGER FUNCTION
-- ============================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_projects_updated_at
  BEFORE UPDATE ON projects
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_case_studies_updated_at
  BEFORE UPDATE ON case_studies
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_site_content_updated_at
  BEFORE UPDATE ON site_content
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_settings_updated_at
  BEFORE UPDATE ON settings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

-- Projects: public can read published, admin can do all
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read published projects"
  ON projects FOR SELECT
  USING (is_published = true);

CREATE POLICY "Admin full access on projects"
  ON projects FOR ALL
  USING (auth.role() = 'authenticated');

-- Case Studies: public read published
ALTER TABLE case_studies ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read published case studies"
  ON case_studies FOR SELECT
  USING (is_published = true);

CREATE POLICY "Admin full access on case_studies"
  ON case_studies FOR ALL
  USING (auth.role() = 'authenticated');

-- Services: public read active
ALTER TABLE services ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read active services"
  ON services FOR SELECT
  USING (is_active = true);

CREATE POLICY "Admin full access on services"
  ON services FOR ALL
  USING (auth.role() = 'authenticated');

-- Skills: public read active
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read active skills"
  ON skills FOR SELECT
  USING (is_active = true);

CREATE POLICY "Admin full access on skills"
  ON skills FOR ALL
  USING (auth.role() = 'authenticated');

-- Testimonials: public read active
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read active testimonials"
  ON testimonials FOR SELECT
  USING (is_active = true);

CREATE POLICY "Admin full access on testimonials"
  ON testimonials FOR ALL
  USING (auth.role() = 'authenticated');

-- Messages: public can insert, admin can read/delete
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public insert messages"
  ON messages FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admin full access on messages"
  ON messages FOR ALL
  USING (auth.role() = 'authenticated');

-- Site Content: public read, admin write
ALTER TABLE site_content ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read site_content"
  ON site_content FOR SELECT
  USING (true);

CREATE POLICY "Admin full access on site_content"
  ON site_content FOR ALL
  USING (auth.role() = 'authenticated');

-- Settings: public read, admin write
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read settings"
  ON settings FOR SELECT
  USING (true);

CREATE POLICY "Admin full access on settings"
  ON settings FOR ALL
  USING (auth.role() = 'authenticated');

-- ============================================================
-- STORAGE BUCKETS
-- Run these in the Supabase Dashboard > Storage, or via SQL
-- ============================================================
-- NOTE: Storage buckets must be created via the dashboard UI or 
-- Supabase Management API. The SQL below is for reference.

-- INSERT INTO storage.buckets (id, name, public) VALUES
--   ('project-images', 'project-images', true),
--   ('case-study-images', 'case-study-images', true),
--   ('site-media', 'site-media', true)
-- ON CONFLICT (id) DO NOTHING;

-- Storage RLS for project-images
-- CREATE POLICY "Public read project-images"
--   ON storage.objects FOR SELECT
--   USING (bucket_id = 'project-images');
-- CREATE POLICY "Admin write project-images"
--   ON storage.objects FOR INSERT
--   WITH CHECK (bucket_id = 'project-images' AND auth.role() = 'authenticated');
-- CREATE POLICY "Admin delete project-images"
--   ON storage.objects FOR DELETE
--   USING (bucket_id = 'project-images' AND auth.role() = 'authenticated');
