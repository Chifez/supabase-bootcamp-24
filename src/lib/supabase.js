import { createClient } from '@supabase/supabase-js';
import {
  PUBLIC_SUPABASE_PROJECT_REF,
  PUBLIC_SUPABASE_ANON_KEY,
} from '$env/static/public';

const PROJECT_REF = PUBLIC_SUPABASE_PROJECT_REF;
const ANON_KEY = PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(
  `https://${PROJECT_REF}.supabase.co`,
  ANON_KEY
);
