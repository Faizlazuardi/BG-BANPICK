import { createClient } from '@supabase/supabase-js';

const supabaseMLBB = createClient(
  import.meta.env.VITE_SUPABASE_URL_MLBB,
  import.meta.env.VITE_SUPABASE_KEY_MLBB
);

const supabaseHOK = createClient(
  import.meta.env.VITE_SUPABASE_URL_HOK,
  import.meta.env.VITE_SUPABASE_KEY_HOK
);

export { supabaseMLBB, supabaseHOK };
