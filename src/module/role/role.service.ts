import { Injectable } from '@nestjs/common'
import { RolesAsObject as initRoles, RoleIds } from 'src/util/constant/role.constant'
import { PrismaService } from '../prisma/prisma.service'
import { role } from '@prisma/client'

@Injectable()
export class RoleService {
  constructor(private readonly db: PrismaService) {}

  async onModuleInit(): Promise<any> {
    if (RoleIds.length) {
      const existedRoles: Array<role> = await this.db.role.findMany({
        where: {
          id: {
            in: RoleIds,
          },
        },
      })
      if (existedRoles.length < RoleIds.length) {
        const existedIds: Array<number> = existedRoles.map((e: role): number => e.id)
        const lackingIds: Array<number> = RoleIds.filter((e: number): boolean => !existedIds.includes(e))
        const lackingRoles = Object.entries(initRoles)
          .filter((e: [string, number]): boolean => lackingIds.includes(e[1]))
          .map((e: [string, number]) => {
            return {
              id: e[1],
              name: e[0],
            }
          })
        if (lackingRoles.length) {
          await this.db.role.createMany({ data: lackingRoles })
        }
      }
    }
  }

  async findAll(): Promise<Array<role>> {
    return await this.db.role.findMany()
  }
}
