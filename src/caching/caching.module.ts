import { Module } from '@nestjs/common'
import { CachingService } from './caching.service'

@Module({
  providers: [CachingService],
})
export class CachingModule {}
