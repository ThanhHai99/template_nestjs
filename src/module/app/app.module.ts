import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common'
import { LogMiddleware } from 'src/middleware/log.middleware'
import { CoreModule } from '../core/core.module'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { VideoModule } from 'src/video/video.module'

@Module({
  imports: [CoreModule, VideoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(LogMiddleware).forRoutes('*')
  }
}
