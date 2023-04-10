import { NestFactory } from '@nestjs/core'
import { AppModule } from './module/app/app.module'
import { Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { ConfigsService } from './config/configs'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const logger = new Logger('MainServer')
  const configService = app.get(ConfigService)
  const port = configService.get<number>('app.port')

  await app.listen(port)
  const config = new ConfigsService()
  logger.warn(`${config.appHost}:${config.appPort}`)
  logger.log(`🚀 Application is running on: http://localhost:${port}/ 😁😁`)
}
bootstrap()
