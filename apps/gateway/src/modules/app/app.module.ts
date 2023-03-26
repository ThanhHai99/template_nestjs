import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { CoreModule } from '../core/core.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MsExampleRoute } from '../service/ms-example.route';
import { Config } from '@my-workspace/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { LogMiddleware } from '../../middleware/log.middleware';

@Module({
  imports: [CoreModule],
  controllers: [
    // Gateway
    AppController,

    // Node Service
    MsExampleRoute,
  ],
  providers: [
    AppService,
    {
      provide: Config.NatsProvider,
      useFactory: () => {
        return ClientProxyFactory.create({
          transport: Transport.NATS,
          options: {
            servers: [Config.NatsHost],
          },
        });
      },
      inject: [],
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(LogMiddleware).forRoutes('*');
  }
}
