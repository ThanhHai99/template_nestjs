import * as amqp from 'amqplib'
import { Logger } from '@nestjs/common'

export class RabbitmqService {
  private static logger = new Logger(RabbitmqService.name)
  private static rabbitMQHost = process.env.RABBITMQ_HOST || 'amqp://127.0.0.1:5672'
  private static connection: amqp.Connection
  public static lostConnection = false

  public static async getConnection(): Promise<amqp.Connection> {
    try {
      if (!this.connection) {
        this.connection = await amqp.connect(this.rabbitMQHost)
        this.logger.log('Connecting to RabbitMQ...')
      }
      const rabbitStatus = await this.ping(this.connection)
      if (!rabbitStatus) {
        await this.connection.close()
        this.connection = null
        return null
      }

      return this.connection
    } catch (e0) {
      return null
    }
  }

  public static async ping(connection: amqp.Connection): Promise<boolean> {
    try {
      const rabbitNotReadyStatus = ['error', 'close', 'blocked', 'unblocked']
      rabbitNotReadyStatus.forEach((s) => {
        connection.once(s, async () => {
          try {
            this.logger.error(`Connection to RabbitQM error (${s})!`)
            this.lostConnection = true
            this.connection = undefined
            return false
          } catch (e0) {
            this.lostConnection = true
            this.connection = undefined
          }
        })
      })

      this.logger.log('Connection to RabbitMQ is ready')
      this.lostConnection = false
      return true
    } catch (e0) {
      this.lostConnection = true
      this.connection = undefined
      return false
    }
  }

  public static async senderMQ(connection: amqp.Connection, queue: string, data: any): Promise<boolean> {
    try {
      const channel = await connection.createChannel()
      await channel.assertQueue(queue)
      channel.sendToQueue(queue, Buffer.from(JSON.stringify(data)), {
        // when rabbitMQ restart, auto reconnect
        persistent: true,
      })

      this.logger.log('Send message to RabbitMQ successfully')
      return true
    } catch (err) {
      this.logger.error(JSON.stringify(err))
      return false
    }
  }

  // public static async receiverMQ(connection: amqp.Connection, queue: string): Promise<amqp.ConsumeMessage> {
  //   try {
  //     const channel = await connection.createChannel();
  //     await channel.assertQueue(queue);
  //     await channel.consume(queue, async (message) => {
  //       // process order
  //       this.logger.log(message.content.toString(), RabbitMQUtil.name + '.receiverMQ: ');
  //       // channel.ack(message)
  //       // return message
  //     });

  //     return null;
  //   } catch (err) {
  //     this.logger.error(JSON.stringify(err), RabbitMQUtil.name);
  //     return null;
  //   }
  // }

  // public static async dropMessage(connection: amqp.Connection, queue: string, message: amqp.ConsumeMessage) {
  //   try {
  //     const channel = await connection.createChannel();
  //     await channel.assertQueue(queue);
  //     channel.ack(message);
  //   } catch (error) {
  //     this.logger.error(JSON.stringify(error), RabbitMQUtil.name);
  //   }
  // }
}
