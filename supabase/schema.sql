-- ============================================================
-- MV Groups — Supabase Database Schema
-- ============================================================
-- Run this in the Supabase SQL Editor after creating your project.
-- ============================================================

-- ----------------------------------------
-- 1. Users table (extends Supabase auth.users)
-- ----------------------------------------
CREATE TABLE public.users (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL,
  full_name TEXT,
  company_name TEXT,
  phone TEXT,
  role TEXT NOT NULL DEFAULT 'client' CHECK (role IN ('client', 'admin')),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ----------------------------------------
-- 2. Bookings table
-- ----------------------------------------
CREATE TABLE public.bookings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  client_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
  service_type TEXT NOT NULL CHECK (service_type IN (
    'event_manpower',
    'promotional_staffing',
    'exhibition_staffing',
    'corporate_staffing',
    'wedding_social',
    'event_logistics'
  )),
  event_name TEXT,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  people_needed INTEGER NOT NULL DEFAULT 1,
  budget_range TEXT,
  description TEXT,
  contact_name TEXT,
  contact_email TEXT,
  contact_phone TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN (
    'pending', 'approved', 'rejected', 'invoiced', 'paid', 'completed'
  )),
  amount DECIMAL(10,2),
  admin_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ----------------------------------------
-- 3. Payments table
-- ----------------------------------------
CREATE TABLE public.payments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  booking_id UUID REFERENCES public.bookings(id) ON DELETE CASCADE NOT NULL,
  razorpay_order_id TEXT,
  razorpay_payment_id TEXT,
  razorpay_signature TEXT,
  amount DECIMAL(10,2) NOT NULL,
  currency TEXT NOT NULL DEFAULT 'INR',
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN (
    'pending', 'captured', 'failed', 'refunded'
  )),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ----------------------------------------
-- 4. Contact submissions (for guest contact form)
-- ----------------------------------------
CREATE TABLE public.contact_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ----------------------------------------
-- 5. Indexes for performance
-- ----------------------------------------
CREATE INDEX idx_bookings_client_id ON public.bookings(client_id);
CREATE INDEX idx_bookings_status ON public.bookings(status);
CREATE INDEX idx_bookings_created_at ON public.bookings(created_at DESC);
CREATE INDEX idx_payments_booking_id ON public.payments(booking_id);
CREATE INDEX idx_payments_status ON public.payments(status);

-- ----------------------------------------
-- 6. Updated_at trigger function
-- ----------------------------------------
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON public.users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_bookings_updated_at
  BEFORE UPDATE ON public.bookings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ----------------------------------------
-- 7. Auto-create user profile on signup
-- ----------------------------------------
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', '')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ----------------------------------------
-- 8. Row Level Security
-- ----------------------------------------
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.applicants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;

-- Users policies
CREATE POLICY "Users can read own profile"
  ON public.users FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.users FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Admins can read all users"
  ON public.users FOR SELECT
  USING (
    EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin')
  );

-- Bookings policies
CREATE POLICY "Clients can read own bookings"
  ON public.bookings FOR SELECT
  USING (client_id = auth.uid());

CREATE POLICY "Clients can create bookings"
  ON public.bookings FOR INSERT
  WITH CHECK (client_id = auth.uid());

CREATE POLICY "Admins can read all bookings"
  ON public.bookings FOR SELECT
  USING (
    EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Admins can update all bookings"
  ON public.bookings FOR UPDATE
  USING (
    EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin')
  );

-- Allow unauthenticated booking submissions (guest bookings)
CREATE POLICY "Anyone can create bookings"
  ON public.bookings FOR INSERT
  WITH CHECK (client_id IS NULL);

-- Payments policies
CREATE POLICY "Clients can view own payments"
  ON public.payments FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.bookings
      WHERE bookings.id = payments.booking_id
      AND bookings.client_id = auth.uid()
    )
  );

CREATE POLICY "Admins can manage all payments"
  ON public.payments FOR ALL
  USING (
    EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin')
  );

-- Contact submissions: anyone can insert, admins can read
CREATE POLICY "Anyone can submit contact form"
  ON public.contact_submissions FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admins can read contact submissions"
  ON public.contact_submissions FOR SELECT
  USING (
    EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin')
  );

-- Applicants policies
CREATE POLICY "Anyone can submit applications"
  ON public.applicants FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admins can manage applications"
  ON public.applicants FOR ALL
  USING (
    EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin')
  );

