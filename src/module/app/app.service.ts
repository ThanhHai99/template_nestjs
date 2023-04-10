import { Injectable } from '@nestjs/common'
import { ConfigsService } from 'src/config/configs'

@Injectable()
export class AppService {
  constructor(private readonly config: ConfigsService) {}

  getHello(): string {
    return `${this.config.appHost}:${this.config.appPort}`
  }
}
