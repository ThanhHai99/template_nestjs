import { PartialType } from '@nestjs/mapped-types'

export class CreatePartnerDto {}

export class UpdatePartnerDto extends PartialType(CreatePartnerDto) {}
