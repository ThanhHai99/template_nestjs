import { Injectable } from '@nestjs/common'
import { CachingService } from '../caching/caching.service'

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!'
  }

  public getTest(): number {
    const cachingService = CachingService.getInstance()
    return cachingService.total(1, 3)
  }
}
