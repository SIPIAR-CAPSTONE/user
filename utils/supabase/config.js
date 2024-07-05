import { createClient } from '@supabase/supabase-js';
import { LargeSecureStore } from "../SecureLocalStorage";
import 'react-native-url-polyfill/auto'

// TODO: SOON
//! as of now, the repo is private, consider using environment variables for future deployment
const supabaseUrl = "https://rdoshowgrmvpotygauvz.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJkb3Nob3dncm12cG90eWdhdXZ6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTk0OTIxMTUsImV4cCI6MjAzNTA2ODExNX0.AuY-MKR2z7TUZtFvFGWzF1b7qpOokxUcJuioAwNzEHs";

const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: new LargeSecureStore(),
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

export { supabase }
