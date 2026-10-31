'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { cn } from '@/lib/utils'
import { Project } from '@/lib/types'
import { Loader2, Upload, X, Image as ImageIcon } from 'lucide-react'
import Image from 'next/image'
import { uploadFile, SUPABASE_BUCKET_PROJECTS } from '@/lib/supabase/media'

interface ProjectFormProps {
  initialData?: Project | null
  onSuccess?: () => void
  onCancel?: () => void
}

export default function ProjectForm({ initialData = null, onSuccess, onCancel }: ProjectFormProps) {
  const [title, setTitle] = useState(initialData?.title || '')
  const [slug, setSlug] = useState(initialData?.slug || '')
  const [category, setCategory] = useState(initialData?.category || '')
  const [shortDesc, setShortDesc] = useState(initialData?.short_description || '')
  const [description, setDescription] = useState(initialData?.description || '')
  const [techStack, setTechStack] = useState(initialData?.tech_stack?.join(', ') || '')
  const [liveUrl, setLiveUrl] = useState(initialData?.live_url || '')
  const [previewImage, setPreviewImage] = useState(initialData?.preview_image || '')
  const [isFeatured, setIsFeatured] = useState(initialData?.is_featured ?? false)
  const [isPublished, setIsPublished] = useState(initialData?.is_published ?? true)
  const [loading, setLoading] = useState(false)
  const [uploadingImage, setUploadingImage] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const supabase = createClient()

  const handleImageFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploadingImage(true)
    setErrorMsg('')
    try {
      const publicUrl = await uploadFile(file, SUPABASE_BUCKET_PROJECTS, 'logos')
      setPreviewImage(publicUrl)
    } catch (err: any) {
      console.warn('Storage upload error, using local object URL as fallback:', err)
      // If bucket is not public or has policy restrictions, we still let user set URL or fallback to base64
      const reader = new FileReader()
      reader.onload = (event) => {
        if (event.target?.result) {
          setPreviewImage(event.target.result as string)
        }
      }
      reader.readAsDataURL(file)
    } finally {
      setUploadingImage(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setErrorMsg('')

    const payload = {
      title,
      slug: slug || title.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-'),
      category,
      short_description: shortDesc || null,
      description: description || null,
      tech_stack: techStack ? techStack.split(',').map((s) => s.trim()).filter(Boolean) : [],
      live_url: liveUrl || null,
      preview_image: previewImage || null,
      is_featured: isFeatured,
      is_published: isPublished,
    }

    try {
      if (initialData?.id) {
        const { error } = await supabase.from('projects').update(payload).eq('id', initialData.id)
        if (error) throw error
      } else {
        const { error } = await supabase.from('projects').insert(payload)
        if (error) throw error
      }
      onSuccess?.()
    } catch (err: any) {
      console.error(err)
      setErrorMsg(err.message || 'Failed to save project.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
      <div className="flex items-center justify-between pb-4 border-b border-gray-100">
        <h2 className="text-xl font-bold text-gray-900">
          {initialData ? 'Edit Project' : 'Add New Project'}
        </h2>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="p-1 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100"
          >
            <X size={20} />
          </button>
        )}
      </div>

      {errorMsg && (
        <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl">
          {errorMsg}
        </div>
      )}

      {/* Title & Slug */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1">
            Project Title *
          </label>
          <input
            type="text"
            placeholder="e.g. SportsPe FB"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1E5BFF] focus:border-transparent outline-none"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1">
            Slug (URL path)
          </label>
          <input
            type="text"
            placeholder="e.g. sportspefb"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1E5BFF] focus:border-transparent outline-none"
          />
        </div>
      </div>

      {/* Category & Live URL */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1">
            Category
          </label>
          <input
            type="text"
            placeholder="e.g. Business Website, SaaS, E-Commerce"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1E5BFF] focus:border-transparent outline-none"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1">
            Live Website URL
          </label>
          <input
            type="url"
            placeholder="https://example.com"
            value={liveUrl}
            onChange={(e) => setLiveUrl(e.target.value)}
            className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1E5BFF] focus:border-transparent outline-none"
          />
        </div>
      </div>

      {/* Project Logo / Preview Image Field */}
      <div className="p-4 bg-blue-50/50 border border-blue-100 rounded-2xl">
        <label className="block text-xs font-bold uppercase tracking-wider text-[#1E5BFF] mb-2 flex items-center gap-1.5">
          <ImageIcon size={16} /> Project Logo / Preview Image
        </label>

        {previewImage ? (
          <div className="flex items-center gap-4 mb-3">
            <div className="relative w-20 h-20 bg-white border border-gray-200 rounded-xl overflow-hidden p-2 flex items-center justify-center shadow-sm">
              <img
                src={previewImage}
                alt="Project Logo"
                className="max-h-full max-w-full object-contain"
              />
            </div>
            <div className="flex-1">
              <p className="text-xs text-gray-500 break-all mb-1 font-mono">{previewImage}</p>
              <button
                type="button"
                onClick={() => setPreviewImage('')}
                className="text-xs text-red-600 hover:text-red-700 font-semibold"
              >
                Remove Logo
              </button>
            </div>
          </div>
        ) : null}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs text-gray-500 mb-1">Upload Logo File:</label>
            <label className="inline-flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-white border border-gray-300 rounded-xl text-xs font-medium text-gray-700 hover:bg-gray-50 cursor-pointer shadow-sm">
              {uploadingImage ? (
                <>
                  <Loader2 className="animate-spin text-[#1E5BFF]" size={16} /> Uploading...
                </>
              ) : (
                <>
                  <Upload size={16} className="text-[#1E5BFF]" /> Choose Image / Logo
                </>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageFileUpload}
                disabled={uploadingImage}
                className="hidden"
              />
            </label>
          </div>

          <div>
            <label className="block text-xs text-gray-500 mb-1">Or Paste Image/Logo Path:</label>
            <input
              type="text"
              placeholder="/sportspefb logo.png.png or URL"
              value={previewImage}
              onChange={(e) => setPreviewImage(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-gray-200 rounded-xl bg-white focus:ring-2 focus:ring-[#1E5BFF] outline-none"
            />
          </div>
        </div>
      </div>

      {/* Short Description */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1">
          Short Description
        </label>
        <input
          type="text"
          placeholder="Brief 1-line summary for cards"
          value={shortDesc}
          onChange={(e) => setShortDesc(e.target.value)}
          className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1E5BFF] focus:border-transparent outline-none"
        />
      </div>

      {/* Description */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1">
          Full Description
        </label>
        <textarea
          rows={3}
          placeholder="Detailed project description..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1E5BFF] focus:border-transparent outline-none"
        />
      </div>

      {/* Tech Stack */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1">
          Tech Stack (Comma Separated)
        </label>
        <input
          type="text"
          placeholder="Next.js, TypeScript, Tailwind CSS, Supabase"
          value={techStack}
          onChange={(e) => setTechStack(e.target.value)}
          className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1E5BFF] focus:border-transparent outline-none"
        />
      </div>

      {/* Checkboxes */}
      <div className="flex flex-wrap gap-6 pt-2">
        <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-700 font-medium">
          <input
            type="checkbox"
            checked={isFeatured}
            onChange={(e) => setIsFeatured(e.target.checked)}
            className="w-4 h-4 text-[#1E5BFF] rounded border-gray-300 focus:ring-[#1E5BFF]"
          />
          Featured Project (Shows on Home Page)
        </label>
        <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-700 font-medium">
          <input
            type="checkbox"
            checked={isPublished}
            onChange={(e) => setIsPublished(e.target.checked)}
            className="w-4 h-4 text-[#1E5BFF] rounded border-gray-300 focus:ring-[#1E5BFF]"
          />
          Published (Visible to Visitors)
        </label>
      </div>

      {/* Buttons */}
      <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-5 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#1E5BFF] text-white text-sm font-semibold hover:bg-[#1650cc] shadow-md shadow-blue-500/20 disabled:opacity-60 transition-all cursor-pointer"
        >
          {loading && <Loader2 className="animate-spin" size={16} />}
          {initialData ? 'Save Changes' : 'Create Project'}
        </button>
      </div>
    </form>
  )
}
