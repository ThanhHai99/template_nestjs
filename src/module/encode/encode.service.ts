import { Injectable } from '@nestjs/common'

@Injectable()
export class EncodeService {
  public genSalt(length: number) {
    let result = ''
    const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const charactersLength = characters.length
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength))
    }
    return result
  }

  public encode(data: string): string {
    /**
     * IDEA
     * Encode times 1
     * Random salt
     * Encode times 2
     */

    const dataBuff1 = Buffer.from(data).toString('base64')
    const saltStart = this.genSalt(5)
    const saltEnd = this.genSalt(7)
    const dataBuff2 = Buffer.from(saltStart + dataBuff1 + saltEnd).toString('base64')
    return dataBuff2
  }

  public decode(data: string): string {
    /**
     * IDEA
     * Encode times 1
     * Random salt
     * Encode times 2
     */

    let dataBuff = Buffer.from(data, 'base64').toString('ascii')
    dataBuff = dataBuff.slice(5, -7)
    dataBuff = Buffer.from(dataBuff, 'base64').toString('ascii')
    return dataBuff
  }
}
