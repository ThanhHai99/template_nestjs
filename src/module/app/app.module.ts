import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { LogMiddleware } from 'src/middleware/log.middleware'
import { CoreModule } from '../core/core.module'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { S3Module } from '../s3/s3.module'

@Module({
  imports: [CoreModule, S3Module],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(LogMiddleware).forRoutes('*')
  }
}
