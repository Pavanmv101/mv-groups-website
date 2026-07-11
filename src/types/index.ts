// ============================================================
// MV Groups — TypeScript Types
// ============================================================

export type UserRole = 'client' | 'admin';

export type BookingStatus =
  | 'pending'
  | 'approved'
  | 'rejected'
  | 'invoiced'
  | 'paid'
  | 'completed';

export type ServiceType =
  | 'manpower_staffing'
  | 'event_management'
  | 'tech_staffing'
  | 'software_event';

export type PaymentStatus = 'pending' | 'captured' | 'failed' | 'refunded';

export interface User {
  id: string;
  email: string;
  full_name: string | null;
  company_name: string | null;
  phone: string | null;
  role: UserRole;
  created_at: string;
  updated_at: string;
}

export interface Booking {
  id: string;
  client_id: string | null;
  service_type: ServiceType;
  event_name: string | null;
  start_date: string;
  end_date: string;
  people_needed: number;
  budget_range: string | null;
  description: string | null;
  contact_name: string | null;
  contact_email: string | null;
  contact_phone: string | null;
  status: BookingStatus;
  amount: number | null;
  admin_notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface Payment {
  id: string;
  booking_id: string;
  razorpay_order_id: string | null;
  razorpay_payment_id: string | null;
  razorpay_signature: string | null;
  amount: number;
  currency: string;
  status: PaymentStatus;
  created_at: string;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  message: string;
  is_read: boolean;
  created_at: string;
}

export interface BookingFormData {
  service_type: ServiceType;
  event_name?: string;
  start_date: string;
  end_date: string;
  people_needed: number;
  budget_range?: string;
  description?: string;
  contact_name: string;
  contact_email: string;
  contact_phone: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
}

// Stats for the admin dashboard
export interface DashboardStats {
  totalBookings: number;
  pendingBookings: number;
  activeBookings: number;
  monthlyRevenue: number;
  totalRevenue: number;
  totalClients: number;
}
