'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { CaseStudy } from '@/lib/types'
import CaseStudyForm from '@/components/admin/CaseStudyForm'
import { Loader2, Plus, Edit2, Trash2, FileText, ExternalLink } from 'lucide-react'
import Link from 'next/link'

export default function AdminCaseStudiesPage() {
  const [caseStudies, setCaseStudies] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingCaseStudy, setEditingCaseStudy] = useState<CaseStudy | null>(null)

  const supabase = createClient()

  const fetchCaseStudies = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('case_studies')
      .select('*, projects(title)')
      .order('created_at', { ascending: false })

    if (error) console.error(error)
    else setCaseStudies(data || [])
    setLoading(false)
  }

  useEffect(() => {
    fetchCaseStudies()
  }, [])

  const handleEdit = (cs: CaseStudy) => {
    setEditingCaseStudy(cs)
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this case study?')) return
    const { error } = await supabase.from('case_studies').delete().eq('id', id)
    if (error) {
      alert('Error deleting: ' + error.message)
    } else {
      fetchCaseStudies()
    }
  }

  const handleSuccess = () => {
    setShowForm(false)
    setEditingCaseStudy(null)
    fetchCaseStudies()
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-200">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Case Studies</h1>
          <p className="text-sm text-gray-500 mt-1">
            Write comprehensive in-depth project stories, results, and architecture highlights.
          </p>
        </div>
        <button
          onClick={() => {
            setEditingCaseStudy(null)
            setShowForm(true)
          }}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#1E5BFF] text-white text-sm font-semibold rounded-xl hover:bg-[#1650cc] shadow-md shadow-blue-500/20 transition-all cursor-pointer self-start sm:self-auto"
        >
          <Plus size={18} /> Add New Case Study
        </button>
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 text-gray-500">
          <Loader2 className="animate-spin text-[#1E5BFF] mb-3" size={32} />
          <p className="text-sm">Loading case studies...</p>
        </div>
      ) : caseStudies.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-gray-100 p-8">
          <FileText size={48} className="mx-auto text-gray-300 mb-3" />
          <p className="text-gray-500 mb-4">No case studies found in the database.</p>
          <button
            onClick={() => setShowForm(true)}
            className="px-4 py-2 bg-[#1E5BFF] text-white text-sm font-semibold rounded-xl hover:bg-[#1650cc]"
          >
            Create Your First Case Study
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 text-left text-sm">
              <thead className="bg-gray-50 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-3.5">Associated Project</th>
                  <th className="px-6 py-3.5">Slug</th>
                  <th className="px-6 py-3.5">Status</th>
                  <th className="px-6 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {caseStudies.map((cs) => (
                  <tr key={cs.id} className="hover:bg-gray-50/80 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-bold text-gray-900">
                        {cs.projects?.title || 'Unknown Project'}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-mono text-xs text-gray-500">/{cs.slug}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-block px-2.5 py-1 text-xs font-medium bg-green-50 text-green-700 rounded-lg">
                        Active
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="inline-flex items-center gap-2">
                        <Link
                          href={`/projects/${cs.slug}`}
                          target="_blank"
                          className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200"
                        >
                          <ExternalLink size={13} /> View
                        </Link>
                        <button
                          onClick={() => handleEdit(cs)}
                          className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-lg bg-blue-50 text-[#1E5BFF] hover:bg-blue-100"
                        >
                          <Edit2 size={13} /> Edit
                        </button>
                        <button
                          onClick={() => handleDelete(cs.id)}
                          className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-lg bg-red-50 text-red-600 hover:bg-red-100"
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
          <div className="max-w-3xl w-full my-8 bg-white rounded-2xl shadow-xl overflow-hidden p-6 max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">
              {editingCaseStudy ? 'Edit Case Study' : 'Create Case Study'}
            </h2>
            <CaseStudyForm
              initialData={editingCaseStudy}
              onSuccess={handleSuccess}
              onCancel={() => {
                setShowForm(false)
                setEditingCaseStudy(null)
              }}
            />
          </div>
        </div>
      )}
    </div>
  )
}
