/*
  # Fix Reservations System Integration

  1. Changes
    - Add missing indexes for better performance
    - Update RLS policies for better security
    - Add status enum constraint
    - Add trigger for last_updated timestamp

  2. Security
    - Verify and update RLS policies
    - Add row-level security checks
*/

-- First verify the table exists and create if not
CREATE TABLE IF NOT EXISTS public.reservations (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  date DATE NOT NULL,
  time TIME NOT NULL,
  guests INTEGER NOT NULL CHECK (guests > 0),
  special_requests TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled')),
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  last_updated TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Add last_updated trigger
CREATE OR REPLACE FUNCTION update_last_updated_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.last_updated = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_reservations_last_updated ON reservations;
CREATE TRIGGER update_reservations_last_updated
  BEFORE UPDATE ON reservations
  FOR EACH ROW
  EXECUTE FUNCTION update_last_updated_column();

-- Ensure RLS is enabled
ALTER TABLE public.reservations ENABLE ROW LEVEL SECURITY;

-- Drop existing policies to recreate them
DROP POLICY IF EXISTS "Allow public to insert reservations" ON public.reservations;
DROP POLICY IF EXISTS "Allow authenticated users to view reservations" ON public.reservations;
DROP POLICY IF EXISTS "Allow authenticated users to update reservations" ON public.reservations;
DROP POLICY IF EXISTS "Allow authenticated users to delete reservations" ON public.reservations;

-- Create new, more secure policies
CREATE POLICY "Allow public to insert reservations" 
  ON public.reservations 
  FOR INSERT 
  TO public 
  WITH CHECK (true);

CREATE POLICY "Allow admin users to view all reservations" 
  ON public.reservations 
  FOR SELECT 
  TO authenticated 
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.user_id = auth.uid()
    )
  );

CREATE POLICY "Allow admin users to update reservations" 
  ON public.reservations 
  FOR UPDATE 
  TO authenticated 
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.user_id = auth.uid()
    )
  );

CREATE POLICY "Allow admin users to delete reservations" 
  ON public.reservations 
  FOR DELETE 
  TO authenticated 
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.user_id = auth.uid()
    )
  );

-- Add missing indexes
CREATE INDEX IF NOT EXISTS idx_reservations_date_time ON public.reservations (date, time);
CREATE INDEX IF NOT EXISTS idx_reservations_status ON public.reservations (status);
CREATE INDEX IF NOT EXISTS idx_reservations_email ON public.reservations (email);