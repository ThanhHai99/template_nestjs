import { ObjectType, Field, Int } from '@nestjs/graphql'

@ObjectType()
export class UserDto {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number
}
