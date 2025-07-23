import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  // site, anon key
  'https://cznflfshoiohzkklmeoo.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN6bmZsZnNob2lvaHpra2xtZW9vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0NzA4MzEzNCwiZXhwIjoyMDYyNjU5MTM0fQ.IQd1wpBX5getvsu0TRh2vqAw8AoyUAKb7Ac-acF-rMU'
)

export default supabase;