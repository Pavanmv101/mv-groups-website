'use server';

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';

export async function uploadGalleryImage(formData: FormData) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      throw new Error('Unauthorized');
    }

    // Verify admin role
    const { data: userData } = await supabase
      .from('users')
      .select('role')
      .eq('id', user.id)
      .single();

    if (userData?.role !== 'admin') {
      throw new Error('Unauthorized');
    }

    const file = formData.get('image') as File;
    const altText = formData.get('altText') as string;
    const category = formData.get('category') as string;

    if (!file || !altText || !category) {
      throw new Error('Missing required fields');
    }

    // Upload image to Supabase Storage
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
    const filePath = `uploads/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('gallery')
      .upload(filePath, file);

    if (uploadError) {
      throw uploadError;
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('gallery')
      .getPublicUrl(filePath);

    // Insert into database
    const { error: dbError } = await supabase
      .from('gallery_images')
      .insert({
        image_url: publicUrl,
        alt_text: altText,
        category: category,
      });

    if (dbError) {
      throw dbError;
    }

    revalidatePath('/gallery');
    revalidatePath('/admin/gallery');
    return { success: true };
  } catch (error) {
    console.error('Error uploading image:', error);
    return { error: 'Failed to upload image' };
  }
}

export async function deleteGalleryImage(id: string, imageUrl: string) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      throw new Error('Unauthorized');
    }

    // Verify admin role
    const { data: userData } = await supabase
      .from('users')
      .select('role')
      .eq('id', user.id)
      .single();

    if (userData?.role !== 'admin') {
      throw new Error('Unauthorized');
    }

    // Extract path from public URL
    // Format: https://[projectId].supabase.co/storage/v1/object/public/gallery/uploads/[filename]
    const urlParts = imageUrl.split('/gallery/');
    if (urlParts.length === 2) {
      const filePath = urlParts[1];
      
      // Delete from storage
      await supabase.storage
        .from('gallery')
        .remove([filePath]);
    }

    // Delete from database
    const { error: dbError } = await supabase
      .from('gallery_images')
      .delete()
      .eq('id', id);

    if (dbError) {
      throw dbError;
    }

    revalidatePath('/gallery');
    revalidatePath('/admin/gallery');
    return { success: true };
  } catch (error) {
    console.error('Error deleting image:', error);
    return { error: 'Failed to delete image' };
  }
}
