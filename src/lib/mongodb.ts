import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);

export function connectToDatabase() {
  if (!supabase) {
    throw new Error('Erro ao conectar ao Supabase. Verifique as variáveis de ambiente.');
  }
  return supabase;
}
