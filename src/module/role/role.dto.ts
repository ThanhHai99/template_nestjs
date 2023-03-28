import { PartialType } from '@nestjs/mapped-types'

export class CreateRoleDto {}

export class UpdateRoleDto extends PartialType(CreateRoleDto) {}
