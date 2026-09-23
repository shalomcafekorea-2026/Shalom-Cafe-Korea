import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/* ============================================================
   SUPABASE CLIENT
   Reads credentials from environment variables so nothing
   sensitive is hard-coded into the app.

   Local dev:  create a `.env` file (see `.env.example`) with
     VITE_SUPABASE_URL=...
     VITE_SUPABASE_ANON_KEY=...

   Vercel:     add the same two variables under
     Project Settings -> Environment Variables

   If the variables are missing, `supabase` is null and any
   feature that depends on it (currently the contact form)
   degrades gracefully instead of crashing the app.
   ============================================================ */

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(supabaseUrl as string, supabaseAnonKey as string)
  : null;
