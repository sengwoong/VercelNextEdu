

import { Redis } from '@upstash/redis';

let redisClient: Redis | null = null;




if (process.env.UPSTASH_REDIS_REST_TOKEN && process.env.UPSTASH_REDIS_REST_URL  ) {
  redisClient = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
  });
} else {
  console.error('REDIS_TOKEN environment variable is not set.');
}

export  const redis = redisClient;


