/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { AppModule } from './modules/app/app.module';
import { Config } from '@my-workspace/config';

async function bootstrap() {
  const logger = new Logger('MsExampleServer');
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.NATS,
    options: {
      servers: Config.NatsHost,
    },
  });

  await app.listen();
  logger.log(`🚀 Application is running...`);
}

bootstrap();
