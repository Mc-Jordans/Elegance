-- Check if the reservations table exists
SELECT EXISTS (
   SELECT FROM information_schema.tables 
   WHERE table_schema = 'public'
   AND table_name = 'reservations'
);

-- Check RLS policies on the reservations table
SELECT tablename, policyname, permissive, roles, cmd, qual, with_check
FROM pg_policies
WHERE tablename = 'reservations';

-- Check for any existing reservations
SELECT * FROM reservations LIMIT 5;