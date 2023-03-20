import { Controller, Get } from '@nestjs/common'
import { AppService } from './app.service'
import { RabbitmqService } from '@libs/rabbitmq'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello()
  }

  @Get('/send_mq')
  async sendMQ(): Promise<boolean> {
    const rabbitConn = await RabbitmqService.getConnection()
    const queueName = 'queue-0'
    return await RabbitmqService.senderMQ(rabbitConn, queueName, {
      i: Math.random(),
    })
  }
}
