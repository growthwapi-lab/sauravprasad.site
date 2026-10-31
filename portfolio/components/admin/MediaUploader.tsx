'use client'

import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { uploadFile, createFolder, listFiles, SUPABASE_BUCKET_SITE_MEDIA } from '@/lib/supabase/media'
import { Loader2, FolderPlus } from 'lucide-react'
import { cn } from '@/lib/utils'

interface MediaUploaderProps {
  bucket?: string
  folderPath?: string
  onUploadComplete?: (urls: string[]) => void
}

export default function MediaUploader({
  bucket = SUPABASE_BUCKET_SITE_MEDIA,
  folderPath = '',
  onUploadComplete,
}: MediaUploaderProps) {
  const [uploading, setUploading] = useState(false)
  const [files, setFiles] = useState<File[]>([])
  const [uploadedUrls, setUploadedUrls] = useState<string[]>([])

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles((prev) => [...prev, ...acceptedFiles])
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  const handleUpload = async () => {
    if (!files.length) return
    setUploading(true)
    try {
      const urls = [] as string[]
      for (const file of files) {
        const url = await uploadFile(file, bucket, folderPath)
        urls.push(url)
      }
      setUploadedUrls(urls)
      onUploadComplete?.(urls)
      setFiles([])
    } catch (e) {
      console.error(e)
    } finally {
      setUploading(false)
    }
  }

  const handleCreateFolder = async () => {
    const name = prompt('Enter folder name')
    if (!name) return
    try {
      await createFolder(bucket, name)
      // optionally refresh list by invoking parent callback or using listFiles directly
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <div className="border rounded-lg p-4 bg-white">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium">Upload Media</h3>
        <button
          type="button"
          onClick={handleCreateFolder}
          className="flex items-center gap-1 text-sm text-[#1E5BFF] hover:underline"
        >
          <FolderPlus size={16} /> Create Folder
        </button>
      </div>
      <div
        {...getRootProps()}
        className={cn(
          'border-2 border-dashed rounded-md p-6 text-center cursor-pointer',
          isDragActive ? 'border-[#1E5BFF] bg-blue-50' : 'border-gray-300'
        )}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p className="text-[#1E5BFF]">Drop the files here …</p>
        ) : (
          <p className="text-gray-600">Drag & drop files here, or click to select files</p>
        )}
      </div>
      {files.length > 0 && (
        <div className="mt-4">
          <p className="text-sm font-medium mb-2">Files to upload:</p>
          <ul className="list-disc list-inside text-sm mb-2">
            {files.map((f) => (
              <li key={f.name}>{f.name} ({(f.size / 1024).toFixed(1)} KB)</li>
            ))}
          </ul>
          <button
            type="button"
            onClick={handleUpload}
            disabled={uploading}
            className="flex items-center gap-2 px-4 py-2 bg-[#1E5BFF] text-white rounded hover:bg-[#1650cc] disabled:opacity-60"
          >
            {uploading && <Loader2 className="animate-spin" size={16} />}
            Upload
          </button>
        </div>
      )}
      {uploadedUrls.length > 0 && (
        <div className="mt-4">
          <p className="text-sm font-medium mb-2">Uploaded URLs:</p>
          <ul className="list-disc list-inside text-xs break-all">
            {uploadedUrls.map((url) => (
              <li key={url}>
                <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                  {url}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
