import { SetMetadata, CustomDecorator } from '@nestjs/common'
import { EnumRole } from '../constant/role.constant'

export const ROLES_KEY = 'roles'
export const Roles = (...roles: Array<EnumRole>): CustomDecorator<string> => SetMetadata(ROLES_KEY, roles)
