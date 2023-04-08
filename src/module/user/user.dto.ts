import { PartialType } from '@nestjs/mapped-types'
import { IsNotEmpty } from 'class-validator'
export class CreateUserDto {
  @IsNotEmpty()
  username: string

  @IsNotEmpty()
  password: number
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
