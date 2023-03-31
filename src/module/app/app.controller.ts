import { Controller, Get, UseGuards } from '@nestjs/common'
import { AppService } from './app.service'
import { Roles } from 'src/util/decorator/role.decorator'
import { EnumRole as Role } from 'src/util/constant/role.constant'
import { JwtAuthGuard } from '../auth/guards/jwt.guard'
import { RolesGuard } from '../auth/guards/role.guard'

@Controller()
@UseGuards(JwtAuthGuard, RolesGuard)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Roles(Role.root)
  getHello(): string {
    return this.appService.getHello()
  }
}
