'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { uploadFile, listFiles, deleteFile, SUPABASE_BUCKET_PROJECTS, SUPABASE_BUCKET_SITE_MEDIA, SUPABASE_BUCKET_CASE_STUDIES } from '@/lib/supabase/media'
import { Loader2, Upload, Copy, Check, Trash2, Folder, Image as ImageIcon } from 'lucide-react'

const localAssets = [
  { name: 'Growthwapilogo.png.png', url: '/Growthwapilogo.png.png' },
  { name: 'npvl logo.png.png', url: '/npvl logo.png.png' },
  { name: 'saurav prasad circular.png.png', url: '/saurav prasad circular.png.png' },
  { name: 'Saurav Prasad.png.png', url: '/Saurav Prasad.png.png' },
  { name: 'sportspefb logo.png.png', url: '/sportspefb logo.png.png' },
  { name: 'thebackstorymedia logo.png.png', url: '/thebackstorymedia logo.png.png' },
  { name: 'thetakestudio logo.png.png', url: '/thetakestudio logo.png.png' },
  { name: 'veertejawatertech logo.png.png', url: '/veertejawatertech logo.png.png' },
]

export default function AdminMediaLibraryPage() {
  const [activeTab, setActiveTab] = useState<'local' | 'cloud'>('local')
  const [selectedBucket, setSelectedBucket] = useState(SUPABASE_BUCKET_PROJECTS)
  const [cloudFiles, setCloudFiles] = useState<any[]>([])
  const [loadingCloud, setLoadingCloud] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null)

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url)
    setCopiedUrl(url)
    setTimeout(() => setCopiedUrl(null), 2000)
  }

  const fetchCloudFiles = async () => {
    setLoadingCloud(true)
    try {
      const files = await listFiles(selectedBucket)
      setCloudFiles(files || [])
    } catch (err) {
      console.warn('Could not list cloud files:', err)
      setCloudFiles([])
    } finally {
      setLoadingCloud(false)
    }
  }

  useEffect(() => {
    if (activeTab === 'cloud') {
      fetchCloudFiles()
    }
  }, [activeTab, selectedBucket])

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    setUploading(true)
    try {
      for (let i = 0; i < files.length; i++) {
        await uploadFile(files[i], selectedBucket)
      }
      fetchCloudFiles()
    } catch (err: any) {
      alert('Upload failed: ' + (err.message || 'Unknown error'))
    } finally {
      setUploading(false)
    }
  }

  const handleDeleteCloudFile = async (name: string) => {
    if (!confirm(`Delete ${name}?`)) return
    try {
      await deleteFile(selectedBucket, name)
      fetchCloudFiles()
    } catch (err: any) {
      alert('Delete failed: ' + err.message)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-200">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Media Library</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage project logos, gallery graphics, and website assets with 1-click link copying.
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex items-center gap-2 p-1 bg-gray-100 rounded-xl self-start sm:self-auto">
          <button
            onClick={() => setActiveTab('local')}
            className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              activeTab === 'local'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Website Assets ({localAssets.length})
          </button>
          <button
            onClick={() => setActiveTab('cloud')}
            className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              activeTab === 'cloud'
                ? 'bg-white text-[#1E5BFF] shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Cloud Storage
          </button>
        </div>
      </div>

      {/* Local Assets Tab */}
      {activeTab === 'local' && (
        <div className="space-y-4">
          <div className="p-4 bg-blue-50/50 border border-blue-100 rounded-2xl flex items-center justify-between text-xs text-blue-800">
            <span>
              💡 <strong>Tip:</strong> Click <strong>Copy Path</strong> on any asset to paste it directly into Project Logo / Image fields!
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {localAssets.map((asset) => (
              <div
                key={asset.name}
                className="group bg-white p-4 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="h-32 bg-gray-50 rounded-xl overflow-hidden mb-3 flex items-center justify-center p-3 border border-gray-100">
                  <img
                    src={asset.url}
                    alt={asset.name}
                    className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform"
                  />
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-800 truncate mb-1" title={asset.name}>
                    {asset.name}
                  </p>
                  <p className="text-[11px] text-gray-400 font-mono truncate mb-3">{asset.url}</p>
                  <button
                    onClick={() => copyToClipboard(asset.url)}
                    className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-gray-100 text-gray-700 hover:bg-[#1E5BFF] hover:text-white transition-all cursor-pointer"
                  >
                    {copiedUrl === asset.url ? (
                      <>
                        <Check size={13} className="text-green-400" /> Copied!
                      </>
                    ) : (
                      <>
                        <Copy size={13} /> Copy Path
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Cloud Storage Tab */}
      {activeTab === 'cloud' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-gray-200">
            {/* Bucket selector */}
            <div className="flex items-center gap-2">
              <Folder size={18} className="text-[#1E5BFF]" />
              <span className="text-xs font-semibold text-gray-600">Bucket:</span>
              <select
                value={selectedBucket}
                onChange={(e) => setSelectedBucket(e.target.value)}
                className="text-xs font-medium border border-gray-200 rounded-lg px-2.5 py-1.5 outline-none focus:ring-2 focus:ring-[#1E5BFF]"
              >
                <option value={SUPABASE_BUCKET_PROJECTS}>project-images</option>
                <option value={SUPABASE_BUCKET_SITE_MEDIA}>site-media</option>
                <option value={SUPABASE_BUCKET_CASE_STUDIES}>case-study-images</option>
              </select>
            </div>

            {/* Upload Button */}
            <label className="inline-flex items-center gap-2 px-4 py-2 bg-[#1E5BFF] text-white text-xs font-semibold rounded-xl hover:bg-[#1650cc] shadow-sm transition-all cursor-pointer">
              {uploading ? (
                <>
                  <Loader2 className="animate-spin" size={15} /> Uploading...
                </>
              ) : (
                <>
                  <Upload size={15} /> Upload to {selectedBucket}
                </>
              )}
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileUpload}
                disabled={uploading}
                className="hidden"
              />
            </label>
          </div>

          {loadingCloud ? (
            <div className="flex items-center justify-center py-16 text-gray-500">
              <Loader2 className="animate-spin text-[#1E5BFF] mr-2" size={24} /> Loading bucket items...
            </div>
          ) : cloudFiles.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-gray-100 p-8">
              <ImageIcon size={48} className="mx-auto text-gray-300 mb-3" />
              <p className="text-gray-500 text-sm">No files uploaded in bucket &quot;{selectedBucket}&quot; yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {cloudFiles.map((file) => {
                const publicUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${selectedBucket}/${file.name}`
                return (
                  <div
                    key={file.id || file.name}
                    className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm flex flex-col justify-between"
                  >
                    <div className="h-32 bg-gray-50 rounded-xl overflow-hidden mb-3 flex items-center justify-center p-2 border border-gray-100">
                      <img
                        src={publicUrl}
                        alt={file.name}
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-800 truncate mb-2">{file.name}</p>
                      <div className="flex gap-2">
                        <button
                          onClick={() => copyToClipboard(publicUrl)}
                          className="flex-1 inline-flex items-center justify-center gap-1 px-2.5 py-1.5 text-xs font-medium rounded-lg bg-gray-100 text-gray-700 hover:bg-[#1E5BFF] hover:text-white transition-all cursor-pointer"
                        >
                          {copiedUrl === publicUrl ? <Check size={12} /> : <Copy size={12} />} Copy URL
                        </button>
                        <button
                          onClick={() => handleDeleteCloudFile(file.name)}
                          className="p-1.5 text-xs text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
