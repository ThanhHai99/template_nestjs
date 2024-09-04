import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import configuration from '../../config/configuration'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['env/.env'],
      isGlobal: true,
      cache: true,
      load: [configuration],
    }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      logging: false,
      autoLoadEntities: true,
      database: `database/user.db`,
      synchronize: true,
    }),
  ],
  providers: [],
})
export class CoreModule {}
