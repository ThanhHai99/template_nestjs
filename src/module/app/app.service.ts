import { RabbitmqService } from '@libs/rabbitmq'
import { Injectable, Logger } from '@nestjs/common'

@Injectable()
export class AppService {
  constructor() {}

  private readonly logger = new Logger(AppService.name)

  public getHello(): string {
    return 'Hello World!'
  }

  async sendMQ(): Promise<boolean> {
    try {
      const conn = await RabbitmqService.getConnection()
      const queueName = 'queue-0'
      const channel = await conn.createChannel()
      await channel.assertQueue(queueName)
      await channel.consume(queueName, async (message) => {
        try {
          this.logger.log(message.content.toString())
          const messageBody: any = JSON.parse(message.content.toString())
          console.log('processing message...')
          console.log(messageBody)
          console.log('processing message done')
          channel.ack(message) // IMPORTANT: remove message into rabbitmq
        } catch (e0) {
          return e0
          //   Push to another queue
        }
      })
    } catch (e) {
      return e
    }
  }
}
