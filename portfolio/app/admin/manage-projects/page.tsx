'use client'

import { useState, useEffect } from 'react'
import ProjectForm from '@/components/admin/ProjectForm'
import { createClient } from '@/lib/supabase/client'
import { Project } from '@/lib/types'
import { Loader2, Plus, ExternalLink, Edit2, Trash2, CheckCircle2, XCircle } from 'lucide-react'

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingProject, setEditingProject] = useState<Project | null>(null)

  const supabase = createClient()

  const fetchProjects = async () => {
    setLoading(true)
    const { data, error } = await supabase.from('projects').select('*').order('created_at', { ascending: false })
    if (error) console.error(error)
    else setProjects(data || [])
    setLoading(false)
  }

  useEffect(() => {
    fetchProjects()
  }, [])

  const handleEdit = (proj: Project) => {
    setEditingProject(proj)
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return
    const { error } = await supabase.from('projects').delete().eq('id', id)
    if (error) {
      alert('Error deleting project: ' + error.message)
    } else {
      fetchProjects()
    }
  }

  const handleFormSuccess = () => {
    setShowForm(false)
    setEditingProject(null)
    fetchProjects()
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-200">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Projects Management</h1>
          <p className="text-sm text-gray-500 mt-1">
            Create, edit, and manage all your portfolio projects and client websites.
          </p>
        </div>
        <button
          onClick={() => {
            setEditingProject(null)
            setShowForm(true)
          }}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#1E5BFF] text-white text-sm font-semibold rounded-xl hover:bg-[#1650cc] shadow-md shadow-blue-500/20 transition-all cursor-pointer self-start sm:self-auto"
        >
          <Plus size={18} /> Add New Project
        </button>
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 text-gray-500">
          <Loader2 className="animate-spin text-[#1E5BFF] mb-3" size={32} />
          <p className="text-sm">Loading projects...</p>
        </div>
      ) : projects.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-gray-100 p-8">
          <p className="text-gray-500 mb-4">No projects found in the database.</p>
          <button
            onClick={() => setShowForm(true)}
            className="px-4 py-2 bg-[#1E5BFF] text-white text-sm font-semibold rounded-xl hover:bg-[#1650cc]"
          >
            Add Your First Project
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 text-left text-sm">
              <thead className="bg-gray-50 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-3.5">Logo & Title</th>
                  <th className="px-6 py-3.5">Category</th>
                  <th className="px-6 py-3.5">Live Link</th>
                  <th className="px-6 py-3.5">Status</th>
                  <th className="px-6 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {projects.map((proj) => (
                  <tr key={proj.id} className="hover:bg-gray-50/80 transition-colors">
                    {/* Logo & Title */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center overflow-hidden p-1 flex-shrink-0">
                          {proj.preview_image ? (
                            <img
                              src={proj.preview_image}
                              alt={proj.title}
                              className="w-full h-full object-contain"
                            />
                          ) : (
                            <span className="text-xs font-bold text-gray-400">
                              {proj.title.charAt(0)}
                            </span>
                          )}
                        </div>
                        <div>
                          <div className="font-bold text-gray-900">{proj.title}</div>
                          <div className="text-xs text-gray-400 font-mono">/{proj.slug}</div>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="px-6 py-4">
                      <span className="inline-block px-2.5 py-1 text-xs font-medium bg-blue-50 text-[#1E5BFF] rounded-lg">
                        {proj.category || 'General'}
                      </span>
                    </td>

                    {/* Live Link */}
                    <td className="px-6 py-4">
                      {proj.live_url ? (
                        <a
                          href={proj.live_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs text-[#1E5BFF] hover:underline"
                        >
                          Visit <ExternalLink size={12} />
                        </a>
                      ) : (
                        <span className="text-xs text-gray-400">—</span>
                      )}
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1">
                        <span className="inline-flex items-center gap-1 text-xs text-gray-600">
                          {proj.is_published ? (
                            <CheckCircle2 size={14} className="text-green-500" />
                          ) : (
                            <XCircle size={14} className="text-gray-400" />
                          )}
                          {proj.is_published ? 'Published' : 'Draft'}
                        </span>
                        {proj.is_featured && (
                          <span className="inline-flex items-center gap-1 text-[10px] text-amber-600 font-semibold bg-amber-50 px-1.5 py-0.5 rounded">
                            ⭐ Featured
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4 text-right">
                      <div className="inline-flex items-center gap-2">
                        <button
                          onClick={() => handleEdit(proj)}
                          className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
                        >
                          <Edit2 size={13} /> Edit
                        </button>
                        <button
                          onClick={() => handleDelete(proj.id)}
                          className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                        >
                          <Trash2 size={13} /> Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal Form */}
      {showForm && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="max-w-2xl w-full my-8">
            <ProjectForm
              initialData={editingProject}
              onSuccess={handleFormSuccess}
              onCancel={() => {
                setShowForm(false)
                setEditingProject(null)
              }}
            />
          </div>
        </div>
      )}
    </div>
  )
}
