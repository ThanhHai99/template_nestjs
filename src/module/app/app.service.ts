import { Injectable } from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'
import { GetHelloCommand } from './handlers/commands/get-hello.command'

@Injectable()
export class AppService {
  constructor(private readonly command: CommandBus) {}

  async getHello(): Promise<string> {
    const name = 'thanhhai'
    return await this.command.execute(new GetHelloCommand(name))
  }
}
