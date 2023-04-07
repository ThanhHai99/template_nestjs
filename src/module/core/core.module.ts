import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import configuration from '../../config/configuration'
import { MongooseModule } from '@nestjs/mongoose'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['env/.env'],
      isGlobal: true,
      cache: true,
      load: [configuration],
    }),
    MongooseModule.forRoot('mongodb://localhost:27017/nest'),
  ],
  providers: [],
})
export class CoreModule {}
