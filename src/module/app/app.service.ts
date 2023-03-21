import { MailService } from '@libs/mail'
import { MailPayload } from '@libs/mail/mail.dto'
import { Injectable } from '@nestjs/common'

@Injectable()
export class AppService {
  constructor(private readonly mailService: MailService) {}

  getHello(): string {
    return 'Hello World!'
  }

  async sendMail() {
    const payloads: Array<MailPayload> = [
      {
        mail: 'hai.vt.tran@pkh.vn',
        name: 'Tran Viet Thanh Hai',
      },
    ]
    return await this.mailService.sendMail(payloads)
  }
}
