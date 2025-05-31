import { Injectable } from '@nestjs/common'
import { CreateUserDto, UpdateUserDto } from './user.dto'
import { User } from './user.entity'
import { faker } from '@faker-js/faker'
import * as bcrypt from 'bcryptjs'
import { BaseRepository } from '../../common/repository/base.repository'
import { InjectBaseRepository } from '../../common/decorators/inject-base-repository.decorator'

@Injectable()
export class UserService {
  @InjectBaseRepository(User) private readonly userRepository: BaseRepository<User>

  async create(createUserDto: CreateUserDto): Promise<User> {
    return await this.userRepository.save(createUserDto)
  }

  async findAll(): Promise<Array<User>> {
    return await this.userRepository.find()
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
    const batchSize = 100
    const total = 10000000
    let addedTotal = 0
    for (let i = 0; i < total; i += batchSize) {
      const users = []
      for (let j = 0; j < batchSize; j++) {
        const thisFake = await this.createFakeUser()
        users.push(thisFake)
      }

      await this.userRepository.saveMany(users)
      addedTotal += batchSize
      console.log(`Inserted batch: ${addedTotal}`)
    }

    console.log('Seeding completed.')
  }
}
