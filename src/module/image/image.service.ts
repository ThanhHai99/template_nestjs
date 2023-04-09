import { Injectable } from '@nestjs/common'
import { CreateImageDto, UpdateImageDto } from './image.dto'

@Injectable()
export class ImageService {
  create(createImageDto: CreateImageDto) {
    return 'This action adds a new image'
  }

  findAll() {
    return `This action returns all image`
  }

  findOne(id: number) {
    return `This action returns a #${id} image`
  }

  update(id: number, updateImageDto: UpdateImageDto) {
    return `This action updates a #${id} image`
  }

  remove(id: number) {
    return `This action removes a #${id} image`
  }
}
