import { createClient } from '@/lib/supabase/client'
import { SupabaseClient } from '@supabase/supabase-js'

export const SUPABASE_BUCKET_PROJECTS = 'project-images'
export const SUPABASE_BUCKET_CASE_STUDIES = 'case-study-images'
export const SUPABASE_BUCKET_SITE_MEDIA = 'site-media'

// Initialize a client (browser client) for storage operations
function getSupabase(): SupabaseClient {
  return createClient()
}

/**
 * Upload a file to a specific bucket and folder path.
 * Returns the public URL of the uploaded file.
 */
export async function uploadFile(
  file: File,
  bucket: string,
  folderPath: string = ''
): Promise<string> {
  const supabase = getSupabase()
  const fileName = `${folderPath}${folderPath ? '/' : ''}${Date.now()}_${file.name}`
  const { data, error } = await supabase.storage.from(bucket).upload(fileName, file)
  if (error) throw error
  // Build public URL
  const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${bucket}/${data.path}`
  return url
}

/** List files in a bucket optionally under a folder (prefix). */
export async function listFiles(
  bucket: string,
  folderPath: string = ''
): Promise<any[]> {
  const supabase = getSupabase()
  const { data, error } = await supabase.storage.from(bucket).list(folderPath, {
    limit: 1000,
    offset: 0,
    sortBy: { column: 'name', order: 'asc' },
  })
  if (error) throw error
  return data
}

/** Delete a file from a bucket. */
export async function deleteFile(bucket: string, path: string): Promise<void> {
  const supabase = getSupabase()
  const { error } = await supabase.storage.from(bucket).remove([path])
  if (error) throw error
}

/** Create a new folder (prefix) in a bucket - Supabase storage creates folders implicitly on upload. */
export async function createFolder(bucket: string, folderPath: string): Promise<void> {
  // No explicit folder creation; ensure folder exists by uploading a zero-byte placeholder
  const supabase = getSupabase()
  const placeholder = new File([''], '.keep')
  await uploadFile(placeholder, bucket, folderPath)
}
