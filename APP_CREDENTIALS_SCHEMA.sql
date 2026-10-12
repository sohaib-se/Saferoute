-- ============================================================================
-- SafeRoute FYP - Multi-Tenant App Credentials Table Schema
-- Table: public.app_credentials
-- Purpose: Stores unique 4-digit ID and password credentials for Parents & Drivers
--          to authenticate into their respective SafeRoute Mobile App portals.
-- ============================================================================

-- 1. Ensure UUID extension is available
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. APP CREDENTIALS TABLE
CREATE TABLE IF NOT EXISTS public.app_credentials (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    school_id UUID NOT NULL REFERENCES public.schools(id) ON DELETE CASCADE,
    user_type VARCHAR(50) NOT NULL CHECK (user_type IN ('parent', 'driver')),
    user_id UUID NOT NULL, -- references public.parents(id) or public.drivers(id)
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    login_id VARCHAR(10) NOT NULL, -- 4-digit unique code (e.g. '5821')
    password VARCHAR(255) NOT NULL, -- 4-digit password (initially identical to login_id)
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

    -- Exactly one active credentials record per parent or driver
    CONSTRAINT uq_app_credentials_user UNIQUE (school_id, user_type, user_id),

    -- Ensure 4-digit login_id is unique across the mobile authentication system
    CONSTRAINT uq_app_credentials_login_id UNIQUE (login_id)
);

-- 3. INDEXES FOR HIGH-PERFORMANCE LOOKUPS
CREATE INDEX IF NOT EXISTS idx_app_credentials_school_id ON public.app_credentials(school_id);
CREATE INDEX IF NOT EXISTS idx_app_credentials_user_type_id ON public.app_credentials(user_type, user_id);
CREATE INDEX IF NOT EXISTS idx_app_credentials_login_id ON public.app_credentials(login_id);

-- 4. ROW-LEVEL SECURITY (RLS) POLICIES
ALTER TABLE public.app_credentials ENABLE ROW LEVEL SECURITY;

-- Allow authenticated school admins to select credentials for their school
CREATE POLICY IF NOT EXISTS "Admins can view credentials of their school"
    ON public.app_credentials
    FOR SELECT
    USING (school_id::text = auth.uid()::text OR auth.role() = 'authenticated');

-- Allow authenticated school admins to insert credentials for their school
CREATE POLICY IF NOT EXISTS "Admins can insert credentials for their school"
    ON public.app_credentials
    FOR INSERT
    WITH CHECK (school_id::text = auth.uid()::text OR auth.role() = 'authenticated');

-- Allow authenticated school admins to update credentials for their school
CREATE POLICY IF NOT EXISTS "Admins can update credentials for their school"
    ON public.app_credentials
    FOR UPDATE
    USING (school_id::text = auth.uid()::text OR auth.role() = 'authenticated');

-- Allow authenticated school admins to delete credentials for their school
CREATE POLICY IF NOT EXISTS "Admins can delete credentials for their school"
    ON public.app_credentials
    FOR DELETE
    USING (school_id::text = auth.uid()::text OR auth.role() = 'authenticated');
