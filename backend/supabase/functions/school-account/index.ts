// @ts-nocheck
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req: Request) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const body = await req.json()
    const { action, email, password, schoolName, name, address, phone } = body

    // Initialize Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? Deno.env.get('SUPABASE_ANON_KEY') ?? '',
    )

    // ==========================================
    // 1. REGISTER SCHOOL ACCOUNT
    // ==========================================
    if (action === 'register') {
      const finalSchoolName = schoolName || name

      if (!finalSchoolName || !email || !password) {
        return new Response(
          JSON.stringify({ error: 'School name, email, and password are required.' }), 
          {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 400,
          }
        )
      }

      // Check if school with same email already exists
      const { data: existingSchool, error: checkError } = await supabaseClient
        .from('schools')
        .select('id, email')
        .eq('email', email)
        .maybeSingle()

      if (existingSchool) {
        return new Response(
          JSON.stringify({ error: 'A school account with this email already exists.' }), 
          {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 400,
          }
        )
      }

      // Insert directly into public.schools table
      const { data: newSchool, error: insertError } = await supabaseClient
        .from('schools')
        .insert([
          {
            name: finalSchoolName,
            address: address || '',
            phone: phone || '',
            email: email,
            password: password,
          }
        ])
        .select()
        .single()

      if (insertError) {
        return new Response(
          JSON.stringify({ 
            error: insertError.message || 'Failed to create school',
            details: insertError 
          }), 
          {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 400,
          }
        )
      }

      return new Response(
        JSON.stringify({ 
          message: 'School registered successfully', 
          user: {
            id: newSchool.id,
            name: newSchool.name,
            email: newSchool.email,
            phone: newSchool.phone,
            address: newSchool.address,
            role: 'school_admin'
          }
        }), 
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200,
        }
      )
    }

    // ==========================================
    // 2. LOGIN SCHOOL ACCOUNT
    // ==========================================
    else if (action === 'login' || !action) {
      if (!email || !password) {
        return new Response(
          JSON.stringify({ error: 'Email/phone and password are required.' }), 
          {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 400,
          }
        )
      }

      // Check credentials in public.schools table by email or phone
      const { data: school, error: loginError } = await supabaseClient
        .from('schools')
        .select('*')
        .or(`email.eq.${email},phone.eq.${email}`)
        .eq('password', password)
        .maybeSingle()

      if (loginError || !school) {
        return new Response(
          JSON.stringify({ error: 'Invalid email/phone or password.' }), 
          {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 401,
          }
        )
      }

      return new Response(
        JSON.stringify({ 
          message: 'Login successful', 
          user: {
            id: school.id,
            name: school.name,
            email: school.email,
            phone: school.phone,
            address: school.address,
            role: 'school_admin'
          }
        }), 
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200,
        }
      )
    }

    // ==========================================
    // 3. CHANGE PASSWORD
    // ==========================================
    else if (action === 'change-password') {
      const { schoolId, currentPassword, newPassword } = body;

      if (!schoolId || !newPassword) {
        return new Response(
          JSON.stringify({ error: 'School ID and new password are required.' }), 
          {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 400,
          }
        );
      }

      // Fetch existing school to verify current password if provided
      const { data: school, error: fetchErr } = await supabaseClient
        .from('schools')
        .select('id, password')
        .eq('id', schoolId)
        .maybeSingle();

      if (fetchErr || !school) {
        return new Response(
          JSON.stringify({ error: 'School account not found.' }), 
          {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 404,
          }
        );
      }

      if (currentPassword && school.password && school.password !== currentPassword) {
        return new Response(
          JSON.stringify({ error: 'Current password is incorrect.' }), 
          {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 400,
          }
        );
      }

      const { error: updateErr } = await supabaseClient
        .from('schools')
        .update({ password: newPassword })
        .eq('id', schoolId);

      if (updateErr) {
        return new Response(
          JSON.stringify({ error: updateErr.message || 'Failed to update password.' }), 
          {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 400,
          }
        );
      }

      return new Response(
        JSON.stringify({ message: 'Password updated successfully' }), 
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200,
        }
      );
    }

    // ==========================================
    // 4. UPDATE SCHOOL PROFILE
    // ==========================================
    else if (action === 'update-profile') {
      const { schoolId, ...updates } = body;
      delete updates.action;

      if (!schoolId) {
        return new Response(
          JSON.stringify({ error: 'School ID is required.' }), 
          {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 400,
          }
        );
      }

      const { data: updatedSchool, error: updateErr } = await supabaseClient
        .from('schools')
        .update(updates)
        .eq('id', schoolId)
        .select()
        .single();

      if (updateErr) {
        return new Response(
          JSON.stringify({ error: updateErr.message || 'Failed to update school profile.' }), 
          {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 400,
          }
        );
      }

      return new Response(
        JSON.stringify({ message: 'Profile updated successfully', school: updatedSchool }), 
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200,
        }
      );
    }

    // Invalid action
    return new Response(
      JSON.stringify({ error: 'Invalid action specified.' }), 
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    )

  } catch (error: any) {
    return new Response(
      JSON.stringify({ error: error.message || 'Server error' }), 
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    )
  }
})
