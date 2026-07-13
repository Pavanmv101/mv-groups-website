-- Create booking_messages table
CREATE TABLE IF NOT EXISTS public.booking_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    booking_id UUID NOT NULL REFERENCES public.bookings(id) ON DELETE CASCADE,
    sender_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    sender_role TEXT NOT NULL CHECK (sender_role IN ('client', 'admin')),
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Set up RLS
ALTER TABLE public.booking_messages ENABLE ROW LEVEL SECURITY;

-- Admins can read all messages
CREATE POLICY "Admins can view all booking messages"
    ON public.booking_messages FOR SELECT
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.users
            WHERE users.id = auth.uid() AND users.role = 'admin'
        )
    );

-- Clients can read messages for their own bookings
CREATE POLICY "Clients can view their own booking messages"
    ON public.booking_messages FOR SELECT
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.bookings
            WHERE bookings.id = booking_messages.booking_id AND bookings.client_id = auth.uid()
        )
    );

-- Admins can insert messages
CREATE POLICY "Admins can insert booking messages"
    ON public.booking_messages FOR INSERT
    TO authenticated
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.users
            WHERE users.id = auth.uid() AND users.role = 'admin'
        )
    );

-- Clients can insert messages for their own bookings
CREATE POLICY "Clients can insert booking messages"
    ON public.booking_messages FOR INSERT
    TO authenticated
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.bookings
            WHERE bookings.id = booking_messages.booking_id AND bookings.client_id = auth.uid()
        )
    );

-- Notify users on new message (optional realtime setup)
BEGIN;
  DROP PUBLICATION IF EXISTS supabase_realtime;
  CREATE PUBLICATION supabase_realtime;
COMMIT;
ALTER PUBLICATION supabase_realtime ADD TABLE public.booking_messages;
