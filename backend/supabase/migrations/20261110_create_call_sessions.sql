-- ================================================================
-- SafeRoute FYP — In-App Calling Feature Migration
-- ================================================================

CREATE TABLE IF NOT EXISTS public.call_sessions (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id       UUID,
  caller_id       UUID NOT NULL,
  caller_role     TEXT NOT NULL CHECK (caller_role IN ('driver', 'parent')),
  caller_name     TEXT NOT NULL,
  callee_id       UUID NOT NULL,
  callee_role     TEXT NOT NULL CHECK (callee_role IN ('driver', 'parent')),
  status          TEXT NOT NULL DEFAULT 'ringing'
                  CHECK (status IN ('ringing', 'connected', 'declined', 'ended', 'missed')),
  student_name    TEXT,
  vehicle_name    TEXT,

  -- WebRTC signalling payloads (JSONB)
  sdp_offer       JSONB,
  sdp_answer      JSONB,
  ice_candidates  JSONB DEFAULT '[]'::jsonb,

  started_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.call_sessions ENABLE ROW LEVEL SECURITY;

-- Permissive policy for authenticated and anon development
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'call_sessions' AND policyname = 'Allow public access for call_sessions'
  ) THEN
    CREATE POLICY "Allow public access for call_sessions" ON public.call_sessions FOR ALL USING (true) WITH CHECK (true);
  END IF;
END $$;

-- Enable Realtime publication
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables 
    WHERE pubname = 'supabase_realtime' AND tablename = 'call_sessions'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.call_sessions;
  END IF;
EXCEPTION
  WHEN OTHERS THEN
    NULL;
END $$;

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_call_sessions_callee ON public.call_sessions (callee_id, status);
CREATE INDEX IF NOT EXISTS idx_call_sessions_caller ON public.call_sessions (caller_id, status);

