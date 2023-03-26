import { Controller } from '@nestjs/common'
import { MessagePattern, Payload } from '@nestjs/microservices'

import { AppService } from './app.service'
import { Config } from '@my-workspace/config'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern(Config.MessageIndex['ms-example'].test)
  public async test(@Payload() data: any): Promise<any> {
    return await this.appService.test(data)
  }
}
