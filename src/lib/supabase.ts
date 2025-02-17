
import { createClient } from '@supabase/supabase-js';
import { Database } from './database.types';

const supabaseUrl = "https://pujggdmnvscokspubzoe.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB1amdnZG1udnNjb2tzcHViem9lIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk3NzU4NjAsImV4cCI6MjA1NTM1MTg2MH0.xc5A7CA_Y4JzbxVrsx6NivsaGIDeOVhTquekR4rbxlo";

export const supabase = createClient<Database>(supabaseUrl, supabaseKey);
