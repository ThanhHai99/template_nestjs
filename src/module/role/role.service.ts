import { Injectable } from '@nestjs/common'
import { CreateRoleDto, UpdateRoleDto } from './role.dto'
import { RolesAsObject as initRoles, RoleIds } from 'src/util/constant/role.constant'
import { PrismaService } from '../prisma/prisma.service'
import { role } from '@prisma/client'

@Injectable()
export class RoleService {
  constructor(private readonly db: PrismaService) {}

  async onModuleInit(): Promise<any> {
    if (RoleIds.length) {
      const existedRoles: any = await this.db.role.findMany({
        where: {
          id: {
            in: RoleIds,
          },
        },
      })

      if (existedRoles.length < RoleIds.length) {
        const existedIds: any = existedRoles.map((e: any): any => e.id)
        const lackingIds: Array<number> = RoleIds.filter((e: number): boolean => !existedIds.includes(e))
        const lackingRoles = Object.entries(initRoles)
          .filter((e: any): boolean => lackingIds.includes(e[1]))
          .map((e) => {
            return {
              id: e[1],
              name: e[0],
            }
          })
        if (lackingRoles.length) {
          await this.db.role.create(<any>lackingRoles)
        }
      }
    }
  }

  async findAll(): Promise<Array<role>> {
    return await this.db.role.findMany()
  }
}
