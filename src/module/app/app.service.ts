import { Injectable } from '@nestjs/common'
import { EncodeService } from '../encode/encode.service'
import { Encode2Service } from '../encode2/encode2.service'
import { Encode2Dto } from '../encode2/encode2.dto'

@Injectable()
export class AppService {
  constructor(private readonly encodeService: EncodeService, private readonly encode2Service: Encode2Service) {}

  getEncode(): string {
    const finalResData = 'Hello World!'
    const finalRes = this.encodeService.encode(finalResData)
    return finalRes
  }

  async getEncode2(): Promise<Object> {
    let params: Encode2Dto = {
      app_key: 'AppKey',
      timestamp: Date.now().toString(),
      sign_method: 'sha256',
    }
    const signature = this.encode2Service.generateSignature('AppSecretKey', 'apiEndPoint', params)
    params.sign = signature

    return params
  }

  getDecode(data: string): string {
    const finalRes = this.encodeService.decode(data)
    return finalRes
  }
}
