import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { UserService } from 'src/module/user/user.service'
import { ReqUserData } from '../auth.dto'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'secretKey',
    })
  }

  async validate(payload: any): Promise<ReqUserData> {
    const payloadUsername: any = payload.username
    const user: any = await this.userService.findByUsernameAndSelectRole(payloadUsername)
    if (!user) throw new UnauthorizedException()

    // set req.user
    return {
      id: payload.id,
      username: payload.username,
      role_id: user?.role?.id,
    }
  }
}
