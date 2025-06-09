-- Update orders table to remove contact_phone column
ALTER TABLE public.orders ALTER COLUMN contact_phone DROP NOT NULL;