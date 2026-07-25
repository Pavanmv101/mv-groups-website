import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

function initRedis() {
  try {
    if (!process.env.UPSTASH_REDIS_REST_URL) return null;
    return new Redis({ 
      url: process.env.UPSTASH_REDIS_REST_URL.trim(), 
      token: (process.env.UPSTASH_REDIS_REST_TOKEN || '').trim() 
    })
  } catch (err) {
    console.error('Failed to initialize Redis:', err)
    return null
  }
}
export const redis = initRedis()

function initRateLimit(limit: number, windowStr: '1 s' | '1 m' | '1 h' | '1 d', prefix: string) {
  try {
    if (!redis) return null;
    return new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(limit, windowStr),
      analytics: true,
      prefix,
    })
  } catch (err) {
    console.error('Failed to initialize Ratelimit:', err)
    return null
  }
}

// Create a new ratelimiter, that allows 5 requests per 1 hour (generic)
export const rateLimit = initRateLimit(5, '1 h', '@upstash/ratelimit')

// Create a strict ratelimiter for login: 10 requests per minute
export const loginRateLimit = initRateLimit(10, '1 m', '@upstash/ratelimit/login')

// Define a helper to handle graceful failure if Redis env vars are missing
export async function checkRateLimit(identifier: string) {
  if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN || !rateLimit) {
    console.warn('Rate limiting is bypassed because UPSTASH_REDIS_REST_URL or UPSTASH_REDIS_REST_TOKEN is not set.')
    return { success: true }
  }

  return await rateLimit.limit(identifier)
}
