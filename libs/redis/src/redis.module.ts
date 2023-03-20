import { Module } from '@nestjs/common'
import { RedisService } from './redis.service'
import { RedisModule as IoRedisModule } from '@nestjs-modules/ioredis'
import { REDIS_PREFIX_MAIN } from 'src/caching/caching.const'
import configuration from '../../../src/config/configuration'

@Module({
  imports: [
    IoRedisModule.forRootAsync({
      imports: [],
      inject: [],
      useFactory: async () => ({
        config: {
          url: configuration().redis.host,
          password: configuration().redis.pass,
          lazyConnect: true,
          maxRetriesPerRequest: 0,
          enableOfflineQueue: true,
          retryStrategy(times: number): number | void | null {
            return null
          },
          enableAutoPipelining: true,
          connectTimeout: 100,
          disconnectTimeout: 100,
          // keyPrefix: REDIS_PREFIX_MAIN, // cannot using because can mistake
        },
      }),
    }),
  ],
  providers: [RedisService],
  exports: [RedisService],
})
export class RedisModule {}
