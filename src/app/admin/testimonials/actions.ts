'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

async function getAdminClient() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')
  const { data } = await supabase.from('users').select('role').eq('id', user.id).single()
  if (!data || data.role !== 'admin') throw new Error('Forbidden')
  return supabase
}

export async function addTestimonial(formData: FormData) {
  try {
    const supabase = await getAdminClient()
    const { error } = await supabase.from('testimonials').insert({
      client_name: formData.get('client_name') as string,
      company: formData.get('company') as string || null,
      role: formData.get('role') as string || null,
      quote: formData.get('quote') as string,
      is_featured: formData.get('is_featured') === 'true',
    })
    if (error) return { error: error.message }
    revalidatePath('/admin')
    revalidatePath('/')
    return { success: true }
  } catch (e: any) {
    return { error: e.message }
  }
}

export async function updateTestimonial(id: string, formData: FormData) {
  try {
    const supabase = await getAdminClient()
    const { error } = await supabase.from('testimonials').update({
      client_name: formData.get('client_name') as string,
      company: formData.get('company') as string || null,
      role: formData.get('role') as string || null,
      quote: formData.get('quote') as string,
      is_featured: formData.get('is_featured') === 'true',
      updated_at: new Date().toISOString(),
    }).eq('id', id)
    if (error) return { error: error.message }
    revalidatePath('/admin')
    revalidatePath('/')
    return { success: true }
  } catch (e: any) {
    return { error: e.message }
  }
}

export async function deleteTestimonial(id: string) {
  try {
    const supabase = await getAdminClient()
    const { error } = await supabase.from('testimonials').delete().eq('id', id)
    if (error) return { error: error.message }
    revalidatePath('/admin')
    revalidatePath('/')
    return { success: true }
  } catch (e: any) {
    return { error: e.message }
  }
}

export async function toggleFeatured(id: string, currentStatus: boolean) {
  try {
    const supabase = await getAdminClient()
    const { error } = await supabase.from('testimonials').update({
      is_featured: !currentStatus,
      updated_at: new Date().toISOString(),
    }).eq('id', id)
    if (error) return { error: error.message }
    revalidatePath('/admin')
    revalidatePath('/')
    return { success: true }
  } catch (e: any) {
    return { error: e.message }
  }
}
