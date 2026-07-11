'use client'

import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'
import { Megaphone, Plus, Edit, Trash2, Calendar, CheckCircle2, Clock, Image as ImageIcon, Loader2 } from 'lucide-react'

type UpdatePost = {
  id: string
  title: string
  slug: string
  content: string
  thumbnail_url: string | null
  status: string
  published_at: string | null
  created_at: string
}

export default function AdminUpdatesTable({ updates }: { updates: UpdatePost[] }) {
  const router = useRouter()
  const supabase = createClient()
  
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingPost, setEditingPost] = useState<UpdatePost | null>(null)

  const openNewPost = () => {
    setEditingPost(null)
    setIsModalOpen(true)
  }

  const openEditPost = (post: UpdatePost) => {
    setEditingPost(post)
    setIsModalOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this post? This action cannot be undone.')) {
      const { error } = await supabase.from('updates').delete().eq('id', id)
      if (!error) {
        router.refresh()
      }
    }
  }

  return (
    <>
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-200 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
          <Megaphone className="w-5 h-5 text-slate-500" />
          News & Updates
        </h2>
        
        <button
          onClick={openNewPost}
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          New Post
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-4 font-medium">Post Title</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium">Date</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {updates.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center text-slate-500">
                  No updates found. Create your first post!
                </td>
              </tr>
            ) : (
              updates.map((post) => (
                <tr key={post.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-medium text-slate-900">{post.title}</div>
                    <div className="text-slate-500 text-xs mt-1">/{post.slug}</div>
                  </td>
                  <td className="px-6 py-4">
                    {post.status === 'published' ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                        <CheckCircle2 className="w-3 h-3" /> Published
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-800">
                        <Clock className="w-3 h-3" /> Draft
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-slate-600 whitespace-nowrap">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {post.created_at.split('T')[0]}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => openEditPost(post)}
                      className="text-blue-600 hover:text-blue-800 p-2 hover:bg-blue-50 rounded-lg transition-colors mr-2"
                      title="Edit Post"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleDelete(post.id)}
                      className="text-red-600 hover:text-red-800 p-2 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete Post"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      </div>

      {/* Create / Edit Modal */}
      {isModalOpen && (
        <UpdatePostModal 
          editingPost={editingPost} 
          onClose={() => setIsModalOpen(false)} 
        />
      )}
    </>
  )
}

function UpdatePostModal({ 
  editingPost, 
  onClose 
}: { 
  editingPost: UpdatePost | null, 
  onClose: () => void 
}) {
  const router = useRouter()
  const supabase = createClient()
  
  const [isLoading, setIsLoading] = useState(false)
  const [title, setTitle] = useState(editingPost?.title || '')
  const [slug, setSlug] = useState(editingPost?.slug || '')
  const [content, setContent] = useState(editingPost?.content || '')
  const [status, setStatus] = useState(editingPost?.status || 'draft')
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null)

  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const generateSlug = (text: string) => {
    return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
  }

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
    if (!editingPost) {
      setSlug(generateSlug(e.target.value))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      let thumbnailUrl = editingPost?.thumbnail_url || null

      // Handle Image Upload
      if (thumbnailFile) {
        if (thumbnailFile.size > 2 * 1024 * 1024) {
          alert('Thumbnail must be less than 2MB.')
          setIsLoading(false)
          return
        }
        const allowedTypes: Record<string, string> = {
          'image/jpeg': 'jpg',
          'image/png': 'png',
          'image/webp': 'webp'
        }
        if (!allowedTypes[thumbnailFile.type]) {
          alert('Thumbnail must be an image (JPEG, PNG, WEBP).')
          setIsLoading(false)
          return
        }
        const fileExt = allowedTypes[thumbnailFile.type]
        const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`
        
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('updates_media')
          .upload(fileName, thumbnailFile)

        if (uploadError) throw uploadError

        const { data: publicUrlData } = supabase.storage
          .from('updates_media')
          .getPublicUrl(fileName)
          
        thumbnailUrl = publicUrlData.publicUrl
      }

      const postData = {
        title,
        slug,
        content,
        status,
        thumbnail_url: thumbnailUrl,
        published_at: status === 'published' && (!editingPost || editingPost.status === 'draft') 
          ? new Date().toISOString() 
          : editingPost?.published_at,
      }

      if (editingPost) {
        const { error } = await supabase.from('updates').update(postData).eq('id', editingPost.id)
        if (error) throw error
      } else {
        const { error } = await supabase.from('updates').insert([postData])
        if (error) throw error
      }

      onClose()
      router.refresh()
    } catch (error) {
      console.error('Error saving post:', error)
      alert('Failed to save post. Please make sure the slug is unique and try again.')
    } finally {
      setIsLoading(false)
    }
  }

  if (!isMounted) return null

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
        
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <h3 className="text-lg font-bold text-slate-900">
            {editingPost ? 'Edit Post' : 'Create New Post'}
          </h3>
          <button 
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto flex-grow flex flex-col gap-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Post Title</label>
              <input
                type="text"
                required
                value={title}
                onChange={handleTitleChange}
                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                placeholder="e.g., MV Groups Expands to New City"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">URL Slug</label>
              <input
                type="text"
                required
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-mono text-sm"
                placeholder="e.g., expands-to-new-city"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Content (Markdown Supported)</label>
            <textarea
              required
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={10}
              className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-mono text-sm"
              placeholder="# Heading 1&#10;Write your post content here using Markdown..."
            />
            <p className="text-xs text-slate-500 mt-2">
              Tip: Use # for headers, **text** for bold, and - for bulleted lists.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Featured Image</label>
              <div className="flex items-center gap-4">
                <label className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 border border-dashed border-slate-300 rounded-lg hover:bg-slate-50 hover:border-slate-400 transition-colors cursor-pointer text-sm text-slate-600 font-medium">
                  <ImageIcon className="w-4 h-4" />
                  {thumbnailFile ? thumbnailFile.name : 'Choose Image...'}
                  <input 
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    onChange={(e) => setThumbnailFile(e.target.files?.[0] || null)}
                  />
                </label>
                {editingPost?.thumbnail_url && !thumbnailFile && (
                  <div className="w-10 h-10 rounded overflow-hidden shrink-0 border border-slate-200">
                    <img src={editingPost.thumbnail_url} className="w-full h-full object-cover" alt="Current thumbnail" />
                  </div>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Publishing Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              >
                <option value="draft">Draft (Hidden)</option>
                <option value="published">Published (Public)</option>
              </select>
            </div>
          </div>

          <div className="pt-4 mt-2 border-t border-slate-100 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors shadow-sm disabled:opacity-70 flex items-center gap-2"
            >
              {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
              {editingPost ? 'Save Changes' : 'Publish Post'}
            </button>
          </div>

        </form>
      </div>
    </div>,
    document.body
  )
}
