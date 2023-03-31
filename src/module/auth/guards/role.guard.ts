import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { EnumRole } from 'src/util/constant/role.constant'
import { ROLES_KEY } from '../../../util/decorator/role.decorator'

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles: Array<EnumRole> = this.reflector.getAllAndOverride<EnumRole[]>(ROLES_KEY, [context.getHandler(), context.getClass()])
    if (!requiredRoles) return true
    const { user } = context.switchToHttp().getRequest()

    // Setup multiple permission here
    return requiredRoles.some((roleId: EnumRole): boolean => user.role_id === roleId)
  }
}
