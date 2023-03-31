import { Controller, Get } from '@nestjs/common'
import { RoleService } from './role.service'
import { role } from '@prisma/client'

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get()
  async findAll(): Promise<Array<role>> {
    return await this.roleService.findAll()
  }
}
