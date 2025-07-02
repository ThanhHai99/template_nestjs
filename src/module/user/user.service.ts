import { Injectable } from '@nestjs/common'
import { CreateUserDto, UpdateUserDto } from './user.dto'
import { User } from './user.entity'
import { faker } from '@faker-js/faker'
import * as bcrypt from 'bcryptjs'
import { BaseRepository } from '../../common/repository/base.repository'
import { InjectBaseRepository } from '../../common/decorators/inject-base-repository.decorator'
import { DataSource, FindOptionsWhere, Like } from 'typeorm'
import { Worker } from 'worker_threads'
import * as mysql from 'mysql2/promise'
import { v4 as uuidv4 } from 'uuid'

@Injectable()
export class UserService {
  @InjectBaseRepository(User) private readonly userRepository: BaseRepository<User>
  constructor(private readonly dataSource: DataSource) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    return await this.userRepository.save(createUserDto)
  }

  async findAll(query: { keyword: string }): Promise<Array<User>> {
    const conditions: FindOptionsWhere<Array<User>> = [{ email: Like(`%${query.keyword}%`) }, { username: Like(`%${query.keyword}%`) }]
    return await this.userRepository.find({ where: conditions })
  }

  async findOne(id: string): Promise<User> {
    return await this.userRepository.findById(id)
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    return await this.userRepository.update(id, updateUserDto)
  }

  async remove(id: string): Promise<void> {
    await this.userRepository.delete(id)
  }

  async createFakeUser(): Promise<CreateUserDto> {
    return {
      username: faker.internet.userName(),
      email: faker.internet.email(),
      sex: faker.person.sexType(),
      password: 'Aa@12345',
      status: faker.datatype.boolean(),
    }
  }

  async seedUsingWorkers(): Promise<void> {
    const total = 10_000_000 // 1 triệu records
    const batchSize = 50_000 // Batch size
    const maxConcurrency = 4 // Giảm concurrency để tránh quá tải
    const startTime = Date.now()

    console.log(`Starting to seed ${total.toLocaleString()} records with max ${maxConcurrency} concurrent operations...`)

    // Tạo connection pool config
    const connectionConfig = {
      host: '127.0.0.1',
      port: 3306,
      user: 'root',
      password: 'root',
      database: 'nestjs',
      multipleStatements: true,
      // Tăng timeout để tránh connection bị đóng
      acquireTimeout: 120000, // 2 minutes
      timeout: 120000, // 2 minutes
      reconnect: true,
      // Giảm max_allowed_packet để tránh lỗi
      maxAllowedPacket: 67108864, // 64MB
    }

    let addedTotal = 0
    const semaphore = new Array(maxConcurrency).fill(null)
    let currentBatch = 0
    const totalBatches = Math.ceil(total / batchSize)

    // Xử lý từng batch một cách tuần tự nhưng với concurrency limited
    const processBatches = async (): Promise<void> => {
      const activeBatches: Promise<void>[] = []

      for (let i = 0; i < total; i += batchSize) {
        const count = Math.min(batchSize, total - i)
        const batchIndex = currentBatch++

        // Chờ nếu đã đạt max concurrency
        if (activeBatches.length >= maxConcurrency) {
          await Promise.race(activeBatches)
          // Loại bỏ các batch đã hoàn thành
          for (let j = activeBatches.length - 1; j >= 0; j--) {
            const batch = activeBatches[j]
            if ((await Promise.race([batch, Promise.resolve('completed')])) === 'completed') {
              activeBatches.splice(j, 1)
            }
          }
        }

        // Tạo batch mới
        const batchPromise = this.processSingleBatch(connectionConfig, count, i, batchSize, batchIndex, totalBatches)
          .then(() => {
            addedTotal += count
            const percent = (addedTotal / total) * 100
            const elapsed = (Date.now() - startTime) / 1000
            const rate = Math.round(addedTotal / elapsed)
            console.log(`✅ Progress: ${addedTotal.toLocaleString()}/${total.toLocaleString()} (${percent.toFixed(1)}%) | Rate: ${rate.toLocaleString()} records/sec | Elapsed: ${elapsed.toFixed(1)}s`)
          })
          .catch((error) => {
            console.error(`❌ Batch ${batchIndex + 1} failed:`, error.message)
            throw error
          })

        activeBatches.push(batchPromise)
      }

      // Đợi tất cả batches hoàn thành
      await Promise.all(activeBatches)
    }

    try {
      await processBatches()

      const totalTime = (Date.now() - startTime) / 1000
      const rate = Math.round(total / totalTime)
      console.log(`🎉 Seeding completed! ${total.toLocaleString()} records in ${totalTime.toFixed(1)}s (${rate.toLocaleString()} records/sec)`)
    } catch (error) {
      console.error('❌ Seeding failed:', error)
      throw error
    }
  }

  private async processSingleBatch(connectionConfig: any, count: number, startIndex: number, batchSize: number, batchIndex: number, totalBatches: number): Promise<void> {
    const batchStartTime = Date.now()
    let connection: mysql.Connection | null = null

    try {
      // Tạo connection mới cho mỗi batch
      connection = await mysql.createConnection(connectionConfig)

      // Setup connection cho bulk insert
      await this.setupConnectionForBulkInsert(connection)

      // Generate data
      const users = this.generateBulkFakeUsers(count)

      // Chia nhỏ batch nếu quá lớn để tránh max_allowed_packet
      const subBatchSize = 1000 // Chia nhỏ thành 1000 records mỗi sub-batch
      const subBatches = Math.ceil(count / subBatchSize)

      await connection.beginTransaction()

      for (let subBatch = 0; subBatch < subBatches; subBatch++) {
        const startIdx = subBatch * subBatchSize
        const endIdx = Math.min(startIdx + subBatchSize, count)
        const subBatchUsers = users.slice(startIdx, endIdx)

        const sql = this.buildInsertSQL(subBatchUsers)
        await connection.execute(sql)
      }

      await connection.commit()

      const elapsed = (Date.now() - batchStartTime) / 1000
      const rate = Math.round(count / elapsed)
      console.log(`📦 Batch ${batchIndex + 1}/${totalBatches}: ${count.toLocaleString()} records in ${elapsed.toFixed(2)}s (${rate.toLocaleString()} records/sec)`)
    } catch (error) {
      console.error(`❌ Error in batch ${batchIndex + 1}:`, error.message)

      if (connection) {
        try {
          await connection.rollback()
        } catch (rollbackError) {
          console.error('Rollback failed:', rollbackError.message)
        }
      }
      throw error
    } finally {
      if (connection) {
        try {
          await connection.end()
        } catch (endError) {
          console.error('Connection end failed:', endError.message)
        }
      }
    }
  }

  private async setupConnectionForBulkInsert(connection: mysql.Connection): Promise<void> {
    try {
      // Chỉ set những variables cần thiết và an toàn
      await connection.execute('SET autocommit = 0')
      await connection.execute('SET unique_checks = 0')
      await connection.execute('SET foreign_key_checks = 0')

      // Try to set session variables, ignore if failed
      const sessionVars = [
        'SET SESSION bulk_insert_buffer_size = 67108864', // 64MB
        'SET SESSION sort_buffer_size = 16777216', // 16MB
        'SET SESSION read_buffer_size = 8388608', // 8MB
      ]

      for (const varSql of sessionVars) {
        try {
          await connection.execute(varSql)
        } catch (error) {
          // Ignore session variable errors
          console.log(`Warning: ${varSql} failed: ${error.message}`)
        }
      }
    } catch (error) {
      console.log('Warning: Some connection setup failed:', error.message)
    }
  }

  private buildInsertSQL(users: CreateUserDto[]): string {
    const values = users
      .map((user) => {
        const id = uuidv4()
        const username = user.username.replace(/'/g, "''")
        const email = user.email.replace(/'/g, "''")
        const sex = user.sex
        const password = user.password
        const status = user.status ? 1 : 0

        return `('${id}','${username}','${email}','${sex}','${password}',${status})`
      })
      .join(',')

    return `INSERT INTO user (usr_id, usr_username, usr_email, usr_sex, usr_password, usr_status) VALUES ${values}`
  }

  // Tối ưu hóa việc sinh dữ liệu fake
  private generateBulkFakeUsers(count: number): Array<CreateUserDto> {
    const users: CreateUserDto[] = []

    for (let i = 0; i < count; i++) {
      users.push({
        username: faker.internet.userName(),
        email: faker.internet.email(),
        sex: faker.person.sex() as 'male' | 'female',
        password: 'Aa@12345',
        status: faker.datatype.boolean(),
      })
    }

    return users
  }

  // Optimized version that generates multiple users at once
  private generateFakeUsers(count: number): Array<CreateUserDto> {
    const users: CreateUserDto[] = []
    for (let i = 0; i < count; i++) {
      users.push({
        username: faker.internet.userName(),
        email: faker.internet.email(),
        sex: faker.person.sex(),
        password: 'Aa@12345',
        status: faker.datatype.boolean(),
      })
    }
    return users
  }
}
