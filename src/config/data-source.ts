import { DataSource } from 'typeorm'
import { User } from '../module/user/user.entity'

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DATABASE_HOST || 'localhost',
  port: +(process.env.DATABASE_PORT || 3306),
  username: process.env.DATABASE_USER || 'root',
  password: process.env.DATABASE_PASS || 'root',
  database: process.env.DATABASE_NAME || 'nestjs',
  entities: [User],
  synchronize: false, // Đặt true nếu muốn tự động sync entity, false cho production
  logging: false,
  extra: {
    connectionLimit: 4, // Pool tối đa 4 connection
  },
})
