


import https from "https";
import { Redis } from '@upstash/redis';

export  const   redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token:  process.env.UPSTASH_REDIS_REST_TOKEN!,
  agent: new https.Agent({ keepAlive: true })
});

(async () => {
  const data = await redis.set('foo', 'bar');
})();

// import https from "https";
// import { Redis } from '@upstash/redis';

// export const redis = new Redis({

//   token: process.env.UPSTASH_REDIS_REST_TOKEN!,
//   agent: new https.Agent({ keepAlive: true })
// });

// (async () => {
//   const data = await redis.set('foo', 'bar');
// })();


// url: process.env.UPSTASH_REDIS_REST_URL!,
// token: process.env.UPSTASH_REDIS_REST_TOKEN!,


