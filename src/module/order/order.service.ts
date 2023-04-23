import { Injectable } from '@nestjs/common'
import { CreateOrderInput, UpdateOrderInput } from './order.input'
import { OrderResDTO, OrderResDTOs } from './order.dto'
import { Order } from './order.entity'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { ReponseCode } from 'src/shared/dto/reponse.dto'

@Injectable()
export class OrderService {
  constructor(@InjectRepository(Order) private readonly repo: Repository<Order>) {}

  async create(body: CreateOrderInput) {
    return await this.repo.save(body)
  }

  async findAll(): Promise<OrderResDTOs> {
    const thisOrders = await this.repo.find()

    const finalRes: OrderResDTOs = {
      code: ReponseCode.SUCCESS,
      message: {
        vi: 'Thành công',
        en: 'Successfully',
      },
      data: thisOrders,
    }

    return finalRes
  }

  async findOne(id: string): Promise<OrderResDTO> {
    const thisOrder = await this.repo.findOne({
      where: {
        id: id,
      },
    })

    const finalRes: OrderResDTO = {
      code: ReponseCode.SUCCESS,
      message: {
        vi: 'Thành công',
        en: 'Successfully',
      },
      data: thisOrder,
    }

    return finalRes
  }

  async update(updateOrderInput: UpdateOrderInput) {
    const thisOrder = await this.repo.save(updateOrderInput)

    const finalRes: OrderResDTO = {
      code: ReponseCode.SUCCESS,
      message: {
        vi: 'Thành công',
        en: 'Successfully',
      },
      data: thisOrder,
    }

    return finalRes
  }

  async delete(id: string): Promise<OrderResDTO> {
    await this.repo.delete(id)
    const finalRes: OrderResDTO = {
      code: ReponseCode.SUCCESS,
      message: {
        vi: 'Thành công',
        en: 'Successfully',
      },
    }

    return finalRes
  }
}
