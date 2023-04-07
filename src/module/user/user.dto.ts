import { PartialType } from '@nestjs/mapped-types'

export class CreateUserDto {
  username: string
  password: number
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
