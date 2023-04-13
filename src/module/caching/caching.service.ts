import { Injectable, Logger } from '@nestjs/common'

@Injectable()
export class CachingService {
  private static instance: CachingService

  public static getInstance() {
    if (!this.instance) {
      this.instance = new CachingService()
      Logger.log('Init instance successfully')
    }

    return this.instance
  }

  public total(a: number, b: number) {
    return a + b
  }
}
