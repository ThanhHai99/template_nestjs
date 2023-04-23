import { InputType, Field, PartialType } from '@nestjs/graphql'

@InputType()
export class CreateOrderInput {
  @Field(() => String, { description: 'Example field (placeholder)' })
  name: string
}

@InputType()
export class UpdateOrderInput extends PartialType(CreateOrderInput) {
  @Field(() => String)
  id: string
}
