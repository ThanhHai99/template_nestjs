import { Injectable } from '@nestjs/common'
import { CreateUserDto, UpdateUserDto } from './user.dto'
import { InjectModel } from '@nestjs/mongoose'
import { User } from './user.entity'
import { Model } from 'mongoose'

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto) {
    return await this.userModel.create({ ...createUserDto })
    // return 'This action adds a new user'
  }

  async findAll() {
    return await this.userModel.find()
    // return `This action returns all user`
  }

  findOne(id: number) {
    return `This action returns a #${id} user`
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`
  }

  async remove(id: number) {
    return await this.userModel.deleteMany({
      username: {
        $ne: null,
      },
    })
    return `This action removes a #${id} user`
  }
}
