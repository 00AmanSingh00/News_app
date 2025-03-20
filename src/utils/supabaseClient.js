// src/utils/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URI;
const supabaseKey = import.meta.env.VITE_SERVICE_ROLE;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Supabase URL and Key are required. Please check your .env file.");
}

export const supabase = createClient(supabaseUrl, supabaseKey);
