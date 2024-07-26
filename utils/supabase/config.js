import { createClient } from "@supabase/supabase-js";
import { LargeSecureStore } from "../SecureLocalStorage";
import "react-native-url-polyfill/auto";
import { SUPABASE_API_KEY } from "@env";

// TODO: SOON
//! as of now, the repo is private, consider using environment variables for future deployment
const supabaseUrl = "https://rdoshowgrmvpotygauvz.supabase.co";
const supabaseAnonKey = SUPABASE_API_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: new LargeSecureStore(),
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

export { supabase };
