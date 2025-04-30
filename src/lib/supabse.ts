import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseServiceKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  '';

// 서버 측에서는 서비스 롤 키를 사용하고, 클라이언트 측에서는 익명 키 사용
export const supabase = createClient(supabaseUrl, supabaseServiceKey);
