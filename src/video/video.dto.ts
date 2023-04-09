import { PartialType } from '@nestjs/mapped-types'

export class CreateVideoDto {}

export class UpdateVideoDto extends PartialType(CreateVideoDto) {}
