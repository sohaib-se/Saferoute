-- Migration: 20261027_init_realtime_tables.sql
-- Description: Creates vehicle_locations, notifications, and sos_alerts tables for live tracking, real-time alerts, and SOS escalations.

-- 1. Live Vehicle Locations / Telemetry
CREATE TABLE IF NOT EXISTS public.vehicle_locations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  school_id UUID REFERENCES public.schools(id) ON DELETE CASCADE,
  driver_id UUID REFERENCES public.drivers(id) ON DELETE CASCADE,
  vehicle_name TEXT NOT NULL,
  latitude NUMERIC(10, 7) NOT NULL,
  longitude NUMERIC(10, 7) NOT NULL,
  speed_kmh NUMERIC(5, 2) DEFAULT 0,
  heading NUMERIC(5, 2) DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Real-time Notifications
CREATE TABLE IF NOT EXISTS public.notifications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  school_id UUID REFERENCES public.schools(id) ON DELETE CASCADE,
  recipient_type TEXT NOT NULL CHECK (recipient_type IN ('parent', 'driver', 'admin', 'all')),
  recipient_id UUID,
  student_id UUID REFERENCES public.students(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  type TEXT NOT NULL, -- 'trip_start' | 'picked_up' | 'dropped_off' | 'proximity' | 'notice' | 'sos'
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Emergency SOS Alerts
CREATE TABLE IF NOT EXISTS public.sos_alerts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  school_id UUID REFERENCES public.schools(id) ON DELETE CASCADE,
  sender_type TEXT NOT NULL CHECK (sender_type IN ('driver', 'parent')),
  sender_id UUID NOT NULL,
  sender_name TEXT NOT NULL,
  vehicle_name TEXT,
  latitude NUMERIC(10, 7),
  longitude NUMERIC(10, 7),
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'resolved')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS (Row Level Security) and allow full access for authenticated/anon keys
ALTER TABLE public.vehicle_locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sos_alerts ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'vehicle_locations' AND policyname = 'Allow public access') THEN
    CREATE POLICY "Allow public access" ON public.vehicle_locations FOR ALL USING (true) WITH CHECK (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'notifications' AND policyname = 'Allow public access') THEN
    CREATE POLICY "Allow public access" ON public.notifications FOR ALL USING (true) WITH CHECK (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'sos_alerts' AND policyname = 'Allow public access') THEN
    CREATE POLICY "Allow public access" ON public.sos_alerts FOR ALL USING (true) WITH CHECK (true);
  END IF;
END $$;

-- Enable Realtime publication
ALTER PUBLICATION supabase_realtime ADD TABLE public.students;
ALTER PUBLICATION supabase_realtime ADD TABLE public.vehicle_locations;
ALTER PUBLICATION supabase_realtime ADD TABLE public.notifications;
ALTER PUBLICATION supabase_realtime ADD TABLE public.sos_alerts;
