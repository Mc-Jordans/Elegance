-- Create reservations table
CREATE TABLE public.reservations (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  date DATE NOT NULL,
  time TIME NOT NULL,
  guests INTEGER NOT NULL,
  special_requests TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Set up Row Level Security
ALTER TABLE public.reservations ENABLE ROW LEVEL SECURITY;

-- Create policies
-- Allow anyone to insert a new reservation
CREATE POLICY "Allow public to insert reservations" 
  ON public.reservations 
  FOR INSERT 
  TO public 
  WITH CHECK (true);

-- Only allow authenticated users to view reservations
CREATE POLICY "Allow authenticated users to view reservations" 
  ON public.reservations 
  FOR SELECT 
  TO authenticated 
  USING (true);

-- Only allow authenticated users to update reservations
CREATE POLICY "Allow authenticated users to update reservations" 
  ON public.reservations 
  FOR UPDATE 
  TO authenticated 
  USING (true);

-- Only allow authenticated users to delete reservations
CREATE POLICY "Allow authenticated users to delete reservations" 
  ON public.reservations 
  FOR DELETE 
  TO authenticated 
  USING (true);

-- Create indexes for better performance
CREATE INDEX idx_reservations_date_time ON public.reservations (date, time);
CREATE INDEX idx_reservations_status ON public.reservations (status);