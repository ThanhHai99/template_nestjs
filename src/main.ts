import { NestFactory } from '@nestjs/core'
import { AppModule } from './module/app/app.module'
import { Logger, INestApplication } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

async function bootstrap(): Promise<void> {
  const app: INestApplication = await NestFactory.create(AppModule)
  const logger = new Logger('MainServer')
  const configService = app.get(ConfigService)
  const port: number = configService.get<number>('app.port')

  await app.listen(port)
  logger.log(`🚀 Application is running on: ${await app.getUrl()} 😁😁`)
}
bootstrap()
