import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://lldbqccxuzqnbhxtzche.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_nMS2k0j-U9BdxuWCj8Oipw_yyKZuZ3e';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
