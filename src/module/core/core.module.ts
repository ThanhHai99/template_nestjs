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
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        //here, use of process.env.DATABASE_TYPE is impossible with nestjs and also deprecated, the type of db must be known beforehand
        type: 'mysql',
        host: configService.get<string>('database.host'),
        port: configService.get<number>('database.port'),
        username: configService.get<string>('database.user'),
        password: configService.get<string>('database.pass'),
        database: configService.get<string>('database.name'),
        //WARNING: Setting synchronize: true shouldn't be used in production - otherwise you can lose production data.
        synchronize: true,
        autoLoadEntities: true,
        charset: 'utf8mb4',
        collation: 'utf8mb4_unicode_ci',
        logging: false,
        extra: {
          connectionLimit: 2,
          queueLimit: 0,
          waitForConnections: true,
          // Add performance optimizations for bulk insert
          multipleStatements: true,
          maxBatchSize: 100000,
        },
        poolSize: 20,
        // Add query timeout to prevent long-running queries
        connectTimeout: 60000, // Giữ tùy chọn này thay vì acquireTimeout
      }),
    }),
  ],
  providers: [],
})
export class CoreModule {}
