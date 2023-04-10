import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class ConfigsService extends ConfigService {
  get appHost(): string {
    return this.get<string>('APP_HOST') || 'localhost'
  }

  get appPort(): number {
    return this.get<number>('APP_PORT') || 80
  }
}
