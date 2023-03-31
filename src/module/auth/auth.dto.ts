import { PartialType } from '@nestjs/mapped-types'
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator'
import { IsOptional } from 'class-validator'

export class BodyLogin {
  @IsNotEmpty()
  username: string

  @MinLength(4)
  password: string
}

export class BodyRegister extends BodyLogin {}

export class ReqUserData {
  id: number
  username: string
  role_id?: number
}
