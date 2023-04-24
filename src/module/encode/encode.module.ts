import { Module } from '@nestjs/common'
import { EncodeService } from './encode.service'

@Module({
  providers: [EncodeService],
  exports: [EncodeService],
})
export class EncodeModule {}
