import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://lldbqccxuzqnbhxtzche.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_nMS2k0j-U9BdxuWCj8Oipw_yyKZuZ3e';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
