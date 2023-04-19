import { Module } from '@nestjs/common';
import { MqService } from './mq.service';

@Module({
  providers: [MqService]
})
export class MqModule {}
