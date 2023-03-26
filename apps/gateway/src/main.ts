/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { MicroserviceOptions, Transport } from '@nestjs/microservices'
import { AppModule } from './modules/app/app.module'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { Config } from '@my-workspace/config'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.NATS,
    options: {
      servers: Config.NatsHost,
    },
  })
  const logger = new Logger('GatewayServer')
  const port = Config.AppPort

  const swaggerConfig = new DocumentBuilder().setTitle('App example').setDescription('The app API description').setVersion('1.0').addTag('app').build()
  const document = SwaggerModule.createDocument(app, swaggerConfig)
  SwaggerModule.setup('docs', app, document)

  await app.listen(port)
  logger.log(`🚀 Application is running on: http://localhost:${port}/`)
}

bootstrap()
