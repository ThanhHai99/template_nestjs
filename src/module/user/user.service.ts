import { Injectable } from '@nestjs/common'
import { CreateUserDto, UpdateUserDto } from './user.dto'
import { User } from './user.entity'
import { faker } from '@faker-js/faker'
import * as bcrypt from 'bcryptjs'
import { BaseRepository } from '../../common/repository/base.repository'
import { InjectBaseRepository } from '../../common/decorators/inject-base-repository.decorator'
import { FindOptionsWhere, Like } from 'typeorm'

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
      sex: faker.helpers.arrayElement(['male', 'female']),
      password: await bcrypt.hash('123456', salt),
      status: faker.helpers.arrayElement([true, false]),
    }
  }

  async seed() {
    try {
      const total = 10000000
      const batchSize = 10000
      const concurrentBatches = 8
      let addedTotal = 0
      const startTime = Date.now()
      const processBatch = async (batchNumber: number) => {
        const start = batchNumber * batchSize
        const end = Math.min(start + batchSize, total)
        const count = end - start
        const batchUsers = this.generateFakeUsers(count)

        await this.userRepository.transaction(async (entityManager) => {
          const values = batchUsers.map((user) => `(UUID(), '${user.username}', '${user.email}', '${user.sex}', '${user.password}', ${user.status})`).join(',')
          await entityManager.query(`
              INSERT INTO user (acc_id, acc_username, acc_email, acc_sex, acc_password, acc_status)
              VALUES ${values}
          `)
        })

        return count
      }

      // Process batches concurrently
      for (let i = 0; i < total; i += batchSize * concurrentBatches) {
        const batchPromises = []

        // Start multiple batches concurrently
        for (let j = 0; j < concurrentBatches && i + j * batchSize < total; j++) {
          batchPromises.push(processBatch(Math.floor((i + j * batchSize) / batchSize)))
        }

        // Wait for all concurrent batches to complete
        const results = await Promise.all(batchPromises)
        addedTotal += results.reduce((sum, count) => sum + count, 0)

        // Calculate and log progress
        const elapsedMinutes = (Date.now() - startTime) / 1000 / 60
        const recordsPerMinute = addedTotal / elapsedMinutes
        const estimatedTotalMinutes = total / recordsPerMinute
        const progress = (addedTotal / total) * 100

        console.log(
          `Progress: ${progress.toFixed(2)}% (${addedTotal}/${total}) | ` +
            `Speed: ${Math.round(recordsPerMinute)} records/min | ` +
            `Est. remaining: ${(estimatedTotalMinutes - elapsedMinutes).toFixed(1)} min`,
        )
      }

      const totalMinutes = (Date.now() - startTime) / 1000 / 60
      console.log(`Seeding completed in ${totalMinutes.toFixed(1)} minutes`)
    } catch (error) {
      console.error('Error during seeding:', error)
      throw error
    }
  }

  // Optimized version that generates multiple users at once
  private generateFakeUsers(count: number): Array<CreateUserDto> {
    // const salt = await bcrypt.genSalt(10)
    const users: CreateUserDto[] = []
    for (let i = 0; i < count; i++) {
      users.push({
        username: faker.internet.userName(),
        email: faker.internet.email(),
        sex: faker.helpers.arrayElement(['male', 'female']),
        // password: await bcrypt.hash('123456', salt),
        password: 'Aa@12345',
        status: faker.helpers.arrayElement([true, false]),
      })
    }
    return users
  }
}
