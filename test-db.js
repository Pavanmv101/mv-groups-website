import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
import path from 'path'

// Load .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase URL or Anon Key in .env.local')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function testConnection() {
  console.log(`Connecting to: ${supabaseUrl}`)
  try {
    // Attempt to fetch from 'inquiries' which we just told the user to create
    // Even if the table doesn't exist, we will get a PostgREST error, which confirms the DB is reachable.
    const { data, error } = await supabase.from('inquiries').select('*').limit(1)
    
    if (error) {
      if (error.code === '42P01') {
        console.log('✅ DATABASE CONNECTED SUCCESSFULLY!')
        console.log('⚠️ Note: The "inquiries" table does not exist yet. Please run the SQL command provided earlier.')
      } else {
        console.error('❌ Connection failed or another error occurred:', error.message)
      }
    } else {
      console.log('✅ DATABASE CONNECTED SUCCESSFULLY!')
      console.log('Table "inquiries" is present and accessible.')
    }
  } catch (err) {
    console.error('❌ Connection failed with an exception:', err)
  }
}

testConnection()
