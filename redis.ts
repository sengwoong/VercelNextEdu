

import { Redis } from '@upstash/redis';

let redisClient: Redis | null = null;

if (process.env.Upstashtoken) {
  redisClient = new Redis({
    url: 'https://apn1-fancy-dog-33363.upstash.io',
    token: process.env.Upstashtoken,
  });
} else {
  console.error('REDIS_TOKEN environment variable is not set.');
}

export  const redis = redisClient;


