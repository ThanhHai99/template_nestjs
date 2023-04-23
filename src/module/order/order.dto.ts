import { Field, ObjectType } from '@nestjs/graphql'
import { ResponseDTO } from 'src/shared/dto/reponse.dto'
import { Order } from './order.entity'

@ObjectType()
export class OrderResDTOs extends ResponseDTO {
  @Field(() => [Order], { description: 'Example field (placeholder)' })
  data?: Order[]
}

@ObjectType()
export class OrderResDTO extends ResponseDTO {
  @Field(() => Order, { description: 'Example field (placeholder)' })
  data?: Order
}
