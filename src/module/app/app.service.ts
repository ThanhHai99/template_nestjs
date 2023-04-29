import { Injectable } from '@nestjs/common'

@Injectable()
export class AppService {
  constructor() {}

  getHello(): boolean {
    return true
  }
}
