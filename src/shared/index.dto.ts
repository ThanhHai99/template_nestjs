import { IsNotEmpty } from '@nestjs/class-validator'

export class RequestDto {
  @IsNotEmpty()
  app_key: string

  @IsNotEmpty()
  timestamp: string

  @IsNotEmpty()
  sign_method: string

  @IsNotEmpty()
  sign: string
}
