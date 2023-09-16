import Redis, { Redis as RedisClient } from 'ioredis';
import { REDIS_HOST, REDIS_PASS, REDIS_PORT } from '../../constants';
import './cache-service';
import createContainer from '../../decorators/container';

createContainer().bind<RedisClient>('RedisClient')
  .toDynamicValue(() => new Redis({
    port: +REDIS_PORT!,
    host: REDIS_HOST,
    password: REDIS_PASS,
    keyPrefix: 'cache',
  }));
