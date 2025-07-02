import { Injectable } from '@nestjs/common'
import { CreateUserDto, UpdateUserDto } from './user.dto'
import { User } from './user.entity'
import { faker } from '@faker-js/faker'
import * as bcrypt from 'bcryptjs'
import { BaseRepository } from '../../common/repository/base.repository'
import { InjectBaseRepository } from '../../common/decorators/inject-base-repository.decorator'
import { FindOptionsWhere, Like } from 'typeorm'
import { Worker } from 'worker_threads'

@Injectable()
export class UserService {
  @InjectBaseRepository(User) private readonly userRepository: BaseRepository<User>

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
    const salt = await bcrypt.genSalt(10)
    return {
      username: faker.internet.userName(),
      email: faker.internet.email(),
      sex: faker.person.sexType(),
      password: await bcrypt.hash('123456', salt),
      status: faker.datatype.boolean(),
    }
  }

  // Inside the UserService class, add this new seeding method
  async seedUsingWorkers(): Promise<void> {
    const total = 1000000 // Total number of records to insert
    const batchSize = 10000 // Number of records per batch
    const numberOfWorkers = 4 // Number of concurrent workers
    let addedTotal = 0

    const startTime = Date.now()

    // Function to create a new worker and handle communication
    const createWorker = (batchUsers: Array<CreateUserDto>): Promise<number> =>
      new Promise((resolve, reject) => {
        const worker = new Worker(require.resolve('./worker/seed'), {
          workerData: batchUsers, // Truyền dữ liệu cho worker
        })

        worker.on('message', (message: { success: boolean; error?: string }) => {
          if (message.success) {
            resolve(batchUsers.length)
          } else {
            reject(new Error(message.error))
          }
        })

        worker.on('error', reject)
        worker.on('exit', (code) => {
          if (code !== 0) reject(new Error(`Worker exited with code ${code}`))
        })

        // Gửi data qua postMessage thay vì workerData
        worker.postMessage(batchUsers)
      })

    // Loop through total records in chunks
    for (let i = 0; i < total; i += batchSize * numberOfWorkers) {
      const workerPromises = [] // Store promises for workers

      // Spawn workers for each chunk
      for (let j = 0; j < numberOfWorkers; j++) {
        const start = i + j * batchSize
        if (start >= total) break

        const count = Math.min(batchSize, total - start)
        const batchUsers = this.generateFakeUsers(count) // Generate fake users for this batch
        workerPromises.push(createWorker(batchUsers))
      }

      // Wait for all workers to finish their batches
      const results = await Promise.all(workerPromises)
      addedTotal += results.reduce((sum, count) => sum + count, 0)

      // Calculate and log progress
      const elapsedMinutes = (Date.now() - startTime) / 1000 / 60
      const recordsPerMinute = addedTotal / elapsedMinutes
      const estimatedTotalMinutes = total / recordsPerMinute
      const progress = (addedTotal / total) * 100

      console.log(
        `Progress: ${progress.toFixed(2)}% (${addedTotal}/${total}) | ` +
          `Speed: ${Math.round(recordsPerMinute)} records/min | ` +
          `Estimated time remaining: ${(estimatedTotalMinutes - elapsedMinutes).toFixed(1)} min`,
      )
    }

    console.log(`Seeding completed in ${(Date.now() - startTime) / 1000 / 60} minutes`)
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
