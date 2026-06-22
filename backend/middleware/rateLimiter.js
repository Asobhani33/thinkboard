import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'
import dotenv from 'dotenv'

dotenv.config()

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(100, '60 s'),
})

export async function rateLimiter(req, res, next) {
  try {
    const { success } = await ratelimit.limit('my_rate_limit')
    if (!success) {
      return res.status(429).json({ message: 'Too many requests, please try again later' })
    }
    next()
  } catch (error) {
    console.error('Rate limit error:', error)
    next()
  }
}