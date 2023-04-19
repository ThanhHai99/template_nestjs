import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import configuration from '../../config/configuration'
import { ElasticsearchModule } from '@nestjs/elasticsearch'

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
