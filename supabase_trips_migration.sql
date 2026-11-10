-- ================================================================
-- SafeRoute FYP — Trips Feature Migration
-- Run this in: Supabase Dashboard → SQL Editor → New Query
-- ================================================================

-- 1. TABLE: trips
CREATE TABLE IF NOT EXISTS trips (
  id                    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id             UUID,
  driver_id             UUID,
  driver_name           TEXT,
  vehicle_name          TEXT,
  route                 TEXT,
  trip_date             DATE NOT NULL DEFAULT CURRENT_DATE,

  -- Pickup Sub-Trip
  pickup_status         TEXT NOT NULL DEFAULT 'pending'
                        CHECK (pickup_status IN ('pending', 'in_progress', 'completed')),
  pickup_started_at     TIMESTAMPTZ,
  pickup_completed_at   TIMESTAMPTZ,

  -- Dropoff Sub-Trip (locked until pickup completes)
  dropoff_status        TEXT NOT NULL DEFAULT 'locked'
                        CHECK (dropoff_status IN ('locked', 'pending', 'in_progress', 'completed')),
  dropoff_started_at    TIMESTAMPTZ,
  dropoff_completed_at  TIMESTAMPTZ,

  -- Overall Status
  overall_status        TEXT NOT NULL DEFAULT 'pending'
                        CHECK (overall_status IN (
                          'pending', 'pickup_active', 'pickup_done',
                          'dropoff_active', 'completed'
                        )),

  created_at            TIMESTAMPTZ DEFAULT NOW(),
  updated_at            TIMESTAMPTZ DEFAULT NOW()
);

-- 2. TABLE: trip_attendance
CREATE TABLE IF NOT EXISTS trip_attendance (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  trip_id         UUID NOT NULL REFERENCES trips(id) ON DELETE CASCADE,
  student_id      UUID NOT NULL,
  school_id       UUID,

  -- Pickup phase
  pickup_status   TEXT NOT NULL DEFAULT 'pending'
                  CHECK (pickup_status IN ('pending', 'picked_up', 'absent')),
  picked_up_at    TIMESTAMPTZ,

  -- Dropoff phase (only populated/relevant if pickup_status = 'picked_up')
  dropoff_status  TEXT NOT NULL DEFAULT 'pending'
                  CHECK (dropoff_status IN ('pending', 'dropped', 'skipped')),
  dropped_at      TIMESTAMPTZ,

  created_at      TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (trip_id, student_id)
);

-- 3. Enable Row Level Security (RLS)
ALTER TABLE trips ENABLE ROW LEVEL SECURITY;
ALTER TABLE trip_attendance ENABLE ROW LEVEL SECURITY;

-- 4. Permissive policies for authenticated and anon development
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'trips' AND policyname = 'Allow all for trips'
  ) THEN
    CREATE POLICY "Allow all for trips" ON trips FOR ALL USING (true) WITH CHECK (true);
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'trip_attendance' AND policyname = 'Allow all for trip_attendance'
  ) THEN
    CREATE POLICY "Allow all for trip_attendance" ON trip_attendance FOR ALL USING (true) WITH CHECK (true);
  END IF;
END $$;

-- 5. Helpful Performance Indexes
CREATE INDEX IF NOT EXISTS idx_trips_school_date    ON trips (school_id, trip_date);
CREATE INDEX IF NOT EXISTS idx_trips_driver         ON trips (driver_id);
CREATE INDEX IF NOT EXISTS idx_trips_overall_status ON trips (overall_status);
CREATE INDEX IF NOT EXISTS idx_trip_att_trip        ON trip_attendance (trip_id);
CREATE INDEX IF NOT EXISTS idx_trip_att_student     ON trip_attendance (student_id);

