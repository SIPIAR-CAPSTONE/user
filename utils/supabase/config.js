import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://rdoshowgrmvpotygauvz.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJkb3Nob3dncm12cG90eWdhdXZ6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTk0OTIxMTUsImV4cCI6MjAzNTA2ODExNX0.AuY-MKR2z7TUZtFvFGWzF1b7qpOokxUcJuioAwNzEHs";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
