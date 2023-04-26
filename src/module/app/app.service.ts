import { Injectable } from '@nestjs/common'
import { EncodeService } from '../encode/encode.service'
import { Encode2Service } from '../encode2/encode2.service'
import { Decode2Dto, Encode2Dto } from '../encode2/encode2.dto'

@Injectable()
export class AppService {
  constructor(private readonly encodeService: EncodeService, private readonly encode2Service: Encode2Service) {}

  encodeResponse(): string {
    const finalResData = 'Hello World!'
    const finalRes = this.encodeService.encode(finalResData)
    return finalRes
  }

  encodeRequest(thisUrl: string): Object {
    let params: Encode2Dto = {
      app_key: 'AppKey',
      timestamp: Date.now().toString(),
      sign_method: 'sha256',
    }
    const signature = this.encode2Service.generateSignature('AppSecretKey', '/thisUrl', params)
    params.sign = signature

    return params
  }

  decodeResponse(data: string): string {
    const finalRes = this.encodeService.decode(data)
    return finalRes
  }

  decodeRequest(thisUrl: string, data: Decode2Dto): boolean {
    const thisSignature = data.sign
    delete data.sign
    const signature = this.encode2Service.generateSignature('AppSecretKey', '/thisUrl', data)
    return thisSignature === signature
  }
}
