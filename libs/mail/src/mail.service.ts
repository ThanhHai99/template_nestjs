import { Injectable, Logger } from '@nestjs/common'
import { MailPayload } from './mail.dto'
import { MailerService } from '@nestjs-modules/mailer'
import { template1 } from './mail.template'

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  private readonly logger = new Logger(MailService.name)

  async sendMail(payloads: Array<MailPayload>) {
    try {
      for (let i = 0; i < payloads.length; i++) {
        await this.mailerService
          .sendMail({
            from: `"Admin Test" <tranvietthanhhaiit2@gmail.com>`,
            to: payloads[i].mail,
            subject: `Hehe boi`,
            html: template1(payloads[i].name),
          })
          .then(() => {
            this.logger.log(`Send mail to ${payloads[i].mail} successfully`)
          })
          .catch((e1) => {
            this.logger.error(`Send mail to ${payloads[i].mail} failure err: ` + JSON.stringify(e1))
          })
      }
    } catch (e0) {
      this.logger.error('sendMail: ' + JSON.stringify(e0))
    }
  }
}
