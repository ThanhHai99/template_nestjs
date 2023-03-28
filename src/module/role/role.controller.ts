import { Controller, Get } from '@nestjs/common'
import { RoleService } from './role.service'
import { Roles } from 'src/util/decorator/role.decorator'
import { EnumRole as Role } from 'src/util/constant/role.constant'

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get()
  @Roles(Role.root)
  async findAll() {
    return await this.roleService.findAll()
  }
}
