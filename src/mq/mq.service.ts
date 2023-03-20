import { RabbitmqService } from '@libs/rabbitmq'
import { Injectable, Logger } from '@nestjs/common'

@Injectable()
export class MqService {
  constructor() {
    this.consumeMQ()
  }

  private readonly logger = new Logger(MqService.name)

  async consumeMQ(): Promise<boolean> {
    try {
      const conn = await RabbitmqService.getConnection()
      const queueName = 'queue-0'
      const channel = await conn.createChannel()
      await channel.assertQueue(queueName)
      await channel.consume(queueName, async (message) => {
        try {
          this.logger.log(message.content.toString(), MqService.name + '.receiverMQ: ')
          const messageBody: any = JSON.parse(message.content.toString())
          console.log('processing message...')
          console.log(messageBody)
          console.log('processing message done')
          channel.ack(message) // IMPORTANT: remove message into rabbitmq
        } catch (mqError) {
          return mqError
          //   Push to another queue
        }
      })
    } catch (e0) {
      return e0
    }
  }
}
