import { createBrowserClient } from '@supabase/ssr'

const DEFAULT_SUPABASE_URL = 'https://czkjprmqnipvtmaywvjd.supabase.co'
const DEFAULT_SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN6a2pwcm1xbmlwdnRtYXl3dmpkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTI5NDA1MzksImV4cCI6MjEwODUxNjUzOX0.TdcNIVQOD-xop-ekyDRbb0RAl9-ETZTswLaKzle0_-k'

export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || DEFAULT_SUPABASE_URL
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || DEFAULT_SUPABASE_ANON_KEY

  return createBrowserClient(url, anonKey)
}
