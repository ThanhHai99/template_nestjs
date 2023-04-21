import { Injectable, Logger } from '@nestjs/common'
import { InjectRedis, Redis } from '@nestjs-modules/ioredis'
import { ConfigService } from '@nestjs/config'
import {
  REDIS_EXPIRE_TIME_DEFAULT,
  REDIS_FAIL_STATUS,
  REDIS_PING_SUCCESS_MESSAGE,
  REDIS_PREFIX_MAIN,
  REDIS_SEPARATOR,
  REDIS_STATUS_READY,
  REDIS_SUCCESS_STATUS,
} from 'src/caching/caching.const'
import { CachingEnum } from 'src/caching/caching.enum'
import { RedisStatusEnum } from './redis.enum'

@Injectable()
export class RedisService {
  constructor(
    private configService: ConfigService,

    @InjectRedis()
    private readonly redis: Redis,
  ) {}

  private readonly logger = new Logger(RedisService.name)

  private lostConnections: boolean // used to lost connection

  public bindKey(prefix: string, data: Array<object>): string {
    const cachingPower = this.configService.get('redis.power')
    if (cachingPower == CachingEnum.OFF) return null

    let key = REDIS_PREFIX_MAIN + REDIS_SEPARATOR + prefix
    for (let i = 0; i < data.length; i++) {
      for (let item in data[i]) {
        if (!data[i][item]) continue
        key += REDIS_SEPARATOR + item + REDIS_SEPARATOR + data[i][item]
      }
    }
    return key
  }

  public async connected(): Promise<boolean> {
    try {
      if (this.redis.status == RedisStatusEnum.end || this.redis.status == RedisStatusEnum.reconnecting || this.lostConnections) {
        await this.redis.connect().catch(async () => {
          this.redis.disconnect(true)
          this.lostConnections = true
          return false
        })
      }

      const pingMessage = await this.redis.ping().catch(async () => {
        this.redis.disconnect(true)
        this.lostConnections = true
        return false
      })
      if (pingMessage === REDIS_PING_SUCCESS_MESSAGE) {
        if (this.lostConnections) {
          await this.clear()
        }
        this.lostConnections = false
        return true
      }
      return false
    } catch (error) {
      this.redis.disconnect(true)
      this.lostConnections = true
      return false
    }
  }

  async set(key: string, value: any, expireTime: number = REDIS_EXPIRE_TIME_DEFAULT) {
    try {
      const cachingPower = this.configService.get('redis.power')
      if (cachingPower == CachingEnum.OFF) return null

      let result = null
      if (expireTime) result = (await this.redis.set(key, value, 'EX', expireTime)) ? REDIS_SUCCESS_STATUS : REDIS_FAIL_STATUS
      else result = (await this.redis.set(key, value, 'EX', REDIS_EXPIRE_TIME_DEFAULT)) ? REDIS_SUCCESS_STATUS : REDIS_FAIL_STATUS
      this.logger.log(REDIS_PREFIX_MAIN + ':cache:set\t' + key + ' ==> ' + result)
      return result
      // return this.redis.mset(data)
    } catch (error) {
      this.logger.error(REDIS_PREFIX_MAIN + ':cache:set\t' + key + ' ==> ' + REDIS_FAIL_STATUS)
      return REDIS_FAIL_STATUS
    }
  }

  async get(...key: Array<string>) {
    try {
      const cachingPower = this.configService.get('redis.power')
      if (cachingPower == CachingEnum.OFF) return null

      const result = await (<any>this.redis.mget(key))
      if (result) this.logger.log(REDIS_PREFIX_MAIN + ':cache:get\t' + key + ' ==> ' + REDIS_SUCCESS_STATUS)
      else this.logger.error(REDIS_PREFIX_MAIN + ':cache:get\t' + key + ' ==> ' + REDIS_FAIL_STATUS)
      return result
    } catch (error) {
      this.logger.error(REDIS_PREFIX_MAIN + ':cache:get\t' + key + ' ==> ' + REDIS_FAIL_STATUS)
      return REDIS_FAIL_STATUS
    }
  }

  async delete(...key: Array<string>) {
    try {
      const cachingPower = this.configService.get('redis.power')
      if (cachingPower == CachingEnum.OFF) return null

      const result = (await this.redis.del(key)) ? REDIS_SUCCESS_STATUS : REDIS_FAIL_STATUS
      if (result === REDIS_SUCCESS_STATUS) this.logger.log(REDIS_PREFIX_MAIN + ':cache:delete\t' + key + ' ==> ' + REDIS_SUCCESS_STATUS)
      else this.logger.error(REDIS_PREFIX_MAIN + ':cache:delete\t' + key + ' ==> ' + REDIS_FAIL_STATUS)
      return result
    } catch (error) {
      this.logger.error(REDIS_PREFIX_MAIN + ':cache:delete\t' + key + ' ==> ' + REDIS_FAIL_STATUS)
      return REDIS_FAIL_STATUS
    }
  }

  async isExists(key: string) {
    try {
      const cachingPower = this.configService.get('redis.power')
      if (cachingPower == CachingEnum.OFF || !this.connected()) return null

      const exists = await this.redis.exists(key)
      return exists
    } catch (error) {
      if (this.redis.status != REDIS_STATUS_READY) {
        this.lostConnections = true
      }
    }
  }

  async clear() {
    try {
      const cachingPower = this.configService.get('redis.power')
      if (cachingPower == CachingEnum.OFF) return null

      const t = await this.removeByPrefix('')
      if (t == REDIS_SUCCESS_STATUS) this.logger.log(REDIS_PREFIX_MAIN + ':cache:clearAll ==> ' + REDIS_SUCCESS_STATUS)
      else this.logger.error(REDIS_PREFIX_MAIN + ':cache:clearAll ==> ' + REDIS_FAIL_STATUS)
    } catch (error) {
      this.logger.error(REDIS_PREFIX_MAIN + ':cache:clearAll ==> ' + REDIS_FAIL_STATUS)
    }
  }

  async removeByPrefix(pattern: string) {
    try {
      const cachingPower = this.configService.get('redis.power')
      if (cachingPower == CachingEnum.OFF) return null

      await this.redis.keys(REDIS_PREFIX_MAIN + REDIS_SEPARATOR + pattern + '*').then(async (keys) => {
        const pipeline = this.redis.pipeline()
        keys.forEach((key) => {
          pipeline.del(key)
        })
        return await pipeline.exec()
      })
      return REDIS_SUCCESS_STATUS
    } catch (error) {
      console.log(error)
      return REDIS_FAIL_STATUS
    }
  }
}
