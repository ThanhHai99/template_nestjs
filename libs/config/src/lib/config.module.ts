import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import configuration from 'configs/configuration'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['env/.env'],
      isGlobal: true,
      cache: true,
      load: [configuration],
    }),
  ],
  providers: [],
  exports: [],
})
export class Config {
  constructor(private readonly configService: ConfigService) {}

  public static get AppPort() {
    return configuration().app.port
  }

  public static get NatsHost() {
    return configuration().nats.host
  }

  public static get NatsProvider() {
    return configuration().nats.provider
  }

  public static get MessageIndex() {
    return configuration().message
  }
}
