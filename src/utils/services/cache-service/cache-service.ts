import { KeyType } from 'crypto';
import { Redis as RedisClient } from 'ioredis';
import { inject } from 'inversify';
import { ICacheService, IError } from './types';
import { ILoggerService } from '../logger-service/types';
import Injectable from '../../decorators/injectable';

@Injectable('ICacheService')
export default class CacheService implements ICacheService {
  constructor(
    @inject('RedisClient') private readonly client: RedisClient,
    @inject('ILoggerService') private readonly logger: ILoggerService,
  ) { }

  async get<T>(key: string) {
    try {
      let value: unknown = await this.client.get(key);

      try {
        value = value ? JSON.parse(value as string) as T : null;
      } catch (_) {
        return value as T;
      }
    } catch (error) {
      this.logger.warn((error as IError).message ?? error, error);
    }
    return null;
  }

  async set<T>(key: string, value: T, expirationSeconds = 60 * 60) {
    try {
      await this.client.set(key, JSON.stringify(value), 'EX', expirationSeconds);
    } catch (error) {
      this.logger.warn((error as IError).message ?? error, error);
    }
  }

  async del(args: KeyType[]) {
    try {
      return await this.client.del(args);
    } catch (error) {
      this.logger.warn((error as IError).message ?? error, error);
    }
    return null;
  }

  async delPrefix(prefix: string) {
    try {
      let keys = await this.client.keys(`cache:${prefix}`);
      keys = keys.map((key) => key.replace('cahce:', ''));

      return await this.del(keys as unknown as KeyType[]);
    } catch (error) {
      this.logger.warn((error as IError).message ?? error, error);
    }
    return null;
  }
}