-- Inquiries policies
CREATE POLICY "Anyone can submit inquiries"
  ON public.inquiries FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admins can manage inquiries"
  ON public.inquiries FOR ALL
  USING (
    EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin')
  );

-- ----------------------------------------
-- 9. Make first admin (run manually after signup)
-- ----------------------------------------
-- UPDATE public.users SET role = 'admin' WHERE email = 'your-admin@email.com';

-- ----------------------------------------
-- 4. Applicants table (Careers)
-- ----------------------------------------
CREATE TABLE public.applicants (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  city TEXT NOT NULL,
  interest TEXT NOT NULL,
  availability TEXT NOT NULL,
  resume_url TEXT,
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'reviewed', 'shortlisted', 'rejected')),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Note: Resumes require a 'resumes' storage bucket to be created manually or via migrations.

-- ----------------------------------------
-- 5. Inquiries table (Contact Form)
-- ----------------------------------------
CREATE TABLE public.inquiries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'unread' CHECK (status IN ('unread', 'read', 'archived')),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ----------------------------------------
-- 6. Updates (News / Blog) table
-- ----------------------------------------
CREATE TABLE public.updates (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  content TEXT NOT NULL,
  thumbnail_url TEXT,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- RLS Policies
ALTER TABLE public.updates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view published updates"
ON public.updates FOR SELECT
USING (status = 'published');

CREATE POLICY "Admins have full access to updates"
ON public.updates FOR ALL
USING ( (SELECT role FROM public.users WHERE id = auth.uid()) = 'admin' );

-- ----------------------------------------
-- 7. Storage Bucket for Update Thumbnails
-- ----------------------------------------
INSERT INTO storage.buckets (id, name, public) 
VALUES ('updates_media', 'updates_media', true)
ON CONFLICT (id) DO NOTHING;

-- Storage Policies for updates_media
CREATE POLICY "Public can view update media"
ON storage.objects FOR SELECT
USING (bucket_id = 'updates_media');

CREATE POLICY "Admins can upload update media"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'updates_media' AND 
  (SELECT role FROM public.users WHERE id = auth.uid()) = 'admin'
);

CREATE POLICY "Admins can update update media"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'updates_media' AND 
  (SELECT role FROM public.users WHERE id = auth.uid()) = 'admin'
);

CREATE POLICY "Admins can delete update media"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'updates_media' AND 
  (SELECT role FROM public.users WHERE id = auth.uid()) = 'admin'
);

-- ----------------------------------------
-- 10. Testimonials table
-- ----------------------------------------
CREATE TABLE public.testimonials (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  client_name TEXT NOT NULL,
  company TEXT,
  role TEXT,
  quote TEXT NOT NULL,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- RLS Policies
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view testimonials"
ON public.testimonials FOR SELECT
USING (true);

CREATE POLICY "Admins have full access to testimonials"
ON public.testimonials FOR ALL
USING ( (SELECT role FROM public.users WHERE id = auth.uid()) = 'admin' );

-- ----------------------------------------
-- 11. Gallery Images table
-- ----------------------------------------
CREATE TABLE public.gallery_images (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  image_url TEXT NOT NULL,
  alt_text TEXT NOT NULL,
  category TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- RLS Policies
ALTER TABLE public.gallery_images ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view gallery images"
ON public.gallery_images FOR SELECT
USING (true);

CREATE POLICY "Admins have full access to gallery images"
ON public.gallery_images FOR ALL
USING ( (SELECT role FROM public.users WHERE id = auth.uid()) = 'admin' );

-- Create bucket for gallery images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('gallery', 'gallery', true)
ON CONFLICT (id) DO NOTHING;

-- Storage Policies for gallery bucket
CREATE POLICY "Public can view gallery media"
ON storage.objects FOR SELECT
USING (bucket_id = 'gallery');

CREATE POLICY "Admins can upload gallery media"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'gallery' AND 
  (SELECT role FROM public.users WHERE id = auth.uid()) = 'admin'
);

CREATE POLICY "Admins can update gallery media"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'gallery' AND 
  (SELECT role FROM public.users WHERE id = auth.uid()) = 'admin'
);

CREATE POLICY "Admins can delete gallery media"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'gallery' AND 
  (SELECT role FROM public.users WHERE id = auth.uid()) = 'admin'
);
