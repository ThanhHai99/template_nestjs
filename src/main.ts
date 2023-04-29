import { NestFactory } from '@nestjs/core'
import { AppModule } from './module/app/app.module'
import { Logger, ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const logger = new Logger('MainServer')
  const configService = app.get(ConfigService)
  app.useGlobalPipes(new ValidationPipe())
  const port = configService.get<number>('app.port')

  await app.listen(port)
  logger.log(`🚀 Application is running on: http://localhost:${port}/ 😁😁`)
}
bootstrap()
