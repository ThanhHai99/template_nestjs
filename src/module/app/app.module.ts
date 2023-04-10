import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common'
import { LogMiddleware } from 'src/middleware/log.middleware'
import { CoreModule } from '../core/core.module'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigsService } from 'src/config/configs'

@Module({
  imports: [CoreModule],
  controllers: [AppController],
  providers: [AppService, ConfigsService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(LogMiddleware).forRoutes('*')
  }
}
