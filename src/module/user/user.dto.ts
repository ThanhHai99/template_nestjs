import { PartialType } from '@nestjs/mapped-types'
import { IsNotEmpty } from 'class-validator'

export class CreateUserDto {
  @IsNotEmpty()
  username: string

  @IsNotEmpty()
  password: string
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
import { ObjectType, Field, Int } from '@nestjs/graphql'

@ObjectType()
export class UserDto {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number
}
