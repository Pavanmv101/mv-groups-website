'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { z } from 'zod'
import { redis, loginRateLimit } from '@/lib/rate-limit'
import { headers } from 'next/headers'

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
  turnstileToken: z.string().optional(),
})

const signupSchema = z.object({
  email: z.string().email(),
  password: z.string()
    .min(8)
    .regex(/[A-Z]/, "Requires uppercase")
    .regex(/[a-z]/, "Requires lowercase")
    .regex(/[0-9]/, "Requires number"),
  full_name: z.string().min(1),
})

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

async function verifyTurnstile(token: string) {
  const secret = process.env.TURNSTILE_SECRET_KEY || '1x0000000000000000000000000000000AA' // Use testing key if not set
  const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: `secret=${encodeURIComponent(secret)}&response=${encodeURIComponent(token)}`,
  })
  const data = await res.json()
  return data.success
}

export async function login(formData: FormData) {
  try {
    const ip = (await headers()).get('x-forwarded-for') ?? '127.0.0.1'
    
    // 1. IP-based rate limiting (10 req/min)
    if (process.env.UPSTASH_REDIS_REST_URL && loginRateLimit) {
      const { success } = await loginRateLimit.limit(`login:${ip}`)
      if (!success) {
        return { error: 'Too many requests. Please try again later.' }
      }
    }

    // 2. Validate Input
    const parsed = loginSchema.safeParse({
      email: formData.get('email'),
      password: formData.get('password'),
      turnstileToken: formData.get('turnstileToken'),
    })

  if (!parsed.success) {
    return { error: 'Incorrect email or password.' }
  }

  const { email, password, turnstileToken } = parsed.data
  const lockKey = `lockout:${email}`
  const attemptsKey = `attempts:${email}`

  // 3. Check Account Lockout
  if (process.env.UPSTASH_REDIS_REST_URL && redis) {
    const isLocked = await redis.get(lockKey)
    if (isLocked) {
      return { error: 'Account temporarily locked. Please try again in 15 minutes.' }
    }
  }

  // 4. Fetch Failed Attempts
  let failedAttempts = 0
  if (process.env.UPSTASH_REDIS_REST_URL && redis) {
    failedAttempts = (await redis.get<number>(attemptsKey)) || 0
  }

  // 5. Require CAPTCHA if failed >= 3
  if (failedAttempts >= 3) {
    if (!turnstileToken) {
      return { error: 'CAPTCHA required', requireCaptcha: true }
    }
    const isHuman = await verifyTurnstile(turnstileToken)
    if (!isHuman) {
      return { error: 'Invalid CAPTCHA', requireCaptcha: true }
    }
  }

  const supabase = await createClient()

  // 6. Attempt Login
  const { data: authData, error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) {
    // 7. Handle Failure
    if (process.env.UPSTASH_REDIS_REST_URL && redis) {
      const newAttempts = await redis.incr(attemptsKey)
      // Progressive delay: 500ms * failures
      await sleep(Math.min(newAttempts * 500, 2000))

      if (newAttempts >= 5) {
        // Lock for 15 minutes (900 seconds)
        await redis.setex(lockKey, 900, 'locked')
        await redis.del(attemptsKey) // Reset attempts since it's locked
        return { error: 'Too many failed attempts. Account locked for 15 minutes.' }
      }
      
      if (newAttempts >= 3) {
        return { error: 'Incorrect email or password.', requireCaptcha: true }
      }
    }
    
    // Always return generic error message
    return { error: 'Incorrect email or password.' }
  }

  // 8. Handle Success
  if (process.env.UPSTASH_REDIS_REST_URL && redis) {
    await redis.del(attemptsKey)
  }

    const { data: userData } = await supabase
      .from('users')
      .select('role')
      .eq('id', authData.user.id)
      .single()

    revalidatePath('/', 'layout')
    return { success: true, role: userData?.role || 'client' }
  } catch (err: any) {
    console.error('Server Action Login Error:', err)
    return { error: 'Server Error: ' + (err.message || err.toString()) }
  }
}

export async function signup(formData: FormData) {
  const parsed = signupSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
    full_name: formData.get('full_name'),
  })

  if (!parsed.success) {
    return { error: 'Invalid input data.' }
  }

  const { email, password, full_name } = parsed.data
  
  // Strip HTML from free-text field using basic string replacement to avoid sanitize-html chunk errors
  const sanitizedFullName = full_name.replace(/</g, '&lt;').replace(/>/g, '&gt;')

  const supabase = await createClient()
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: sanitizedFullName,
      }
    }
  })

  if (error) {
    // Return generic error for email already in use, etc. to avoid enumeration, or pass generic failure
    return { error: 'Signup failed. Please try again.' }
  }

  return { success: true, email }
}

export async function verifyOtp(email: string, token: string) {
  const supabase = await createClient()

  const { error } = await supabase.auth.verifyOtp({
    email,
    token,
    type: 'signup',
  })

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/', 'layout')
  return { success: true }
}

export async function resendOtp(email: string) {
  const supabase = await createClient()

  const { error } = await supabase.auth.resend({
    type: 'signup',
    email,
  })

  if (error) {
    return { error: error.message }
  }

  return { success: true }
}

export async function logout() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/login')
}
