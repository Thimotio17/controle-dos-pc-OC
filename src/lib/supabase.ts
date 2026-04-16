
import { createClient } from '@supabase/supabase-js';

// Use a URL da imagem e a sua chave "anon" (aquela sb_publishable...)
const supabaseUrl = 'https://tddhwqonirdlhfivbpvf.supabase.co';
const supabaseAnonKey = 'sb_publishable_nwGtvNE0MxoBcileSyJAPg_ApjUfM6s';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);