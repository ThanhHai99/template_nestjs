import { Injectable } from '@nestjs/common'
import { BodyLogin, BodyRegister, ReqUserData } from './auth.dto'
import { JwtService } from '@nestjs/jwt'
import { UserService } from 'src/module/user/user.service'
import { user } from '@prisma/client'

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService, private readonly jwtService: JwtService) {}

  async register(data: BodyRegister): Promise<any> {
    await this.userService.create(data)
  }

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findByUsername(username)
    if (user && (await this.userService.isPasswordValid(username, password))) {
      const { password, ...result } = user
      return result
    }
    return null
  }

  async login(user: BodyLogin): Promise<{ access_token: string }> {
    const _user: user = await this.userService.findByUsername(user.username)
    const payload: ReqUserData = {
      username: _user.username,
      id: _user.id,
    }
    return {
      access_token: this.jwtService.sign(payload),
    }
  }
}
