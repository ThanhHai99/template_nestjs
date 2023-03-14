import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { Logger } from '@nestjs/common'

export class GetHelloCommand {
  constructor(public readonly name: string) {}
}

@CommandHandler(GetHelloCommand)
export class GetHelloCommandHandler implements ICommandHandler<GetHelloCommand> {
  private readonly logger = new Logger(GetHelloCommandHandler.name)
  constructor() {}

  async execute(command: GetHelloCommand): Promise<any> {
    const { name } = command
    return `${name}, Hello World! 🤧`
  }
}
