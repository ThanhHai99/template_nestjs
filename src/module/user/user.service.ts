import { Injectable, HttpStatus, HttpException } from '@nestjs/common'
import { user } from '@prisma/client'
import { BodyRegister } from 'src/module/auth/auth.dto'
import { PrismaService } from '../prisma/prisma.service'
import * as bcrypt from 'bcryptjs'

@Injectable()
export class UserService {
  constructor(private readonly db: PrismaService) {}

  async findByUsernameAndSelectRole(username: string): Promise<user | any> {
    return await this.db.user.findUnique({
      where: { username: username },
      select: {
        role: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    })
  }

  public async create(data: BodyRegister): Promise<any> {
    const isUserExists: user = await this.findByUsername(data.username)
    if (isUserExists) throw new HttpException('The account already in use', HttpStatus.CONFLICT)

    // Create user
    data.password = bcrypt.hashSync(data.password, 8)
    await this.db.user
      .create({
        data: {
          username: data.username,
          password: data.password,
        },
      })
      .catch((e0: any): never => {
        throw new HttpException('The account cannot create', HttpStatus.INTERNAL_SERVER_ERROR)
      })
  }

  public async findByUsername(username: string): Promise<user> {
    return await this.db.user.findUnique({
      where: { username: username },
    })
  }

  public async isPasswordValid(username: string, password: string): Promise<boolean> {
    const thisUser: user = await this.findByUsername(username)
    return await bcrypt.compare(password, thisUser.password)
  }
}
