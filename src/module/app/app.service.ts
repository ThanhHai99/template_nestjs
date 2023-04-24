import { Injectable } from '@nestjs/common'
import { EncodeService } from '../encode/encode.service'

@Injectable()
export class AppService {
  constructor(private readonly encodeService: EncodeService) {}

  getEncode(): string {
    const finalResData = 'Hello World!'
    const finalRes = this.encodeService.encode(finalResData)
    return finalRes
  }

  getDecode(data: string): string {
    const finalRes = this.encodeService.decode(data)
    return finalRes
  }
}
