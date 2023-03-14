import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { LogMiddleware } from 'src/middleware/log.middleware'
import { CoreModule } from '../core/core.module'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { CommandHandlers, EventHandlers, QueryHandlers } from './handlers'

@Module({
  imports: [CqrsModule, CoreModule],
  controllers: [AppController],
  providers: [AppService, ...CommandHandlers, ...QueryHandlers, ...EventHandlers],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(LogMiddleware).forRoutes('*')
  }
}
