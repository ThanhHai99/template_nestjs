import { PartialType } from '@nestjs/mapped-types'

export class CreateImageDto {}

export class UpdateImageDto extends PartialType(CreateImageDto) {}
