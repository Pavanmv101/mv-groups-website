import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

// Create a new ratelimiter, that allows 5 requests per 1 hour
export const rateLimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(5, '1 h'),
  analytics: true,
  prefix: '@upstash/ratelimit',
})

// Define a helper to handle graceful failure if Redis env vars are missing
export async function checkRateLimit(identifier: string) {
  if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
    console.warn('Rate limiting is bypassed because UPSTASH_REDIS_REST_URL or UPSTASH_REDIS_REST_TOKEN is not set.')
    return { success: true }
  }

  return await rateLimit.limit(identifier)
}
