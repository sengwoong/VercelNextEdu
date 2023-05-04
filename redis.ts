

import { Redis } from '@upstash/redis';

let redisClient: Redis | null = null;





  redisClient = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL!,
    token: process.env.UPSTASH_REDIS_REST_TOKEN!,
  });


export  const redis = redisClient;


