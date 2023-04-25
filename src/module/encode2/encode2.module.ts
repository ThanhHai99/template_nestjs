import { Module } from '@nestjs/common'
import { Encode2Service } from './encode2.service'

@Module({
  providers: [Encode2Service],
  exports: [Encode2Service],
})
export class Encode2Module {}
