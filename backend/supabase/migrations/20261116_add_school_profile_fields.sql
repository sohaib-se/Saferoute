-- ================================================================
-- SafeRoute FYP — School Profile & Logo Fields Migration
-- Run this in: Supabase Dashboard → SQL Editor → New Query
-- ================================================================

-- Add logo, campus, website, timings and principal to existing public.schools table
ALTER TABLE public.schools 
  ADD COLUMN IF NOT EXISTS logo_url             TEXT,
  ADD COLUMN IF NOT EXISTS campus_name         TEXT DEFAULT 'Main Campus',
  ADD COLUMN IF NOT EXISTS website             TEXT,
  ADD COLUMN IF NOT EXISTS morning_start_time  TEXT DEFAULT '07:30 AM',
  ADD COLUMN IF NOT EXISTS afternoon_dismissal TEXT DEFAULT '02:15 PM',
  ADD COLUMN IF NOT EXISTS principal_name      TEXT,
  ADD COLUMN IF NOT EXISTS updated_at          TIMESTAMPTZ DEFAULT NOW();

-- Enable RLS and permissive policy if not already enabled
ALTER TABLE public.schools ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'schools' AND policyname = 'Allow all operations on schools'
  ) THEN
    CREATE POLICY "Allow all operations on schools" 
      ON public.schools FOR ALL 
      USING (true) 
      WITH CHECK (true);
  END IF;
END $$;
