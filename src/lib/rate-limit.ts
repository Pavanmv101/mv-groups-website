import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

export const redis = process.env.UPSTASH_REDIS_REST_URL 
  ? new Redis({ url: process.env.UPSTASH_REDIS_REST_URL, token: process.env.UPSTASH_REDIS_REST_TOKEN || '' })
  : null

// Create a new ratelimiter, that allows 5 requests per 1 hour (generic)
export const rateLimit = redis ? new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, '1 h'),
  analytics: true,
  prefix: '@upstash/ratelimit',
}) : null

// Create a strict ratelimiter for login: 10 requests per minute
export const loginRateLimit = redis ? new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(10, '1 m'),
  analytics: true,
  prefix: '@upstash/ratelimit/login',
}) : null

// Define a helper to handle graceful failure if Redis env vars are missing
export async function checkRateLimit(identifier: string) {
  if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN || !rateLimit) {
    console.warn('Rate limiting is bypassed because UPSTASH_REDIS_REST_URL or UPSTASH_REDIS_REST_TOKEN is not set.')
    return { success: true }
  }

  return await rateLimit.limit(identifier)
}
