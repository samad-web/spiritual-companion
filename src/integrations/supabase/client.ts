import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://igbpjruyldyhycbnbjck.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlnYnBqcnV5bGR5aHljYm5iamNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMxNjk2NDgsImV4cCI6MjA4ODc0NTY0OH0.uLwMOpZkxoDeOcQGkPzrx757xmCVvOQfs4S_eV6vdA4";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export type Profile = {
  id: string;
  updated_at: string | null;
  full_name: string | null;
  avatar_url: string | null;
};
