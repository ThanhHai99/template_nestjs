import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from 'configs/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['env/.env'],
      isGlobal: true,
      cache: true,
      load: [configuration],
    }),
  ],
  providers: [],
})
export class CoreModule {}
