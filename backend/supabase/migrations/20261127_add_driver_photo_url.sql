-- ================================================================
-- SafeRoute FYP — Driver Profile Image / Photo URL Migration
-- Run this in: Supabase Dashboard → SQL Editor → New Query
-- ================================================================

-- Add photo_url and profile_image to existing public.drivers table
ALTER TABLE public.drivers 
  ADD COLUMN IF NOT EXISTS photo_url TEXT,
  ADD COLUMN IF NOT EXISTS profile_image TEXT;

-- Reload Supabase PostgREST schema cache immediately
NOTIFY pgrst, 'reload config';
