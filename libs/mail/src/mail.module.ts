import { Module } from '@nestjs/common'
import { MailService } from './mail.service'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { MailerModule } from '@nestjs-modules/mailer'
import configuration from '../../../src/config/configuration'

@Module({
  imports: [
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        transport: {
          service: 'gmail',
          host: 'smtp.gmail.com',
          port: 587,
          secure: false,
          auth: {
            user: configuration().mail.user,
            pass: configuration().mail.pass,
          },
        },
        defaults: {
          from: configuration().mail.user,
        },
        template: {
          // dir: path.join(__dirname, '../../../src/modules/mail/template'),
          // adapter: new HandlebarsAdapter(), // or new PugAdapter() or new EjsAdapter()
          options: {
            strict: true,
          },
        },
      }),
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
