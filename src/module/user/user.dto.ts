import { PartialType } from '@nestjs/mapped-types'
import { IsNotEmpty } from 'class-validator'

export class CreateUserDto {
  @IsNotEmpty()
  username: string

  @IsNotEmpty()
  password: string

  @IsNotEmpty()
  email: string

  @IsNotEmpty()
  sex: string

  @IsNotEmpty()
  status: boolean
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
