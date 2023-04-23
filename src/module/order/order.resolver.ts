import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql'
import { OrderService } from './order.service'
import { OrderResDTO, OrderResDTOs } from './order.dto'
import { CreateOrderInput, UpdateOrderInput } from './order.input'
import { Order } from './order.entity'

@Resolver(() => Order)
export class OrderResolver {
  constructor(private readonly orderService: OrderService) {}

  @Mutation(() => Order)
  async createOrder(@Args('body') body: CreateOrderInput) {
    return await this.orderService.create(body)
  }

  @Query(() => OrderResDTOs)
  async getOrders() {
    return await this.orderService.findAll()
  }

  @Query(() => OrderResDTO)
  async getOrder(@Args('id', { type: () => String }) id: string) {
    return await this.orderService.findOne(id)
  }

  @Mutation(() => OrderResDTO)
  async updateOrder(@Args('body') body: UpdateOrderInput) {
    return await this.orderService.update(body)
  }

  @Mutation(() => OrderResDTO)
  async deleteOrder(@Args('id', { type: () => String }) id: string) {
    return await this.orderService.delete(id)
  }
}
