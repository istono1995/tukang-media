import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://socadmeivahabpgavanz.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNvY2FkbWVpdmFoYWJwZ2F2YW56Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk1MTY2MjQsImV4cCI6MjA5NTA5MjYyNH0.dAEnQ7-bf6TLhQs67UubdV2dfi-TdwZE_OyV8VsFS7A'

export const supabase = createClient(supabaseUrl, supabaseKey)