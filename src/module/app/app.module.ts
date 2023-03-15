import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common'
import { LogMiddleware } from 'src/middleware/log.middleware'
import { UserModule } from 'src/user/user.module'
import { CoreModule } from '../core/core.module'
import { AppController } from './app.controller'
import { AppService } from './app.service'

@Module({
  imports: [CoreModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(LogMiddleware).forRoutes('*')
  }
}
