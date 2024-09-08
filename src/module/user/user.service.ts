import { Injectable } from '@nestjs/common'
import { CreateUserDto, UpdateUserDto } from './user.dto'
import { User } from './user.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { DeleteResult, Repository } from 'typeorm'
import { faker } from '@faker-js/faker'
import * as bcrypt from 'bcryptjs'

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    return await this.userRepository.save(createUserDto)
  }

  async findAll(): Promise<Array<User>> {
    return await this.userRepository.find()
  }

  async findOne(id: string): Promise<User> {
    return await this.userRepository.findOne({ where: { id: id } })
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    return await this.userRepository.save({ id, ...updateUserDto })
  }

  async remove(id: string): Promise<DeleteResult> {
    return await this.userRepository.delete(id)
  }

  async createFakeUser(): Promise<CreateUserDto> {
    const salt = await bcrypt.genSalt(10)
    return {
      username: faker.internet.userName(),
      email: faker.internet.email(),
      sex: faker.helpers.arrayElement(['male', 'female']),
      password: await bcrypt.hash('123456', salt), // Hashing can be added as per the previous example
      status: faker.helpers.arrayElement([true, false]),
    }
  }

  async seed() {
    const batchSize = 1000 // Define batch size
    const total = 10000000 // 10 million rows
    for (let i = 0; i < total; i += batchSize) {
      const users = []
      for (let j = 0; j < batchSize; j++) {
        const thisFake = await this.createFakeUser()
        users.push(thisFake)
      }

      // Batch insert
      await this.userRepository.save(users)
      console.log(`Inserted batch: ${i / batchSize + 1}`)
    }

    console.log('Seeding completed.')
  }
}
