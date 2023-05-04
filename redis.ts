import Redis from 'ioredis';



const redis = new Redis(process.env.REDIS_URL!);
redis.set('foo', 'bar');
export default redis;