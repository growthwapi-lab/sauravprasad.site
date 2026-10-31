'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import TiptapImage from '@tiptap/extension-image'
import TiptapLink from '@tiptap/extension-link'
import { cn } from '@/lib/utils'

interface RichTextEditorProps {
  initialContent?: string
  onChange?: (html: string) => void
  placeholder?: string
}

export default function RichTextEditor({ initialContent = '', onChange, placeholder = 'Start typing...' }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      TiptapImage.configure({ inline: false }),
      TiptapLink.configure({ openOnClick: false }),
    ],
    content: initialContent,
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML())
    },
  })

  if (!editor) return null

  const addImage = () => {
    const url = prompt('Enter image URL')
    if (url) {
      editor.chain().focus().setImage({ src: url }).run()
    }
  }

  const addLink = () => {
    const url = prompt('Enter link URL')
    if (url) {
      editor.chain().focus().setLink({ href: url }).run()
    }
  }

  return (
    <div className={cn('border rounded-lg p-4', 'focus-within:ring-2 focus-within:ring-blue-500')}>
      <div className="flex flex-wrap gap-2 mb-3 pb-3 border-b border-gray-200">
        <button type="button" onClick={() => editor.chain().focus().toggleBold().run()} className={cn('px-3 py-1.5 rounded text-sm font-medium', editor.isActive('bold') ? 'bg-[#1E5BFF] text-white' : 'bg-gray-100 hover:bg-gray-200')}>
          Bold
        </button>
        <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()} className={cn('px-3 py-1.5 rounded text-sm font-medium', editor.isActive('italic') ? 'bg-[#1E5BFF] text-white' : 'bg-gray-100 hover:bg-gray-200')}>
          Italic
        </button>
        <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={cn('px-3 py-1.5 rounded text-sm font-medium', editor.isActive('heading', { level: 2 }) ? 'bg-[#1E5BFF] text-white' : 'bg-gray-100 hover:bg-gray-200')}>
          H2
        </button>
        <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} className={cn('px-3 py-1.5 rounded text-sm font-medium', editor.isActive('heading', { level: 3 }) ? 'bg-[#1E5BFF] text-white' : 'bg-gray-100 hover:bg-gray-200')}>
          H3
        </button>
        <button type="button" onClick={() => editor.chain().focus().toggleBulletList().run()} className={cn('px-3 py-1.5 rounded text-sm font-medium', editor.isActive('bulletList') ? 'bg-[#1E5BFF] text-white' : 'bg-gray-100 hover:bg-gray-200')}>
          List
        </button>
        <button type="button" onClick={() => editor.chain().focus().toggleBlockquote().run()} className={cn('px-3 py-1.5 rounded text-sm font-medium', editor.isActive('blockquote') ? 'bg-[#1E5BFF] text-white' : 'bg-gray-100 hover:bg-gray-200')}>
          Quote
        </button>
        <button type="button" onClick={addLink} className="px-3 py-1.5 rounded text-sm font-medium bg-gray-100 hover:bg-gray-200">
          Link
        </button>
        <button type="button" onClick={addImage} className="px-3 py-1.5 rounded text-sm font-medium bg-gray-100 hover:bg-gray-200">
          Image
        </button>
      </div>
      <EditorContent editor={editor} className="prose max-w-none min-h-[200px] focus:outline-none" />
    </div>
  )
}
