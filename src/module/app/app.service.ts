import { RedisService } from '@libs/redis'
import { Injectable } from '@nestjs/common'

@Injectable()
export class AppService {
  constructor(private readonly redisService: RedisService) {}

  getHello(): string {
    return 'Hello World!'
  }

  async testRedis(apiKey: string): Promise<any> {
    // apiKey is { header params, query params, ... }
    const cachingKey = this.redisService.bindKey('partner', [{ apiKey }])
    const cacheExisted = await this.redisService.isExists(cachingKey)
    const dataFinal = cacheExisted ? JSON.parse(await this.redisService.get(cachingKey)) : { data: { i: Math.random() } }
    if (!cacheExisted) this.redisService.set(cachingKey, JSON.stringify(dataFinal))

    return dataFinal
  }
}
