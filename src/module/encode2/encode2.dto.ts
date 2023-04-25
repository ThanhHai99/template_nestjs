export class Encode2Dto {
  app_key: string
  timestamp: string
  sign_method: string
  sign?: string
}

export class Decode2Dto {
  app_key: string
  timestamp: string
  sign_method: string
  sign: string
}
