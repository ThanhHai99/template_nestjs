import { Module } from '@nestjs/common'
import { EsService } from './es.service'
import { ElasticsearchModule, ElasticsearchService } from '@nestjs/elasticsearch'
import { ConfigModule, ConfigService } from '@nestjs/config'

@Module({
  imports: [
    ElasticsearchModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        node: configService.get('ELASTICSEARCH_NODE'),
      }),
    }),
  ],
  providers: [EsService],
  exports: [EsService],
})
export class EsModule {}
