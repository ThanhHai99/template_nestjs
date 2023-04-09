import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import configuration from '../../config/configuration'
import { MulterModule } from '@nestjs/platform-express'
import { diskStorage } from 'multer'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['env/.env'],
      isGlobal: true,
      cache: true,
      load: [configuration],
    }),
    // MulterModule.registerAsync({
    //   imports: [ConfigModule],
    //   inject: [ConfigService],
    //   useFactory: async (configService: ConfigService) => ({
    //     // dest: './public',
    //     storage: diskStorage({
    //       destination: './public',
    //     }),
    //   }),
    // }),
  ],
  // dest: configService.get<string>('file.dest'),
  providers: [],
})
export class CoreModule {}
