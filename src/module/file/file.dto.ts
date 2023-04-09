import { PartialType } from '@nestjs/mapped-types'

export class CreateFileDto {}

export class UpdateFileDto extends PartialType(CreateFileDto) {}
