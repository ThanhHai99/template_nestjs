import { Field, ObjectType } from '@nestjs/graphql'

export enum ReponseCode {
  SUCCESS = 'SUCCESS',
  FAILURE = 'FAILURE',
}

@ObjectType()
export class ResponseMessage {
  @Field(() => String, { description: 'Example field (placeholder)' })
  vi: string

  @Field(() => String, { description: 'Example field (placeholder)' })
  en: string
}

@ObjectType()
export class ResponseDTO {
  @Field(() => String, { description: 'Example field (placeholder)' })
  code: string

  @Field(() => ResponseMessage, { description: 'Example field (placeholder)' })
  message: ResponseMessage
}
