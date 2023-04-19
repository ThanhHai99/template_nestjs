import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common'
import { LogMiddleware } from 'src/middleware/log.middleware'
import { MqModule } from 'src/module/mq/mq.module'
import { CoreModule } from '../core/core.module'
import { AppController } from './app.controller'
import { AppService } from './app.service'

@Module({
  imports: [CoreModule, MqModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(LogMiddleware).forRoutes('*')
  }
}
