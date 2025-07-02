import { parentPort } from 'worker_threads'
import { DataSource } from 'typeorm'
import { User } from '../user.entity' // điều chỉnh tùy thuộc vào vị trí file

// Tạo dataSource mới
const dataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'nestjs',
  entities: [User],
  synchronize: false,
  logging: false,
  poolSize: 20,
  multipleStatements: true,
  extra: {
    connectionLimit: 10, // connection pooling
    multipleStatements: true,
    connectTimeout: 60000, // Giữ tùy chọn này thay vì acquireTimeout
    waitForConnections: true,
  },
})

// Hàm để insert dữ liệu
const insertData = async (users: Array<any>) => {
  await dataSource.initialize()
  await dataSource.transaction(async (entityManager) => {
    const values = users.map((user) => `(UUID(), '${user.username}', '${user.email}', '${user.sex}', '${user.password}', ${user.status})`).join(',')

    await entityManager.query(`
      INSERT INTO user (usr_id, usr_username, usr_email, usr_sex, usr_password, usr_status)
      VALUES ${values}
    `)
  })
}

// Lắng nghe Worker
parentPort?.on('message', async (users) => {
  try {
    await insertData(users)
    parentPort?.postMessage({ success: true })
  } catch (err) {
    parentPort?.postMessage({ success: false, error: err.message })
  }
})
