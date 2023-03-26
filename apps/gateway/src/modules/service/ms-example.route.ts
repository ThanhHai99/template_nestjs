import { Controller, Get, Inject, Logger } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { Config } from '@my-workspace/config'
import { firstValueFrom } from 'rxjs'

@Controller(Config.MessageIndex['ms-example'].ms_name)
export class MsExampleRoute {
  constructor(@Inject(Config.NatsProvider) private readonly client: ClientProxy) {}

  private readonly logger = new Logger(MsExampleRoute.name)

  @Get('test')
  async sendToMQ(): Promise<any> {
    try {
      return await firstValueFrom(
        this.client.send(Config.MessageIndex['ms-example'].test, {
          num: Math.random(),
        }),
      ).then((msRes) => {
        this.logger.log(`${MsExampleRoute.name}#send -> topic: "${Config.MessageIndex['ms-example'].test}" successfully`)
        return msRes
      })
    } catch (e0) {
      this.logger.error(`${MsExampleRoute.name}#send -> topic: "${Config.MessageIndex['ms-example'].test}" failure\n${e0}`)
    }
  }
}
