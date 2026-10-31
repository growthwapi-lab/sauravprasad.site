'use client'

import { useState, useEffect } from 'react'
import RichTextEditor from '@/components/admin/RichTextEditor'
import MediaUploader from '@/components/admin/MediaUploader'
import { createClient } from '@/lib/supabase/client'
import { CaseStudy, Project } from '@/lib/types'
import { SUPABASE_BUCKET_CASE_STUDIES } from '@/lib/supabase/media'
import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface CaseStudyFormProps {
  initialData?: CaseStudy | null
  onSuccess?: () => void
  onCancel?: () => void
}

export default function CaseStudyForm({ initialData = null, onSuccess, onCancel }: CaseStudyFormProps) {
  const [projectId, setProjectId] = useState(initialData?.project_id || '')
  const [slug, setSlug] = useState(initialData?.slug || '')
  const [content, setContent] = useState(initialData?.content ? JSON.stringify(initialData.content, null, 2) : '')
  const [loading, setLoading] = useState(false)
  const [projects, setProjects] = useState<Pick<Project, 'id' | 'title'>[]>([])

  const supabase = createClient()

  useEffect(() => {
    async function fetchProjects() {
      const { data, error } = await supabase.from('projects').select('id, title')
      if (error) console.error(error)
      else setProjects(data)
    }
    fetchProjects()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    let parsedContent: any = content
    try {
      if (typeof content === 'string' && (content.trim().startsWith('{') || content.trim().startsWith('['))) {
        parsedContent = JSON.parse(content)
      }
    } catch {
      parsedContent = content
    }

    const payload = {
      project_id: projectId,
      slug: slug || undefined,
      content: parsedContent,
    }
    try {
      if (initialData) {
        await supabase.from('case_studies').update(payload).eq('id', initialData.id)
      } else {
        await supabase.from('case_studies').insert(payload)
      }
      onSuccess?.()
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className={cn('grid', 'gap-4', 'p-4', 'bg-white', 'rounded-lg', 'shadow')}>
      <select
        value={projectId}
        onChange={(e) => setProjectId(e.target.value)}
        required
        className={cn('border', 'rounded', 'px-3', 'py-2')}
      >
        <option value="" disabled>Select Project</option>
        {projects.map((p) => (
          <option key={p.id} value={p.id}>{p.title}</option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Slug"
        value={slug}
        onChange={(e) => setSlug(e.target.value)}
        required
        className={cn('border', 'rounded', 'px-3', 'py-2')}
      />
      <RichTextEditor
        initialContent={content}
        onChange={(html) => setContent(html)}
        placeholder="Write case study content..."
      />
      {/* Optional: allow uploading images directly and embed URLs */}
      <MediaUploader
        bucket={SUPABASE_BUCKET_CASE_STUDIES}
        folderPath={slug}
        onUploadComplete={(urls) => {
          // Append image markdown to content (TipTap uses HTML, so we insert <img>)
          const imgs = urls.map((u) => `<img src="${u}" alt=""/>`).join('')
          setContent((prev) => prev + imgs)
        }}
      />
      <div className="flex gap-2 mt-4">
        <button
          type="submit"
          disabled={loading}
          className={cn('px-4', 'py-2', 'bg-[#1E5BFF]', 'text-white', 'rounded', 'hover:bg-[#1650cc]', 'flex', 'items-center')}
        >
          {loading && <Loader2 className="animate-spin mr-2" size={16} />}
          {initialData ? 'Update' : 'Create'} Case Study
        </button>
        {onCancel && (
          <button type="button" onClick={onCancel} className={cn('px-4', 'py-2', 'bg-gray-200', 'rounded', 'hover:bg-gray-300')}>Cancel</button>
        )}
      </div>
    </form>
  )
}
