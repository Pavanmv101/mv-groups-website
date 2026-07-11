import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY // Needs to be service role key to query auth or bypass RLS easily, OR just query public.users

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing URL or Service Key')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function checkAdmin() {
  const { data, error } = await supabase.from('users').select('*').eq('email', 'mvgroups2026@gmail.com')
  if (error) {
    console.error('Error fetching users:', error)
  } else {
    console.log('User data from public.users:', data)
  }
}

checkAdmin()
