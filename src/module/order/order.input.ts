import { InputType, Int, Field, PartialType } from '@nestjs/graphql'

@InputType()
export class CreateOrderInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number
}

@InputType()
export class UpdateOrderInput extends PartialType(CreateOrderInput) {
  @Field(() => Int)
  id: number
}
