'use client'

import { useState, useTransition } from 'react'
import { Star, StarOff, Pencil, Trash2, Plus, X, Loader2 } from 'lucide-react'
import { addTestimonial, updateTestimonial, deleteTestimonial, toggleFeatured } from '@/app/admin/testimonials/actions'

type Testimonial = {
  id: string
  client_name: string
  company: string | null
  role: string | null
  quote: string
  is_featured: boolean
  created_at: string
}

type ModalMode = 'add' | 'edit' | null

function TestimonialModal({
  mode,
  testimonial,
  onClose,
}: {
  mode: ModalMode
  testimonial?: Testimonial
  onClose: () => void
}) {
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)
  const [isFeatured, setIsFeatured] = useState(testimonial?.is_featured ?? false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    formData.set('is_featured', isFeatured ? 'true' : 'false')

    startTransition(async () => {
      const result = mode === 'add'
        ? await addTestimonial(formData)
        : await updateTestimonial(testimonial!.id, formData)

      if (result.error) {
        setError(result.error)
      } else {
        onClose()
      }
    })
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl">
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <h2 className="text-xl font-bold text-slate-900">
            {mode === 'add' ? 'Add New Testimonial' : 'Edit Testimonial'}
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Client Name *</label>
            <input
              name="client_name"
              required
              defaultValue={testimonial?.client_name}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="e.g. Sarah Jenkins"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Role</label>
              <input
                name="role"
                defaultValue={testimonial?.role ?? ''}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="e.g. Event Director"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Company</label>
              <input
                name="company"
                defaultValue={testimonial?.company ?? ''}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="e.g. TechFlow Innovations"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Quote *</label>
            <textarea
              name="quote"
              required
              rows={4}
              defaultValue={testimonial?.quote}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
              placeholder="What did the client say about MV Groups?"
            />
          </div>

          <div
            className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-colors ${
              isFeatured ? 'border-amber-300 bg-amber-50' : 'border-slate-200 bg-slate-50'
            }`}
            onClick={() => setIsFeatured(!isFeatured)}
          >
            <Star className={`w-5 h-5 ${isFeatured ? 'text-amber-500 fill-amber-500' : 'text-slate-400'}`} />
            <div>
              <p className="font-medium text-slate-800 text-sm">Feature on Homepage</p>
              <p className="text-xs text-slate-500">Featured testimonials appear in the "What Our Clients Say" section.</p>
            </div>
            <div className={`ml-auto w-5 h-5 rounded-full border-2 flex items-center justify-center ${
              isFeatured ? 'border-amber-500 bg-amber-500' : 'border-slate-300'
            }`}>
              {isFeatured && <div className="w-2 h-2 rounded-full bg-white" />}
            </div>
          </div>

          {error && (
            <p className="text-sm text-red-600 bg-red-50 px-4 py-2 rounded-lg">{error}</p>
          )}

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="flex-1 px-4 py-2.5 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {isPending && <Loader2 className="w-4 h-4 animate-spin" />}
              {mode === 'add' ? 'Add Testimonial' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default function AdminTestimonialsTable({ testimonials: initial }: { testimonials: Testimonial[] }) {
  const [testimonials, setTestimonials] = useState(initial)
  const [modalMode, setModalMode] = useState<ModalMode>(null)
  const [editTarget, setEditTarget] = useState<Testimonial | undefined>(undefined)
  const [isPending, startTransition] = useTransition()
  const [pendingId, setPendingId] = useState<string | null>(null)

  function openAdd() {
    setEditTarget(undefined)
    setModalMode('add')
  }

  function openEdit(t: Testimonial) {
    setEditTarget(t)
    setModalMode('edit')
  }

  function closeModal() {
    setModalMode(null)
    setEditTarget(undefined)
    // Refresh is handled by server revalidation, but for instant UI update we just close
  }

  function handleDelete(id: string) {
    if (!confirm('Are you sure you want to delete this testimonial?')) return
    setPendingId(id)
    startTransition(async () => {
      await deleteTestimonial(id)
      setTestimonials(prev => prev.filter(t => t.id !== id))
      setPendingId(null)
    })
  }

  function handleToggleFeatured(t: Testimonial) {
    setPendingId(t.id)
    startTransition(async () => {
      await toggleFeatured(t.id, t.is_featured)
      setTestimonials(prev => prev.map(item =>
        item.id === t.id ? { ...item, is_featured: !item.is_featured } : item
      ))
      setPendingId(null)
    })
  }

  return (
    <>
      {modalMode && (
        <TestimonialModal mode={modalMode} testimonial={editTarget} onClose={closeModal} />
      )}

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-sm text-slate-500">{testimonials.length} testimonial{testimonials.length !== 1 ? 's' : ''} total</p>
          <button
            onClick={openAdd}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Testimonial
          </button>
        </div>

        {testimonials.length === 0 ? (
          <div className="text-center py-20 border-2 border-dashed border-slate-200 rounded-2xl">
            <Star className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <h3 className="font-semibold text-slate-700 mb-1">No testimonials yet</h3>
            <p className="text-slate-500 text-sm mb-4">Add your first client testimonial to display it on the homepage.</p>
            <button
              onClick={openAdd}
              className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Add First Testimonial
            </button>
          </div>
        ) : (
          <div className="grid gap-4">
            {testimonials.map(t => (
              <div
                key={t.id}
                className={`bg-white border rounded-2xl p-5 transition-all ${
                  t.is_featured ? 'border-amber-200 shadow-amber-50 shadow-sm' : 'border-slate-200'
                } ${pendingId === t.id ? 'opacity-60 pointer-events-none' : ''}`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-semibold text-slate-900">{t.client_name}</span>
                      {t.role && t.company && (
                        <span className="text-sm text-slate-500">· {t.role}, {t.company}</span>
                      )}
                      {t.is_featured && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-700">
                          <Star className="w-3 h-3 fill-amber-500 text-amber-500" /> Featured
                        </span>
                      )}
                    </div>
                    <p className="text-slate-600 italic text-sm leading-relaxed line-clamp-3">"{t.quote}"</p>
                  </div>

                  <div className="flex items-center gap-1 flex-shrink-0">
                    <button
                      onClick={() => handleToggleFeatured(t)}
                      title={t.is_featured ? 'Remove from featured' : 'Mark as featured'}
                      className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
                    >
                      {t.is_featured
                        ? <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                        : <StarOff className="w-4 h-4 text-slate-400" />
                      }
                    </button>
                    <button
                      onClick={() => openEdit(t)}
                      title="Edit"
                      className="p-2 rounded-lg hover:bg-indigo-50 text-indigo-600 transition-colors"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(t.id)}
                      title="Delete"
                      className="p-2 rounded-lg hover:bg-red-50 text-red-500 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  )
}
