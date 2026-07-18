'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { createClient } from '@/utils/supabase/client';
import { uploadGalleryImage, deleteGalleryImage } from './actions';
import { Loader2, Upload, Trash2, Plus, Image as ImageIcon } from 'lucide-react';

type GalleryImage = {
  id: string;
  image_url: string;
  alt_text: string;
  category: string;
  created_at: string;
};

export default function AdminGalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  
  // Form state
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [altText, setAltText] = useState('');
  const [category, setCategory] = useState('');
  const [error, setError] = useState<string | null>(null);

  const fetchImages = async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const { data, error } = await supabase
        .from('gallery_images')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setImages(data || []);
    } catch (err) {
      console.error('Error fetching images:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      setFile(selected);
      setPreview(URL.createObjectURL(selected));
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !altText || !category) {
      setError('Please fill in all fields and select an image');
      return;
    }

    try {
      setUploading(true);
      setError(null);
      
      const formData = new FormData();
      formData.append('image', file);
      formData.append('altText', altText);
      formData.append('category', category);

      const result = await uploadGalleryImage(formData);
      
      if (result.error) {
        throw new Error(result.error);
      }

      // Reset form
      setFile(null);
      setPreview(null);
      setAltText('');
      setCategory('');
      
      // Refresh list
      await fetchImages();
    } catch (err: any) {
      setError(err.message || 'Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string, url: string) => {
    if (!window.confirm('Are you sure you want to delete this image?')) return;

    try {
      setDeleting(id);
      const result = await deleteGalleryImage(id, url);
      
      if (result.error) {
        throw new Error(result.error);
      }
      
      // Refresh list
      await fetchImages();
    } catch (err: any) {
      alert(err.message || 'Failed to delete image');
    } finally {
      setDeleting(null);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-6">
        <Link href="/admin" className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center gap-1">
          &larr; Back to Dashboard
        </Link>
      </div>
      <h1 className="text-3xl font-bold text-slate-900 mb-8">Manage Gallery</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Upload Form */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <Plus className="w-5 h-5 text-blue-600" />
              Add New Image
            </h2>

            {error && (
              <div className="mb-6 p-4 rounded-xl bg-red-50 text-red-600 text-sm border border-red-100">
                {error}
              </div>
            )}

            <form onSubmit={handleUpload} className="space-y-5">
              {/* Image Upload Area */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Image File</label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-300 border-dashed rounded-xl relative hover:bg-slate-50 transition-colors">
                  <div className="space-y-1 text-center">
                    {preview ? (
                      <div className="relative w-full h-32 mb-4">
                        <Image src={preview} alt="Preview" fill className="object-contain rounded-lg" />
                      </div>
                    ) : (
                      <ImageIcon className="mx-auto h-12 w-12 text-slate-400" />
                    )}
                    <div className="flex text-sm text-slate-600 justify-center">
                      <label className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                        <span>Upload a file</span>
                        <input name="file-upload" type="file" className="sr-only" accept="image/*" onChange={handleFileChange} />
                      </label>
                    </div>
                    <p className="text-xs text-slate-500">PNG, JPG, WEBP up to 5MB</p>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-slate-50 focus:bg-white transition-colors"
                >
                  <option value="">Select a category</option>
                  <option value="Corporate">Corporate</option>
                  <option value="Promotions">Promotions</option>
                  <option value="Exhibitions">Exhibitions</option>
                  <option value="Logistics">Logistics</option>
                  <option value="Hosting">Hosting</option>
                  <option value="Registration">Registration</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Description / Alt Text</label>
                <input
                  type="text"
                  value={altText}
                  onChange={(e) => setAltText(e.target.value)}
                  placeholder="e.g. VIP Hosting Team at Tech Summit"
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-slate-50 focus:bg-white transition-colors"
                />
              </div>

              <button
                type="submit"
                disabled={uploading || !file}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-transparent rounded-xl shadow-sm text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {uploading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4" />
                    Upload Image
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Existing Images Gallery */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 min-h-[500px]">
            <h2 className="text-xl font-bold text-slate-900 mb-6">Uploaded Images</h2>

            {loading ? (
              <div className="flex items-center justify-center h-64">
                <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
              </div>
            ) : images.length === 0 ? (
              <div className="text-center py-12 bg-slate-50 rounded-xl border-2 border-dashed border-slate-200">
                <ImageIcon className="w-12 h-12 text-slate-400 mx-auto mb-3" />
                <h3 className="text-sm font-medium text-slate-900">No images uploaded</h3>
                <p className="mt-1 text-sm text-slate-500">Get started by uploading your first gallery image.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {images.map((image) => (
                  <div key={image.id} className="relative group rounded-xl overflow-hidden border border-slate-200 bg-slate-50">
                    <div className="aspect-w-16 aspect-h-10 relative h-48">
                      <Image
                        src={image.image_url}
                        alt={image.alt_text}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-4">
                        <div className="flex justify-between items-start">
                          <span className="px-2 py-1 bg-white/20 backdrop-blur-md rounded-md text-xs font-semibold text-white">
                            {image.category}
                          </span>
                          <button
                            onClick={() => handleDelete(image.id, image.image_url)}
                            disabled={deleting === image.id}
                            className="p-2 bg-red-500/90 hover:bg-red-600 rounded-lg text-white transition-colors disabled:opacity-50"
                            title="Delete Image"
                          >
                            {deleting === image.id ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <Trash2 className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                        <p className="text-white text-sm font-medium line-clamp-2">
                          {image.alt_text}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
