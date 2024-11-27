import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { S3Controller } from './s3.controller'

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [S3Controller],
  providers: [],
})
export class S3Module {}
