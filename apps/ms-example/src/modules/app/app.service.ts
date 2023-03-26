import { Injectable } from '@nestjs/common'

@Injectable()
export class AppService {
  public async test(data: any): Promise<{ message: string }> {
    const { num } = data
    return { message: `[${num}] Welcome to ms-example!` }
  }
}
